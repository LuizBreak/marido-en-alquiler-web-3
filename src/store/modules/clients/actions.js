import { apiSvc } from "../../../services";

const resource = "clients";

export default {
  async initStore({ state, commit }) {
    if (!state.clients["clients"]) {
      await apiSvc
        .get(resource)
        .then((response) => {
          commit("SET_CLIENT", response.data.body);
          console.log("ini.data", response.data.body);
        })
        .catch((error) => {
          console.log("There was an error fetching client: " + error.message);
        });
    }
  },
  async fetchClients({ commit }) {
    await apiSvc
      .get(resource)
      .then((response) => {
        commit("SET_CLIENTS", response.data.body);
      })
      .catch((error) => {
        console.log("There was an error fetching client: " + error.message);
      });
  },
  async fetchClient({ commit }, data) {
    await apiSvc
      .getById(resource, data.id)
      .then((response) => {
        commit("SET_CLIENT", response.data.body);
      })
      .catch((error) => {
        console.log("There was an error fetching client: " + error.message);
      });
  },
  createClient({ commit }, client) {
    apiSvc
      .post(resource, client)
      .then(() => {
        console.log("createClient", client);
        commit("ADD_NEW_CLIENT", client);
      })
      .catch((error) => {
        console.log("There was a problem creating client: " + error.message);
      });
  },
  deleteClient({ commit }, client) {
    apiSvc.delete(resource, client).then(() => {
      commit("DELETE_CLIENT", client);
    });
  },
  updateClient({ commit }, client) {
    console.log(client);
    apiSvc
      .update(resource, client)
      .then(() => {
        commit("UPDATE_CLIENT", client);
      })
      .catch((error) => {
        console.log("there was an error updating client: " + error.message);
      });
  },
  async getClientInfoByProjectId({ commit }, data) {
    await apiSvc
      .getById(resource + "/getbyprojectid", data.id)
      .then((response) => {
        commit("SET_CLIENT", response.data.body);
      })
      .catch((error) => {
        console.log("There was an error fetching client: " + error.message);
      });
  },
};
