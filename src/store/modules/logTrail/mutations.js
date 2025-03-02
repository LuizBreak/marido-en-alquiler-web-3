export default {
  SET_LOGTRAILS(state, logtrails) {
    console.table("SET_LOGTRAILS", logtrails);
    state.logtrails = [];
    for (const x of logtrails) {
      state.logtrails.push(x);
    }
  },
  SET_LOGTRAIL(state, logtrail) {
    state.logtrail = logtrail;
  },
  ADD_NEW_LOGTRAIL(state, logtrail) {
    state.logtrails.push(logtrail);
  },
  DELETE_LOGTRAIL(state, logtrail) {
    let index = state.logtrails.indexOf(logtrail);
    if (index > -1) {
      state.logtrails.splice(index, 1);
    }
  },
  UPDATE_LOGTRAIL(state, logtrail) {
    state.logtrails[logtrail.id] = logtrail;
  },
};
