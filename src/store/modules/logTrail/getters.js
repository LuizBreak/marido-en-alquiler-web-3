export default {
  logtrails(state) {
    return state.logtrails;
  },
  logtrail(state) {
    return state.logtrail;
  },
  hasLogTrails(state) {
    return state.logtrails && state.logtrails.length > 0;
  },
};
