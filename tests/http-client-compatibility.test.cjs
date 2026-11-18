const test = require('node:test');
const assert = require('node:assert/strict');
const axios = require('axios');
const load = require('./load-module.cjs');

function client(adapter) {
  const session = load('src/services/session-state.js');
  const { installSessionInterceptors } = load('src/services/session-requests.js', { './session-state': session });
  const { normalizeApiResponse } = load('src/services/api-response.js');
  const storage = new Map([['access_token', 'verified-fixture'], ['expirationDate', String(Date.now() + 60000)]]);
  let expired = 0;
  const http = axios.create({ adapter });
  installSessionInterceptors(http, { getItem: key => storage.get(key) ?? null }, () => expired++);
  http.interceptors.response.use(normalizeApiResponse);
  return { http, storage, session, expirations: () => expired };
}

test('real Axios client preserves bearer headers, JSON writes and API envelope compatibility', async () => {
  let sent;
  const { http } = client(async config => {
    sent = config;
    return { config, status: 200, statusText: 'OK', headers: {}, data: { data: [{ id: 42 }] } };
  });
  const result = await http.post('/clients/42', { firstName: 'Test' });
  assert.equal(sent.headers.get('Authorization'), 'Bearer verified-fixture');
  assert.equal(sent.headers.get('Content-Type'), 'application/json');
  assert.deepEqual(JSON.parse(sent.data), { firstName: 'Test' });
  assert.equal(result.data.body, '[{"id":42}]');
});

test('real Axios errors expire a current rejected session and retain its HTTP status', async () => {
  const fixture = client(async config => {
    throw new axios.AxiosError('Rejected', 'ERR_BAD_REQUEST', config, {}, { config, status: 401, data: { message: 'Expired' } });
  });
  await assert.rejects(fixture.http.get('/accounts/42'), error => error.response.status === 401);
  assert.equal(fixture.expirations(), 1);
});

test('real Axios never invokes its network adapter for an expired write or exposes a stale response', async () => {
  let sent = 0, finish;
  const fixture = client(config => { sent++; return new Promise(resolve => { finish = () => resolve({ config, status: 200, data: { data: 'private' } }); }); });
  fixture.storage.set('expirationDate', '1');
  await assert.rejects(fixture.http.post('/clients/42', { firstName: 'Test' }), /expirado/);
  assert.equal(sent, 0);
  fixture.storage.set('expirationDate', String(Date.now() + 60000));
  const pending = fixture.http.get('/accounts/42');
  const rejected = assert.rejects(pending, /sesión cambió/);
  await new Promise(resolve => setImmediate(resolve));
  fixture.session.invalidateSession(); finish(); await rejected;
});
