const test = require("node:test");
const assert = require("node:assert/strict");
const load = require("./load-module.cjs");

test("save waits for persistence, retains generated ID and propagates rejection", async () => {
  let resolve;
  const pending = new Promise((r) => { resolve = r; });
  const commits = [];
  const apiSvc = { post: () => pending };
  const { createCrudActions } = load("src/store/crud-actions.js", { "../services/api.service": { apiSvc } });
  const actions = createCrudActions({ resource: "quotes", singular: "Quote", plural: "Quotes", mutation: "QUOTE", listMutation: "SET_QUOTES" });
  const saving = actions.createQuote({ commit: (...args) => commits.push(args) }, { bidPrice: 10 });
  assert.equal(commits.length, 0);
  resolve({ data: { data: { quoteId: 42 } } });
  const saved = await saving;
  assert.equal(saved.quoteId, 42);
  assert.equal(commits[0][1].quoteId, 42);
  apiSvc.post = async () => { throw new Error("offline"); };
  await assert.rejects(actions.createQuote({ commit: (...args) => commits.push(args) }, {}), /offline/);
  assert.equal(commits.length, 1);
});
