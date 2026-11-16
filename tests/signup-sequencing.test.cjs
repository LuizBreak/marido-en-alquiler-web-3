const test = require("node:test");
const assert = require("node:assert/strict");
const load = require("./load-module.cjs");
function actions(apiSvc = {}) {
  return load("src/store/modules/auth/actions.js", {
    "../../../services/session-expiry": load("src/services/session-expiry.js"),
    "../../../services": { apiSvc, TokenService: {} },
    "aws-amplify": { Auth: { signUp: async () => ({ user: { username: "identity" } }) } },
    "../../../utils/types": {}, "../../../store/index": {},
  }).default;
}
test("registration waits for account creation before creating the matching profile", async () => {
  let resolveAccount;
  const account = new Promise(resolve => { resolveAccount = resolve; });
  const calls = [];
  const signup = actions().signup({ dispatch: (name, payload) => {
    calls.push([name, payload]);
    return name === "createDbAccountInfo" ? account : Promise.resolve({});
  } }, { email: "test@example.invalid", userType: "client" });
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(calls.length, 1);
  resolveAccount({ id: 42 }); await signup;
  assert.equal(calls[1][0], "createDbClientInfo"); assert.equal(calls[1][1].id, 42);
});
test("account payload excludes Cognito password and token fields", async () => {
  let sent;
  const service = { post: async (_resource, data) => { sent = data; return { data: { data: { id: 42 } } }; } };
  await actions(service).createDbAccountInfo({}, { email: "test@example.invalid", password: "do-not-store", userType: "client" });
  assert.equal(sent.password, undefined);
  assert.equal(sent.idToken, "");
});
