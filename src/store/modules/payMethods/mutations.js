export default {
  SET_PAYMETHODS(state, paymethods) {
    console.table("SET_PAYMETHODS", paymethods);
    state.paymethods = [];
    for (const x of paymethods) {
      state.paymethods.push(x);
    }
  },
  SET_PAYMETHOD(state, paymethod) {
    state.paymethod = paymethod;
  },
  ADD_NEW_PAYMETHOD(state, paymethod) {
    state.paymethods.push(paymethod);
  },
  DELETE_PAYMETHOD(state, paymethod) {
    let index = state.paymethods.indexOf(paymethod);
    if (index > -1) {
      state.paymethods.splice(index, 1);
    }
  },
  UPDATE_PAYMETHOD(state, paymethod) {
    state.paymethods[paymethod.id] = paymethod;
  },
};
