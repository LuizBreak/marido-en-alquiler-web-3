const test = require("node:test");
const assert = require("node:assert/strict");
const load = require("./load-module.cjs");
const { resourceId } = load("src/services/resource-id.js");

test("CRUD chooses each resource primary key instead of an unrelated generic ID", () => {
  for (const [resource, key] of Object.entries({ projects: "projectId", quotes: "quoteId", messages: "messageId", reviews: "reviewId", paymethods: "payMethodId", milestones: "milestoneId", favorites: "Id" })) {
    assert.equal(resourceId(resource, { [key]: 17, id: 99 }), "17");
  }
  assert.equal(resourceId("clients", { id: 23 }), "23");
  assert.equal(resourceId("favorites", { id: 23 }), "23");
});
test("CRUD rejects missing IDs instead of requesting /undefined", () => {
  for (const id of [undefined, null, "", "undefined", "null"]) {
    assert.throws(() => resourceId("projects", { projectId: id }), /Missing projectId/);
  }
});
