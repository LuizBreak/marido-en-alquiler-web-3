const test=require('node:test'),assert=require('node:assert/strict'),load=require('./load-module.cjs');
test('newsletter and referral submissions retain their type and go through the fixed support API',async()=>{
 const requests=[];const {EmailService}=load('src/services/email.services.js',{'./api.service':{apiSvc:{post:async(resource,data)=>{requests.push({resource,data});return {data:{data:{id:4}}};}}}});
 await EmailService.subscribe('visitor@example.com');await EmailService.send({name:'Ana',email:'friend@example.com',messageType:'referral',message:'Recomendación para seguimiento',recipient:'external@example.com'});await EmailService.send({email:'visitor@example.com',messageType:'Arbitrary subject',message:'Consulta'});
 assert.equal(requests[0].data.MessageType,'subscription');assert.equal(requests[1].data.MessageType,'referral');assert.equal(requests[1].data.message,'Recomendación para seguimiento');assert.equal(requests[1].data.recipient,undefined);assert.equal(requests[2].data.MessageType,'website');assert.ok(requests.every(r=>r.resource==='contactus'));
});
