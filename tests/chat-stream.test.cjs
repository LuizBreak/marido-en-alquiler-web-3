const test=require('node:test'),assert=require('node:assert/strict'),load=require('./load-module.cjs');
const {DateTime}=require('luxon');
const mutations=load('src/store/modules/chat/mutations.js',{luxon:{DateTime}}).default;
test('server echo merges with the outgoing draft and repeated events do not duplicate messages',()=>{
 const state={myself:{id:7},messages:[{clientMessageId:'local-key',participantId:7,toId:9,content:'Draft',viewed:false}]};
 const incoming={clientMessageId:'local-key',messageId:12,participantId:7,toId:9,content:'Saved',uploaded:true,viewed:false};
 mutations.receiveChatMessage(state,incoming);mutations.receiveChatMessage(state,incoming);
 assert.equal(state.messages.length,1);assert.equal(state.messages[0].messageId,12);assert.equal(state.messages[0].myself,true);assert.equal(state.messages[0].viewed,false);
});
test('a history response cannot overwrite a newer live event received while it was loading',()=>{
 const state={myself:{id:7},messages:[{messageId:13,participantId:9,toId:7,content:'Live'}]};
 mutations.mergeConversation(state,{myself:7,contactId:9,messages:[{messageId:12,participantId:7,toId:9,content:'History'}]});
 assert.deepEqual(Array.from(state.messages,m=>m.messageId),[12,13]);assert.equal(state.messages[0].myself,true);
});
test('switching conversations discards other-peer messages and logout clears cached conversations',()=>{
 const state={myself:{id:7},messages:[{messageId:13,participantId:9,toId:7,content:'Other peer'}],participants:[{id:9}],activeChat:{id:9}};
 mutations.mergeConversation(state,{myself:7,contactId:10,messages:[]});assert.equal(state.messages.length,0);
 mutations.resetChat(state);assert.equal(state.participants.length,0);assert.equal(state.activeChat,null);
});
