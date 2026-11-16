import projects from "./project";
import { axiosSvc } from "../../../services/axious.service";
import { resourceId } from "../../../services/resource-id";
export default {
  namespaced: false,
  modules: { projects },
  state: { loading: false, pendingRequests: 0 },
  getters: { loading: state => state.loading },
  mutations: {
    SET_LOADING(state, pending) {
      state.pendingRequests = Math.max(0, state.pendingRequests + (pending ? 1 : -1));
      state.loading = state.pendingRequests > 0;
    },
  },
  actions: {
    async index({ commit }, endpoint) {
      commit("SET_LOADING", true);
      try { return (await axiosSvc.get(endpoint)).data.body; }
      finally { commit("SET_LOADING", false); }
    },
    async create({ commit }, payload) {
      commit("SET_LOADING", true);
      try { return (await axiosSvc.post(payload.endpoint, payload.params)).data; }
      finally { commit("SET_LOADING", false); }
    },
    async destroy({ commit }, payload) {
      commit("SET_LOADING", true);
      try { return (await axiosSvc.delete(payload.endpoint + "/" + resourceId(payload.endpoint, payload.params))).data; }
      finally { commit("SET_LOADING", false); }
    },
  },
};
