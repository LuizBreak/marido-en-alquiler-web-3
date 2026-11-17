const test = require('node:test'), assert = require('node:assert/strict'), load = require('./load-module.cjs');
const pause = () => new Promise(r => setImmediate(r));
function fixture({ Auth = {}, api = {}, values = {}, globals = {} } = {}) {
  const storage = new Map(Object.entries(values));
  const localStorage = {getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,String(v)),removeItem:k=>storage.delete(k)};
  const session = load('src/services/session-state.js');
  const commits=[], state={signedIn:true,token:'jwt',loggedUser:{id:42}};
  const types = {SET_USER:'setUser',USERID:'userId',LOGGED_USER:'loggedUser',LOGOUT:'logout',AUTO_LOGOUT:'autoLogout',SET_AUTO_LOGOUT:'setAutoLogout',SET_USER_TYPE_INFO:'setUserTypeInfo',AUTH:'auth',TRY_LOGIN:'tryLogin',FETCH_CLIENT:'clients/fetchClient'};
  const actions=load('src/store/modules/auth/actions.js',{
    '../../../services/session-state':session,
    '../../../services/session-expiry':load('src/services/session-expiry.js'),
    '../../../services/api-contract':{createdAccountId:x=>x.id,usesLegacyApi:()=>false},
    '../../../services':{apiSvc:{removeHeader(){},setHeader(){},...api},TokenService:{removeToken:()=>storage.delete('access_token'),removeRefreshToken:()=>storage.delete('refresh_token'),removeTokenExpirationDate:()=>storage.delete('tokenExpiration')}},
    '../../../services/cognito':{Auth:{signOut:async()=>{},...Auth}},'../../../utils/types':types,
    '../../../store/index':{getters:{'clients/client':{id:42}}},
  },{localStorage,...globals}).default;
  const context={commit:(name,value)=>{commits.push([name,value]);if(name==='setSignedIn')state.signedIn=value;if(name==='setUser')Object.assign(state,value);},dispatch:(name,payload)=>actions[name]?actions[name].call(context,context,payload):Promise.resolve()};
  return {actions,context,commits,state,storage,localStorage,session};
}

test('logout clears credentials and user caches immediately and waits for provider sign-out',async()=>{
 let finish;const f=fixture({values:{access_token:'jwt',refresh_token:'secret',expirationDate:'123',userId:'42',loggedUser:'private'},Auth:{signOut:()=>new Promise(r=>finish=r)}});
 let complete=false;const logout=f.context.dispatch('logout').then(()=>complete=true);
 assert.equal(f.state.signedIn,false);assert.equal(f.storage.size,0);assert.ok(f.commits.some(([n])=>n==='resetUserData'));assert.ok(f.commits.some(([n])=>n==='resetChat'));
 await pause();assert.equal(complete,false);finish();await logout;assert.equal(complete,true);
});
test('provider sign-out failure still leaves a clean local session',async()=>{const f=fixture({values:{access_token:'jwt'},Auth:{signOut:async()=>{throw Error('offline')}}});await f.context.dispatch('logout');assert.equal(f.state.signedIn,false);assert.equal(f.storage.size,0);});
test('cross-tab logout clears this tab without deleting another tab credentials',async()=>{let signs=0;const f=fixture({values:{access_token:'new-account'},Auth:{signOut:async()=>signs++}});await f.context.dispatch('autoLogout',{localOnly:true});assert.equal(signs,0);assert.equal(f.storage.get('access_token'),'new-account');assert.ok(f.commits.some(([n])=>n==='setAutoLogout'));});
test('a late account response cannot resurrect a logged-out session',async()=>{let respond;const f=fixture({values:{access_token:'jwt',expirationDate:String(Date.now()+60000),userId:'42'},api:{get:()=>new Promise(r=>respond=r)}});const pending=f.actions.tryLogin.call(f.context,f.context,{token:'jwt',expirationDate:Date.now()+60000,userId:42,userType:'client'});const denied=assert.rejects(pending,/sesión cambió/);await f.context.dispatch('logout');respond({data:{body:JSON.stringify([{id:42,userType:'client'}])}});await denied;assert.equal(f.state.signedIn,false);assert.equal(f.storage.size,0);});
test('interactive sign-in waits for a preceding provider logout',async()=>{let finish,signs=0;const f=fixture({Auth:{signOut:()=>new Promise(r=>finish=r),signIn:async()=>{signs++;throw Error('test stop')}}});const logout=f.context.dispatch('logout');const login=f.context.dispatch('login',{email:'test@example.invalid',password:'private'});const denied=assert.rejects(login,/test stop/);await pause();assert.equal(signs,0);finish();await logout;await pause();finish();await denied;assert.equal(signs,1);});
for (const expiration of [NaN,0,Date.now()-1000]) test('invalid or expired session timestamp is rejected: '+expiration,async()=>{let reads=0;const f=fixture({api:{get:async()=>reads++}});assert.equal(await f.actions.tryLogin.call(f.context,f.context,{token:'jwt',userId:42,expirationDate:expiration}),false);assert.equal(reads,0);assert.equal(f.state.signedIn,false);});
test('valid cached Cognito session replaces the stale ID token before profile lookup',async()=>{let token;const f=fixture({values:{access_token:'expired',expirationDate:'1',userId:'42'},Auth:{currentSession:async()=>({getIdToken:()=>({getJwtToken:()=> 'fresh',getExpiration:()=>Math.floor(Date.now()/1000)+3600,payload:{email:'test@example.invalid'}})})},api:{get:async()=>{token=f.storage.get('access_token');return {data:{body:JSON.stringify([{id:42,email:'test@example.invalid',userType:'client'}])}}}},globals:{setTimeout:()=>1,clearTimeout:()=>{}}});assert.equal(await f.context.dispatch('tryLogin'),true);assert.equal(token,'fresh');assert.equal(f.state.signedIn,true);});
test('revoked refresh session clears stale local credentials',async()=>{const f=fixture({values:{access_token:'expired',expirationDate:'1',userId:'42'},Auth:{currentSession:async()=>{throw Error('revoked')}}});assert.equal(await f.context.dispatch('tryLogin'),false);assert.equal(f.storage.size,0);});
test('case-only email differences restore the same verified account',async()=>{const f=fixture({values:{access_token:'jwt',expirationDate:'1',userId:'42'},Auth:{currentSession:async()=>({getIdToken:()=>({getJwtToken:()=> 'fresh',getExpiration:()=>Math.floor(Date.now()/1000)+3600,payload:{email:'TEST@example.invalid'}})})},api:{get:async()=>({data:{body:JSON.stringify([{id:42,email:'test@example.invalid',userType:'client'}])}})},globals:{setTimeout:()=>1,clearTimeout:()=>{}}});assert.equal(await f.context.dispatch('tryLogin'),true);});
test('failed role-profile loading cannot leave a partially authenticated session',async()=>{const f=fixture({api:{get:async()=>({data:{body:JSON.stringify([{id:42,userType:'client'}])}})},globals:{setTimeout:()=>1,clearTimeout:()=>{}}});const original=f.context.dispatch;f.context.dispatch=(name,payload)=>name==='clients/fetchClient'?Promise.reject(Error('offline')):original(name,payload);assert.equal(await f.context.dispatch('tryLogin',{token:'jwt',userId:42,expirationDate:Date.now()+60000,userType:'client'}),false);assert.equal(f.state.signedIn,false);assert.equal(f.storage.size,0);});
test('ambiguous-email support response is preserved for the sign-in form',async()=>{const f=fixture({api:{post:async()=>{throw {response:{data:{message:'More than one account uses this email. Contact support.'}}};}}});await assert.rejects(f.actions.auth.call(f.context,f.context,{idToken:'jwt',expiresIn:2000000000}),/Contact support/);assert.equal(f.storage.has('access_token'),false);});
test('expiry timer clears state and marks automatic logout',async()=>{let expire;const f=fixture({api:{get:async()=>({data:{body:JSON.stringify([{id:42,userType:'client'}])}})},globals:{setTimeout:fn=>{expire=fn;return 1;},clearTimeout:()=>{}}});await f.context.dispatch('tryLogin',{token:'jwt',userId:42,expirationDate:Date.now()+60000,userType:'client'});expire();assert.equal(f.state.signedIn,false);assert.ok(f.commits.some(([n])=>n==='setAutoLogout'));await pause();});

test('request/session boundaries reject stale responses, expired writes and current-session 401',async()=>{
 const session=load('src/services/session-state.js');const {installSessionInterceptors}=load('src/services/session-requests.js',{'./session-state':session});let request,success,failure,expired=0;
 const storage=new Map([['access_token','jwt'],['expirationDate',String(Date.now()+60000)]]);
 installSessionInterceptors({interceptors:{request:{use:fn=>request=fn},response:{use:(ok,bad)=>{success=ok;failure=bad}}}},{getItem:k=>storage.get(k)??null},()=>expired++);
 const config=request({headers:{}});assert.equal(config.headers.Authorization,'Bearer jwt');
 const error={config,response:{status:401}};await assert.rejects(failure(error),e=>e===error);assert.equal(expired,1);
 session.invalidateSession();assert.throws(()=>success({config,data:'private'}),/sesión cambió/);assert.throws(()=>failure(error),/sesión cambió/);assert.equal(expired,1);
 storage.set('expirationDate','1');assert.throws(()=>request({method:'post',headers:{}}),/expirado/);assert.equal(expired,2);
 storage.delete('access_token');assert.equal(request({headers:{Authorization:'Bearer old'}}).headers.Authorization,undefined);
});
test('storage changes and suspended-tab expiry clear the tab without provider logout loops',async()=>{
 const {installSessionListeners}=load('src/services/session-events.js');const handlers={},calls=[],storage=new Map([['access_token','jwt'],['expirationDate',String(Date.now()+60000)]]);
 const browser={localStorage:{getItem:k=>storage.get(k)??null},addEventListener:(key,fn)=>handlers[key]=fn,removeEventListener:key=>delete handlers[key],document:{addEventListener:(key,fn)=>handlers[key]=fn,removeEventListener:key=>delete handlers[key]}};
 const dispose=installSessionListeners({getters:{isAuthenticated:true,token:'jwt'},dispatch:(...args)=>calls.push(args)},browser);
 handlers.storage({key:'unrelated'});assert.equal(calls.length,0);
 storage.set('access_token','another');handlers.storage({key:'access_token'});assert.equal(calls[0][1].localOnly,true);
 storage.set('access_token','jwt');storage.set('expirationDate','1');handlers.focus();assert.equal(calls[1][0],'autoLogout');
 handlers['mea:session-expired']();assert.equal(calls[2][0],'autoLogout');dispose();assert.equal(Object.keys(handlers).length,0);
});
