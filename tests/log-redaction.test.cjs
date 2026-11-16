const test = require("node:test");
const assert = require("node:assert/strict");
const load = require("./load-module.cjs");
test("activity logging substitutes a non-secret event ID for a caller's bearer token", () => {
  let recorded;
  class LogTrail {
    constructor(...args) { recorded = args; }
    add() {}
  }
  const logger = load("src/mixins/sysLogger.js", {
    "../services/logTrail.service": { LogTrail },
  }, { process: { env: { VUE_APP_SYS_LOG_LEVEL: "true" } } }).default;
  logger.methods.logIt(4, "updated", "profile", "secret.jwt.token", false);
  assert.match(recorded[3], /^event-/);
  assert.ok(!recorded.includes("secret.jwt.token"));
});
