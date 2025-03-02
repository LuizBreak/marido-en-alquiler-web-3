import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      loggedUser: {},
      userId: null,
      token: null,
      didAutoLogout: false,
      user: {},
      signedIn: false,
    };
  },
  mutations,
  actions,
  getters,
};
