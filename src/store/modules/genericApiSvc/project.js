import { upsertEntity } from "../../entity-state";
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
    SET_PROJECT(state, payload) {
      if (payload) upsertEntity(state.projects, payload, "projectId");
    },
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
    async save({ commit }, project) {
      const entity = typeof project === "string" ? JSON.parse(project) : project;
      const response = await this.dispatch("create", { endpoint: "projects", params: entity });
      const saved = { ...entity, ...response.data };
      commit("SET_PROJECT", saved);
      return saved;
    },
    async destroy({ state, commit }, project) {
      await this.dispatch("destroy", { endpoint: "projects", params: project });
      commit("SET_PROJECTS", state.projects.filter(item => String(item.projectId) !== String(project.projectId)));
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
