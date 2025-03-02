export default {
  SET_MESSAGES(state, messages) {
    state.messages = [];
    for (const x of JSON.parse(messages)) {
      state.messages.push(x);
    }
  },
  SET_MESSAGE(state, message) {
    state.message = message;
  },
  ADD_NEW_MESSAGE(state, message) {
    state.messages.push(message);
  },
  DELETE_MESSAGE(state, message) {
    let index = state.messages.indexOf(message);
    if (index > -1) {
      state.messages.splice(index, 1);
    }
  },
  UPDATE_MESSAGE(state, message) {
    state.messages[message.id] = message;
  },

  SET_CONTACT_LIST(state, contacts) {
    state.contactList = [];
    for (const x of JSON.parse(contacts)) {
      state.contactList.push(x);
    }
  },
  SET_MYSELF(state, myself) {
    state.myself = myself;
  },
};
