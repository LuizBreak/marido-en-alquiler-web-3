const test=require('node:test'),assert=require('node:assert/strict'),load=require('./load-module.cjs');
let writes=0,payload;
class Message{async add(notify,data){writes++;payload=data;return {messageId:42};}}
const component=load('src/components/ui/baseContactContractor.vue',{'@vuelidate/core':{},'@vuelidate/validators':{},'vuex':{mapGetters:()=>({})},'vue-star-rating':{},'../../utils/types.js':{},'../../mixins/dateFormatter.js':{},'../../mixins/dissmissModal.js':{},'../../mixins/msgBoxDialog.js':{},'../../services/message.service.js':{Message}}).default;
function fixture(){return {isSaving:false,v$:{$validate:async()=>true},loggedUser:{id:17},id:21,project:{projectId:3},message:'¿Puedes reparar la puerta?',resetForm(){component.methods.resetForm.call(this);},triggerMsgBox(){},dismissModal(){},sysLogIt(){}};}
test('service form sends plain request text and a distinct project reference, then clears the saved draft',async()=>{
 writes=0;const vm=fixture();await component.methods.save.call(vm);assert.equal(writes,1);assert.equal(payload.messageBody,'¿Puedes reparar la puerta?');assert.equal(payload.quoteId,null);assert.equal(payload.msgType,'service_request');assert.deepEqual(JSON.parse(payload.msgAsset),{kind:'service_request',projectId:3});assert.equal(payload.email,undefined);assert.equal(vm.message,null);assert.equal(vm.isSaving,false);
});
test('service form requires an open project and preserves a draft while saving or after failure',async()=>{
 writes=0;const vm=fixture();vm.project={};await component.methods.save.call(vm);assert.equal(writes,0);assert.equal(vm.message,'¿Puedes reparar la puerta?');vm.isSaving=true;await component.methods.save.call(vm);assert.equal(writes,0);
});
