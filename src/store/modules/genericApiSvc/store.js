import { createLogger } from "vuex";

import projecstModule from "./project";
import { axiosSvc } from "../../../services/axious.service";

const debug = process.env.NODE_ENV !== "production";

export default {
  namespaced: false,
  modules: {
    projects: projecstModule,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state: {
    loading: false,
  },
  getters: {
    loading: (state) => state.loading,
  },
  mutations: {
    SET_LOADING: (state, payload) => (state.loading = payload),
  },
  actions: {
    async initStore({ state, commit }) {
      // Tesing Init calls from App
      console.log("ini.data", state);
      console.log("ini.data", commit);
    },
    async index({ commit }, endpoint, params) {
      commit("SET_LOADING", true);
      return new Promise((res, rej) => {
        // console.log("params", params);
        axiosSvc
          .get(endpoint, { params: params })
          .then((response) => {
            res(response.data.body);
          })
          .catch((error) => {
            rej(error);
          })
          .then(() => {
            commit("SET_LOADING", false);
          });
      });
    },
    create({ commit }, payload) {
      commit("SET_LOADING", true);
      return new Promise((res, rej) => {
        axiosSvc
          .post(payload.endpoint, payload.params)
          .then((response) => {
            res(response.data);
          })
          .catch((error) => {
            rej(error);
          })
          .then(() => {
            commit("SET_LOADING", false);
          });
      });
    },
    destroy({ commit }, payload) {
      commit("SET_LOADING", true);
      return new Promise((res, rej) => {
        axiosSvc
          .delete(payload.endpoint + "/" + payload.params.id)
          .then((response) => {
            res(response.data);
          })
          .catch((error) => {
            rej(error);
          })
          .then(() => {
            commit("SET_LOADING", false);
          });
      });
    },
  },
};
