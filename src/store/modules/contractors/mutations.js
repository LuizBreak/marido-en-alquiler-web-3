export default {
  SET_CONTRACTORS(state, contractors) {
    console.table("SET_CONTRACTORS", JSON.parse(contractors));
    state.contractors = [];
    for (const x of JSON.parse(contractors)) {
      state.contractors.push(x);
    }
  },
  SET_CONTRACTOR(state, contractor) {
    state.contractor = JSON.parse(contractor);
  },
  ADD_NEW_CONTRACTOR(state, contractor) {
    state.contractors.push(contractor);
  },
  DELETE_CONTRACTOR(state, contractor) {
    let index = state.contractors.indexOf(contractor);
    if (index > -1) {
      state.contractors.splice(index, 1);
    }
  },
  UPDATE_CONTRACTOR(state, contractor) {
    state.contractors[contractor.id] = contractor;
    state.contractor = contractor;
  },
  RESET_CONTRACTOR(state) {
    state.contractor = {};
  },
};
