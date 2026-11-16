const test=require('node:test'),assert=require('node:assert/strict'),load=require('./load-module.cjs');

test('saved message returns backend notification status without a second email request',async()=>{
 let writes=0;
 const {Message}=load('src/services/message.service.js',{'../store/index':{dispatch:async(_action,payload)=>{writes++;assert.equal(payload.toId,21);assert.equal(payload.email,undefined);return {messageId:8,notificationFailed:true};}},'../services':{apiSvc:{}}});
 const saved=await new Message().add(true,{fromId:17,toId:21,email:'forged@example.com',messageBody:'Stored message'});
 assert.equal(writes,1);assert.equal(saved.messageId,8);assert.equal(saved.notificationFailed,true);
});
test('support requests use the owned API and retain backend submission status',async()=>{
 let request;
 const {EmailService}=load('src/services/email.services.js',{'./api.service':{apiSvc:{post:async(resource,payload)=>{request={resource,payload};return {data:{data:{id:4,notificationFailed:true}}};}}}});
 const saved=await EmailService.send({name:'Fixture',email:'visitor@example.com',messageBody:'<b>Help please</b>'});
 assert.equal(request.resource,'contactus');assert.equal(request.payload.message,'Help please');assert.equal(saved.notificationFailed,true);
});
test('contact save rejects without committing or falsely reporting success',async()=>{
 let committed=false;
 const actions=load('src/store/modules/contactus/actions.js',{'../../../services/axious.service':{axiosSvc:{}},'../../../services':{apiSvc:{post:async()=>{throw Error('save failed');}}}}).default;
 await assert.rejects(actions.addContactus({commit:()=>{committed=true;}},{email:'visitor@example.com'}),/save failed/);
 assert.equal(committed,false);
});
test('contact form retains fields on a rejected save and clears after a saved request with email failure',async()=>{
 let reject=true,resets=0;const messages=[];
 class ContactUs{async add(){if(reject)throw Error('unavailable');return {id:5,notificationFailed:true};}}
 const component=load('src/pages/common/help/contactus.vue',{'vuex':{mapGetters:()=>({})},'@vuelidate/core':{},'@vuelidate/validators':{},'../../../mixins/dateFormatter.js':{},'../../../components/ui/BaseValidationErrorList.vue':{},'../../../services/contactus.service':{ContactUs},'../../../components/email/contactUs.email.vue':{}}).default;
 const vm={v$:{$validate:async()=>true},loggedUser:{id:0},firstName:'Fixture',email:'visitor@example.com',messageType:'other',message:'Keep draft',date:()=>'',resetForm:()=>resets++,triggerMsgBox:(_visible,message)=>messages.push(message)};
 await component.methods.submit.call(vm);assert.equal(resets,0);assert.equal(vm.message,'Keep draft');assert.match(messages[0],/No se pudo guardar/);
 reject=false;await component.methods.submit.call(vm);assert.equal(resets,1);assert.match(messages[1],/Solicitud guardada/);
});
