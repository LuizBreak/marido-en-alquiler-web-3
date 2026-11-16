const test = require("node:test");
const assert = require("node:assert/strict");
const load = require("./load-module.cjs");
const { clientProfilePayload } = load("src/services/client-profile-payload.js");
const { normalizeApiResponse } = load("src/services/api-response.js");
const { profileSaveError } = load("src/services/profile-save-error.js");
const { clientProfileIdentity } = load("src/services/client-profile-identity.js");

test("profile update targets the existing client and sends only editable fields to the legacy API", async () => {
  let request;
  const { apiSvc } = load("src/services/api.service.js", {
    "./axious.service": { axiosSvc: { put: async (url, data) => {
      request = { url, data };
      return normalizeApiResponse({ status: 200, data: { message: "updated" } });
    } } },
    "./storage.service": { TokenService: {} },
    "./resource-id": load("src/services/resource-id.js"),
  });
  const { createCrudActions } = load("src/store/crud-actions.js", { "../services/api.service": { apiSvc } });
  const actions = createCrudActions({ resource: "clients", singular: "Client", plural: "Clients", mutation: "CLIENT", listMutation: "SET_CLIENTS", prepareWrite: clientProfilePayload });
  const entity = { id: 42, firstName: "Test", phone: "123", address: "Edited", createdAt: "2022-01-01T00:00:00.000Z", updatedAt: "2022-01-01T00:00:00.000Z", rating: 5, userType: "client" };
  let committed;
  await actions.updateClient({ commit: (_type, value) => { committed = value; } }, entity);
  assert.equal(request.url, "/clients/42");
  assert.deepEqual(Object.keys(request.data).sort(), ["address", "firstName", "phone"]);
  assert.equal(request.data.address, "Edited");
  assert.equal(committed, entity);
});

function profileComponent() {
  return load("src/pages/clients/profile-info.vue", {
    vuex: { mapGetters: () => ({}) }, "@vuelidate/core": {},
    "@vuelidate/validators": { helpers: {}, required: {}, email: {} },
    "../../components/ui/BaseImageUploaderCard.vue": {}, "../../utils/types.js": {},
    "../../services/s3.services.js": {}, "../../mixins/getUserAvatar": {},
    "../../services/profile-save-error": { profileSaveError },
    "../../services/client-profile-identity": { clientProfileIdentity },
  }).default;
}
test("text-only profile submission skips uploads and retains edits after a rejected save", async () => {
  const component = profileComponent();
  const user = { id: 42, address: "Unsaved edit" };
  const messages = [];
  const vm = { user, userId: 42, selectedFile: null, isSaving: false, v$: { $validate: async () => true },
    onUploadImage: () => { throw new Error("Text saves must not upload"); },
    $store: { dispatch: async () => { throw { response: { status: 500 }, code: "ERR_BAD_RESPONSE" }; } },
    triggerMsgBox: (_show, message) => messages.push(message),
  };
  await component.methods.onSubmit.call(vm);
  assert.equal(vm.user, user); assert.equal(vm.user.address, "Unsaved edit");
  assert.equal(vm.isSaving, false); assert.match(messages[0], /HTTP 500/);
});
test("an existing signed-in client with no ID in form data is updated instead of created", async () => {
  const component = profileComponent();
  const calls = [], messages = [];
  const vm = { user: { firstName: "Test", address: "Edited" }, userId: "42", selectedFile: null, isSaving: false,
    v$: { $validate: async () => true },
    $store: { dispatch: async (name, payload) => { calls.push([name, payload]); return payload; } },
    triggerMsgBox: (_show, message) => messages.push(message),
  };
  await component.methods.onSubmit.call(vm);
  assert.equal(calls.length, 1); assert.equal(calls[0][0], "clients/updateClient");
  assert.equal(calls[0][1].id, "42"); assert.equal(vm.user.id, "42");
  assert.match(messages[0], /actualizado/);
});
test("missing or mismatched client identities cannot issue profile writes", async () => {
  for (const accountId of [undefined, "undefined", null, "null", 0]) {
    assert.throws(() => clientProfileIdentity(accountId, {}), /missing/);
  }
  assert.throws(() => clientProfileIdentity(42, { id: 99 }), /does not match/);
  assert.equal(clientProfileIdentity(42, { Id: "42" }), 42);
  assert.equal(clientProfileIdentity(42, { clientId: 42 }), 42);
  const component = profileComponent(); let requests = 0;
  await component.methods.onSubmit.call({
    user: {}, userId: null, v$: { $validate: async () => true },
    $store: { dispatch: async () => { requests++; } }, triggerMsgBox() {},
  });
  assert.equal(requests, 0);
});
test("profile errors distinguish connection and storage failures without exposing server details", () => {
  assert.match(profileSaveError({ message: "Network Error" }), /conectar/);
  assert.match(profileSaveError({ message: "Image storage is not configured." }), /foto/);
  assert.ok(!profileSaveError({ response: { status: 500, data: { message: "private SQL" } } }).includes("private SQL"));
});
