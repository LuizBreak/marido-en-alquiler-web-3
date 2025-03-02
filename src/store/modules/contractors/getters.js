export default {
  contractors(state) {
    return state.contractors;
  },
  contractor(state) {
    return state.contractor;
  },
  hasContractors(state) {
    return state.contractors && state.contractors.length > 0;
  },
  length(state) {
    return state.contractors.length;
  },
  companyName(state) {
    return state.contractor.companyName;
  },
};
