import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state: {
    messages: [],
    myself: {},
    participants: [],
    chatTitle: "",
    placeholder: "",
    activeChat: null,
    nrOfNewMessages: 0,
  },
  mutations,
  actions,
  getters,
};
