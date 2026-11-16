const test=require('node:test'),assert=require('node:assert/strict'),load=require('./load-module.cjs');
const {DateTime}=require('luxon');const {chatTimestamp}=load('src/services/chat-timestamp.js',{luxon:{DateTime}},{Date});
test('history and live timestamps accept ISO, SQL, Date and Luxon values while preserving unknown legacy times',()=>{
 const iso='2026-11-16T15:00:00.000Z',stamp=DateTime.fromISO(iso);
 for(const value of [iso,'2026-11-16 15:00:00',new Date(iso),stamp,stamp.toMillis()]){const actual=chatTimestamp(value);assert.equal(actual.isValid,true);assert.equal(actual.toUTC().toISO(),stamp.toUTC().toISO());}
 assert.equal(chatTimestamp(null).isValid,false);assert.equal(chatTimestamp('invalid').isValid,false);
});
