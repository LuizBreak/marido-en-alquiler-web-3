export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.didAutoLogout = false;
    state.loggedUser = { ...(payload.loggedUser || {}) };
  },
  updateUserAttributes(state, payload) {
    /*
     * Attention: maintain what is and add the caracteristics of a client
     *            or contractor into it
     */
    state.loggedUser = {
      ...state.loggedUser,
      ...(payload.ClientOrContractorInfo || {}),
    };
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  },
  setSignedIn(state, flag) {
    state.signedIn = flag;
  },
  setCognitoUser(state, payload) {
    state.user = payload;
    state.token = payload.signInUserSession.accessToken.jwtToken;
  },
  setUserAvatar(state, payload) {
    state.loggedUser.avatar = payload.avatar;
  },
};
