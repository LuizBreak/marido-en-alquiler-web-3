import { apiSvc } from "../../../services";

const resource = "logtrail";

export default {
  fetchLogTrails({ commit }) {
    apiSvc
      .get(resource)
      .then((response) => {
        commit("SET_LOGTRAIL", response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching pay method: " + error.message);
      });
  },
  fetchLogTrail({ commit }, data) {
    apiSvc
      .getById(resource, data.id)
      .then((response) => {
        // console.table(response.data);
        commit("SET_LOGTRAIL", response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching pay method: " + error.message);
      });
  },
  createLogTrail({ commit }, logtrail) {
    apiSvc
      .post(resource, logtrail)
      .then(() => {
        commit("ADD_NEW_LOGTRAIL", logtrail);
      })
      .catch((error) => {
        console.log("There was a problem creating log trail: " + error.message);
      });
  },
  deleteLogTrail({ commit }, logtrail) {
    apiSvc.delete(resource, logtrail).then(() => {
      commit("DELETE_LOGTRAIL", logtrail);
    });
  },
  updateLogTrail({ commit }, logtrail) {
    // console.table(logtrail);
    apiSvc
      .update(resource, logtrail)
      .then(() => {
        commit("UPDATE_LOGTRAIL", logtrail);
      })
      .catch((error) => {
        console.log("there was an error updating logtrail: " + error.message);
      });
  },
  async getLogTrailByClient({ commit }, payload) {
    await this.dispatch(
      "index",
      "logtrail/clients/" + payload.clientId,
      payload
    )
      .then((data) => {
        commit("SET_LOGTRAIL", JSON.parse(data));
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
