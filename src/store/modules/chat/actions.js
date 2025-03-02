export default {
  // eslint-disable-next-line no-unused-vars
  addParticipants({ commit, state }, participants) {
    for (const x of participants) {
      commit("newParticipants", x);
    }
  },
  // eslint-disable-next-line no-unused-vars
  addMessageToStore({ commit, state }, messages) {
    for (const x of messages) {
      commit("newMessage", x);
    }
  },
};
