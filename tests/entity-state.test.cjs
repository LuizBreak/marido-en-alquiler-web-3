const test = require("node:test");
const assert = require("node:assert/strict");
const load = require("./load-module.cjs");
const { entityMutations, upsertEntity } = load("src/store/entity-state.js");
test("client refresh replaces the correct collection and sparse-ID updates preserve other clients", () => {
  const m = entityMutations({ list: "clients", item: "client", key: "id", mutation: "CLIENT", listMutation: "SET_CLIENTS" });
  const state = { clients: [], client: {} };
  m.SET_CLIENTS(state, JSON.stringify([{ id: 5 }, { id: 900 }]));
  m.UPDATE_CLIENT(state, { id: "900", firstName: "Updated" });
  assert.equal(state.clients.length, 2); assert.equal(state.clients[0].id, 5);
  assert.equal(state.clients[1].firstName, "Updated"); assert.equal(state.favorites, undefined);
  m.DELETE_CLIENT(state, { id: 5 }); assert.equal(state.clients.length, 1);
});
test("project upsert handles an absent key and repeated records without index -1 properties", () => {
  const list = [{ projectId: 5 }];
  upsertEntity(list, { projectId: 27, title: "new" }, "projectId");
  upsertEntity(list, { projectId: "27", title: "edited" }, "projectId");
  assert.equal(list.length, 2); assert.equal(list[1].title, "edited"); assert.equal(list[-1], undefined);
});
test("favorite deletion supports the client/professional composite identity", () => {
  const m = entityMutations({ list: "favorites", item: "favorite", key: "Id", mutation: "FAVORITE", listMutation: "SET_FAVORITES" });
  const state = { favorites: [{ Id: 2, clientId: 4, contractorId: 7 }], favorite: {} };
  m.DELETE_FAVORITE(state, { clientId: "4", contractorId: "7" });
  assert.equal(state.favorites.length, 0);
});
