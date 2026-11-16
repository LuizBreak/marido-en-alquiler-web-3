const test = require('node:test');
const assert = require('node:assert/strict');
const load = require('./load-module.cjs');
const mocks = {
  '@vuelidate/core': {}, '@vuelidate/validators': {}, vuex: { mapGetters: () => ({}) },
  '../../utils/types.js': {}, '../../mixins/dateFormatter.js': {},
  '../../mixins/dissmissModal.js': {}, '../../mixins/msgBoxDialog.js': {},
  '../../services/message.service.js': {}, '../email/bidemail.vue': {},
};
test('a saved bid stays successful when notification and activity logging fail', async () => {
  let writes = 0, resets = 0; const messages = [];
  class Quote { async add() { writes++; return { quoteId: 19 }; } }
  const component = load('src/components/ui/baseProjectBid.vue', { ...mocks, '../../services/quote.service.js': { Quote } }).default;
  const vm = { isSaving: false, v$: { $validate: async () => true }, projectId: 3,
    loggedUser: { id: 7 }, date: () => 'now', bidPrice: 50, bidDescription: 'Scope',
    notifyClient: async () => { throw Error('Email unavailable'); }, resetForm: () => resets++,
    dismissModal: async () => {}, triggerMsgBox: (_, message) => messages.push(message),
    sysLogIt: async () => { throw Error('Activity unavailable'); } };
  await component.methods.save.call(vm);
  assert.equal(writes, 1); assert.equal(resets, 1); assert.equal(vm.isSaving, false);
  assert.match(messages[0], /Oferta guardada/);
});
test('a rejected review retains the draft and leaves its dialog open', async () => {
  const component = load('src/components/ui/BaseReviewMsg.vue', { ...mocks, 'vue-star-rating': {} }).default;
  let closed = false; const review = { rating: 5, comments: 'Keep this draft' };
  const vm = { isSaving: false, review, v$: { $validate: async () => true },
    $store: { dispatch: async () => { throw { response: { status: 409 } }; } },
    dismissModal: async () => { closed = true; } };
  await component.methods.onSubmit.call(vm);
  assert.equal(vm.review, review); assert.equal(closed, false);
  assert.ok(vm.reviewError); assert.equal(vm.isSaving, false);
});
