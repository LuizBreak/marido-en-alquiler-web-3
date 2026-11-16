const test=require('node:test'),assert=require('node:assert/strict'),load=require('./load-module.cjs');
function component(SocketioService,Message){return load('src/pages/common/chat/ChatApp.vue',{
  vuex:{mapGetters:()=>({})},'./components/ChatBox.vue':{},'../../../services/message.service.js':{Message},
  '../../../store/index':{},luxon:{},'../../../mixins/getUserAvatar':{},
  '../../../services/socketio.service.js':{SocketioService},
},{process:{env:{}}}).default;}
test('saved chat initialization continues while the WebSocket never opens',async()=>{
 let loaded=0;class Socket{setupSocketConnection(){return new Promise(()=>{});}addEventListener(){}}
 class Message{async setMyself(){}async getNrOfNewMessages(){}async getMyContactList(){loaded++;}}
 const c=component(Socket,Message),vm={loggedUser:{id:7},myself:{id:7},firstContactId:undefined,$options:{name:'chat-app'},logIt(){}};
 await c.created.call(vm);await Promise.resolve();assert.equal(loaded,1);
});
test('incoming messages for another conversation are rejected synchronously',()=>{
 const c=component(class{},class{});assert.equal(c.methods.isMsgForThisChat(7,42,9,42),false);
 assert.equal(c.methods.isMsgForThisChat(7,42,7,42),true);
 assert.equal(c.computed.firstContactId.call({$store:{getters:{participants:[]}}}),undefined);
});
test('chat is broadcast only after persistence, with no fabricated read receipt or duplicate insert',async()=>{
 const c=component(class{},class{}),events=[],message={clientMessageId:'local-1',content:'Draft',viewed:false};
 const vm={persistMsgToDb:async()=>{events.push('saved');return {messageId:4};},
  BroadcastToWebsocket:()=>events.push('broadcast'),$store:{commit:(name,payload)=>events.push({name,payload})}};
 await c.methods.onMessageSubmit.call(vm,message);
 assert.equal(events[0],'saved');assert.equal(events[1].name,'setMessageDelivery');assert.equal(events[2],'broadcast');assert.equal(message.viewed,false);
 events.length=0;vm.persistMsgToDb=async()=>{throw Error('Unavailable');};
 await c.methods.onMessageSubmit.call(vm,message);assert.equal(events.length,1);assert.equal(events[0].payload.failed,true);assert.match(vm.chatSendError,/Draft/);
});
