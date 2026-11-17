const test = require('node:test'), assert = require('node:assert/strict'), load = require('./load-module.cjs');
const destination = load('src/services/signin-destination.js');
test('sign-in returns to the exact offer and rejects external or malformed destinations', () => {
  assert.equal(destination.signinDestination({path:'/oferta/42',query:{redirect:'//evil.example'}},'client'), '/oferta/42');
  for (const path of ['/oferta/0','/oferta/2147483648','/oferta/42/../../','//evil.example','/oferta/1?redirect=x']) assert.equal(destination.offerPath(path), null);
  for (const redirect of ['//evil.example','https://evil.example','../admin',['perfil/info']]) assert.equal(destination.signinDestination({path:'/',query:{redirect}},'client'),'/perfil/info');
});
function fixture(get, signedIn=true) {
  const component = load('src/pages/clients/offerReview.vue', {
    '../../components/ui/ProjectOffers.vue': {}, '../../services/api.service': {apiSvc:{getById:get}},
    '../../mixins/showModal':{showdModal(){}}, '../../services/signin-destination':destination,
  }).default;
  const vm = {...component.data(), authenticated:signedIn, $route:{params:{quoteId:'42'}}, $store:{getters:{isClient:true,userId:21}}};
  vm.load=component.methods.load.bind(vm);
  return vm;
}
test('opening an offer only reads its saved quote and project', async () => {
  const calls=[]; const vm=fixture(async(resource,id)=>{calls.push([resource,id]);return {data:{data:resource==='quotes'?{quoteId:42,projectId:3,version:'fresh'}:{projectId:3,clientId:21}}};});
  await vm.load(); assert.equal(vm.quote.version,'fresh'); assert.equal(vm.project.projectId,3); assert.equal(calls.length,2);
});
test('signed-out recipients and invalid links make no private request', async () => {
  const vm=fixture(()=>assert.fail('private request'),false); await vm.load();
  vm.authenticated=true;vm.$route.params.quoteId='invalid';await vm.load();assert.match(vm.error,/válido/);
});
test('another owner cannot view an offer and stale responses cannot repopulate a signed-out page', async () => {
  const wrong=fixture(async(resource)=>({data:{data:resource==='quotes'?{projectId:3}:{clientId:99}}}));await wrong.load();assert.equal(wrong.quote,null);assert.match(wrong.error,/cuenta/);
  let resolve;const pending=new Promise(r=>{resolve=r;});const vm=fixture(async resource=>resource==='quotes'?pending:{data:{data:{clientId:21}}});
  const first=vm.load();vm.authenticated=false;await vm.load();resolve({data:{data:{projectId:3}}});await first;assert.equal(vm.quote,null);assert.equal(vm.project,null);
});
