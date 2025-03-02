export default {
  messages(state) {
    return state.messages;
  },
  message(state) {
    return state.message;
  },
  hasMessages(state) {
    return state.messages && state.messages.length > 0;
  },
  participants(state) {
    return state.contactList;
  },
  chatMessages(state) {
    return state.chatMessages;
  },
};
