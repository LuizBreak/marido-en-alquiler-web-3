import * as types from "../../../utils/types";

export default {
  signedIn: (state) => !!state.signedIn,
  isAuthenticated: (state) => !!state.signedIn,
  user: (state) => state.user,
  loggedUser: (state) => state.loggedUser,
  userId: (state) => state.userId,
  token: (state) => state.token,
  didAutoLogout: (state) => state.didAutoLogout,
  isClient(state) {
    return state.loggedUser.userType === types.CLIENT ? true : false;
  },
  isContractor(state) {
    return state.loggedUser.userType === types.CONTRACTOR ? true : false;
  },
  isSysAdmin(state) {
    return state.loggedUser.userType === types.SYS_ADM ? true : false;
  },
};
