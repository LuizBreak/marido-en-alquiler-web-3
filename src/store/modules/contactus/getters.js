export default {
  contactus(state) {
    return state.contactus;
  },
  hasContactUs(state) {
    return state.contactus && state.contactus.length > 0;
  },
};
