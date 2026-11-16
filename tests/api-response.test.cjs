const test = require("node:test");
const assert = require("node:assert/strict");
const load = require("./load-module.cjs");
const { normalizeApiResponse } = load("src/services/api-response.js");

test("normalizes legacy lists, items and empty writes without dropping data", () => {
  for (const data of [[], [{ id: 1 }, { id: 2 }], { id: 1 }, null]) {
    const response = normalizeApiResponse({ data: { message: "ok", body: JSON.stringify(data) } });
    assert.equal(JSON.stringify(response.data.data), JSON.stringify(data));
    assert.deepEqual(JSON.parse(response.data.body), data);
  }
  assert.equal(normalizeApiResponse({ data: { message: "saved" } }).data.data, null);
});
test("prefers decoded API data and rejects malformed legacy JSON", () => {
  assert.equal(normalizeApiResponse({ data: { data: 7, body: "old" } }).data.data, 7);
  assert.throws(() => normalizeApiResponse({ data: { body: "broken" } }), /invalid JSON/);
  const oauth = { data: { access_token: "test-token" } };
  assert.equal(normalizeApiResponse(oauth), oauth);
});
