/* eslint-disable no-unused-vars */
export default {
  namespaced: true,
  state: {
    projects: [],
  },
  getters: {
    projects: (state) => state.projects,
    hasProjects(state) {
      return state.projects && state.projects.length > 0;
    },
    length(state) {
      return state.projects.length;
    },
  },
  mutations: {
    SET_PROJECTS(state, payload) {
      state.projects = [];
      for (const x of payload) {
        state.projects.push(x);
      }
    },
    SET_PROJECT: (state, payload) =>
      (state.projects[
        state.projects.findIndex((project) => project.id === payload.id)
      ] = payload),
    SOCKET_PROJECT: (state, payload) => {
      state.projects.push(payload);
    },
  },
  actions: {
    async initStore({ state, commit }) {
      // Tesing Init calls from App
      // console.log("ini.Triggered", state);
      // console.log("ini.Triggered", commit);
    },
    async all({ commit }) {
      await this.dispatch("index", "projects")
        .then((data) => {
          commit("SET_PROJECTS", JSON.parse(data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    save({ commit }, project) {
      return this.dispatch("create", { endpoint: "projects", params: project })
        .then((data) => {})
        .catch((error) => {});
    },
    destroy({ commit }, project) {
      return this.dispatch("destroy", { endpoint: "projects", params: project })
        .then((data) => {
          this.dispatch("project/refresh", data);
        })
        .catch((error) => {});
    },
    refresh({ commit }, project) {
      commit("SET_PROJECT", project);
    },
    async getProjectsByClient({ commit }, payload) {
      await this.dispatch(
        "index",
        "projects/clients/" + payload.clientId,
        payload
      )
        .then((data) => {
          commit("SET_PROJECTS", JSON.parse(data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getProjectsById({ commit }, payload) {
      await this.dispatch("index", "projects/" + payload.projectId, payload)
        .then((data) => {
          commit("SET_PROJECT", JSON.parse(data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
