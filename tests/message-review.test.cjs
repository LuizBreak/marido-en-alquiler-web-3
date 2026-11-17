const test=require('node:test'),assert=require('node:assert/strict'),load=require('./load-module.cjs');
const destination=load('src/services/signin-destination.js');
test('message sign-in returns to the exact saved message, rejecting malformed and external paths',()=>{
 assert.equal(destination.signinDestination({path:'/mensaje/17',query:{redirect:'//evil.example'}},'contractor'),'/mensaje/17');
 for(const path of ['/mensaje/0','/mensaje/2147483648','/mensaje/17/../','//evil.example','/mensaje/17?next=x'])assert.equal(destination.messagePath(path),null);
});
function fixture(get,signedIn=true){
 const component=load('src/pages/common/messageReview.vue',{'../../services/api.service':{apiSvc:{getById:get}},'../../mixins/showModal':{showdModal(){}},'../../services/signin-destination':destination}).default;
 const vm={...component.data(),authenticated:signedIn,$route:{params:{messageId:'17'}},$store:{getters:{userId:21,isClient:true}}};vm.load=component.methods.load.bind(vm);return vm;
}
test('message link only reads the saved message and never marks it read or sends a reply',async()=>{
 let reads=0;const vm=fixture(async(resource,id)=>{assert.equal(resource,'messages');assert.equal(id,'17');reads++;return {data:{data:{messageId:17,fromId:7,toId:21,messageBody:'Saved text'}}};});await vm.load();assert.equal(vm.message.messageBody,'Saved text');assert.equal(reads,1);
});
test('signed-out viewers, unrelated accounts and invalid links cannot view messages',async()=>{
 const vm=fixture(()=>assert.fail('private request'),false);await vm.load();vm.authenticated=true;vm.$route.params.messageId='invalid';await vm.load();assert.equal(vm.message,null);
 const outsider=fixture(async()=>({data:{data:{messageId:17,fromId:7,toId:99}}}));await outsider.load();assert.equal(outsider.message,null);assert.match(outsider.error,/cuenta/);
});
test('logout or navigation discards an in-flight message response',async()=>{
 let resolve;const pending=new Promise(r=>{resolve=r;});const vm=fixture(()=>pending);const first=vm.load();vm.authenticated=false;await vm.load();resolve({data:{data:{messageId:17,fromId:7,toId:21}}});await first;assert.equal(vm.message,null);
});
