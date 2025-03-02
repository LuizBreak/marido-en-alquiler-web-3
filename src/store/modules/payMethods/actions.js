import { apiSvc } from "../../../services";

const resource = "paymethods";

export default {
  fetchPayMethods({ commit }) {
    apiSvc
      .get(resource)
      .then((response) => {
        commit("SET_PAYMETHOD", response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching pay method: " + error.message);
      });
  },
  fetchPayMethod({ commit }, data) {
    apiSvc
      .getById(resource, data.id)
      .then((response) => {
        // console.table(response.data);
        commit("SET_PAYMETHOD", response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching pay method: " + error.message);
      });
  },
  createPayMethod({ commit }, paymethod) {
    apiSvc
      .post(resource, paymethod)
      .then(() => {
        commit("ADD_NEW_PAYMETHOD", paymethod);
      })
      .catch((error) => {
        console.log(
          "There was a problem creating pay method: " + error.message
        );
      });
  },
  deletePayMethod({ commit }, paymethod) {
    apiSvc.delete(resource, paymethod).then(() => {
      commit("DELETE_PAYMETHOD", paymethod);
    });
  },
  updatePayMethod({ commit }, paymethod) {
    // console.table(paymethod);
    apiSvc
      .update(resource, paymethod)
      .then(() => {
        commit("UPDATE_PAYMETHOD", paymethod);
      })
      .catch((error) => {
        console.log("there was an error updating paymethod: " + error.message);
      });
  },
  async getPayMethodsByClient({ commit }, payload) {
    await this.dispatch(
      "index",
      "paymethods/clients/" + payload.clientId,
      payload
    )
      .then((data) => {
        // console.log("getPayMethodsByClient.data", data);
        commit("SET_PAYMETHODS", JSON.parse(data));
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
