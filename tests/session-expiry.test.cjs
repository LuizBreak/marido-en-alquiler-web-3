const test = require("node:test");
const assert = require("node:assert/strict");
const { expirationFromJwt } = require("./load-module.cjs")("src/services/session-expiry.js");
test("JWT epoch seconds become an absolute millisecond timestamp", () => {
  const exp = Math.floor(Date.now() / 1000) + 3600;
  assert.equal(expirationFromJwt(exp), exp * 1000);
  for (const invalid of [undefined, "bad", 0, -1]) assert.throws(() => expirationFromJwt(invalid), /expired/);
});
