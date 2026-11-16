const test=require('node:test');const assert=require('node:assert/strict');const load=require('./load-module.cjs');
const key='users/17/unique.png';
function service({ response = { ok: true }, post } = {}) {
  const calls = [];
  class FormData { constructor() { this.fields = []; } append(...entry) { this.fields.push(entry); } }
  const requestGrant = post || (async (resource, data) => {
    calls.push({ resource, data });
    return { data: { data: { key, url: 'https://bucket.s3.amazonaws.com', fields: { key, Policy: 'signed' }, publicUrl: 'https://bucket/' + key } } };
  });
  const svc = load('src/services/s3.services.js', { './api.service': { apiSvc: { post: requestGrant } } }, {
    FormData, Uint8Array, fetch: async (url, options) => { calls.push({ url, options }); return response; },
  }).s3Svc;
  return { svc, calls };
}
test('upload uses only a backend grant and persists its generated key, never the local filename',async()=>{const {svc,calls}=service();const file={name:'same-name.png',type:'image/png',size:50};const result=await svc.uploadFile(file);assert.equal(result.Key,key);assert.equal(calls[0].resource,'uploads');assert.equal(calls[0].data.size,50);assert.equal(calls[1].options.credentials,'omit');assert.equal(calls[1].options.body.fields.at(-1)[0],'file');assert.ok(!('headers' in calls[1].options));});
test('unsupported and oversized files never request a grant',async()=>{for(const file of [{type:'image/svg+xml',size:10},{type:'image/png',size:8*1024*1024+1},null]){let requested=false;const {svc}=service({post:async()=>{requested=true;}});await assert.rejects(()=>svc.uploadFile(file),e=>e.code==='INVALID_IMAGE');assert.equal(requested,false);}});
test('failed object upload rejects instead of reporting a saved image',async()=>{const {svc}=service({response:{ok:false,status:403}});await assert.rejects(()=>svc.uploadFile({name:'photo.png',size:50,type:'image/png'}),e=>e.code==='IMAGE_UPLOAD_FAILED');});
