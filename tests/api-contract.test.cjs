const test = require("node:test");
const assert = require("node:assert/strict");
const load = require("./load-module.cjs");
const contract = value => load("src/services/api-contract.js", {}, { process: { env: { VUE_APP_API_CONTRACT: value } } });

test("account creation IDs support both deployed and revised backend responses", () => {
  const { createdAccountId } = contract();
  for (const response of [{ id: 42 }, [{ LAST_INSERT_ID: 42 }], [[{ LAST_INSERT_ID: "42" }]]]) {
    assert.equal(String(createdAccountId(response)), "42");
  }
  for (const invalid of [null, [], {}, { id: 0 }]) assert.throws(() => createdAccountId(invalid), /assigned an ID/);
});
test("favorite deletion uses the explicitly selected API contract", async () => {
  for (const version of [undefined, "legacy", "v2"]) {
    const requests = [], commits = [];
    const { usesLegacyApi } = contract(version);
    const actions = load("src/store/modules/favorites/actions.js", {
      "../../../services/api.service": { apiSvc: { customRequest: async request => requests.push(request) } },
      "../../crud-actions": { createCrudActions: () => ({}) },
      "../../../services/api-contract": { usesLegacyApi },
    }).default;
    await actions.deleteFavorite({ commit: (...args) => commits.push(args) }, { clientId: 4, contractorId: 7 });
    assert.equal(requests[0].url, version === "v2" ? "/favorites/clients/4/contractors/7" : "/favorites/undefined");
    if (version !== "v2") assert.equal(requests[0].data.clientId, 4);
    assert.equal(commits.length, 1);
  }
});
