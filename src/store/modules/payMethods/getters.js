export default {
  paymethods(state) {
    return state.paymethods;
  },
  paymethod(state) {
    return state.paymethod;
  },
  hasPayMethods(state) {
    return state.paymethods && state.paymethods.length > 0;
  },
};
