import { apiSvc } from "../../../services";

const resource = "contractors";

export default {
  async initStore({ state, commit }) {
    if (!state.contractors["contractors"]) {
      await apiSvc
        .get(resource)
        .then((response) => {
          commit("SET_CONTRACTOR", response.data.body);
        })
        .catch((error) => {
          console.log(
            "There was an error fetching contractor: " + error.message
          );
        });
    }
  },
  async fetchContractors({ commit }) {
    await apiSvc
      .get(resource)
      .then((response) => {
        commit("SET_CONTRACTORS", response.data.body);
      })
      .catch((error) => {
        console.log("There was an error fetching contractor: " + error.message);
      });
  },
  async fetchContractor({ commit }, data) {
    await apiSvc
      .getById(resource, data.id)
      .then((response) => {
        commit("SET_CONTRACTOR", response.data.body);
      })
      .catch((error) => {
        console.log("There was an error fetching contractor: " + error.message);
      });
  },
  async createContractor({ commit }, contractor) {
    console.log("creating a contractor");
    await apiSvc
      .post(resource, contractor)
      .then(() => {
        commit("ADD_NEW_CONTRACTOR", contractor);
      })
      .catch((error) => {
        console.log(
          "There was a problem creating contractor: " + error.message
        );
      });
  },
  async deleteContractor({ commit }, contractor) {
    await apiSvc.delete(resource, contractor).then(() => {
      commit("DELETE_CONTRACTOR", contractor);
    });
  },
  async updateContractor({ commit }, contractor) {
    console.log(contractor);
    await apiSvc
      .update(resource, contractor)
      .then(() => {
        commit("UPDATE_CONTRACTOR", contractor);
      })
      .catch((error) => {
        console.log("there was an error updating contractor: " + error.message);
      });
  },
};
