import { apiSvc } from "../services/api.service";

// Every operation returns its request, so callers can retain input on failure.
export function createCrudActions({ resource, singular, plural, mutation, listMutation, serialized = [], prepareWrite = entity => entity }) {
  const payload = (name, data) => serialized.includes(name) ? JSON.stringify(data) : data;
  const actions = {
    async [`fetch${plural}`]({ commit }) {
      const response = await apiSvc.get(resource);
      commit(listMutation, payload(listMutation, response.data.data));
      return response.data.data;
    },
    async [`fetch${singular}`]({ commit }, entity) {
      const response = await apiSvc.getById(resource, entity.id);
      commit(`SET_${mutation}`, payload(`SET_${mutation}`, response.data.data));
      return response.data.data;
    },
    async [`create${singular}`]({ commit }, entity) {
      const response = await apiSvc.post(resource, prepareWrite(entity, "create"));
      const saved = { ...entity, ...(response.data.data || {}) };
      commit(`ADD_NEW_${mutation}`, saved);
      return saved;
    },
    async [`update${singular}`]({ commit }, entity) {
      await apiSvc.update(resource, entity, prepareWrite(entity, "update"));
      commit(`UPDATE_${mutation}`, entity);
      return entity;
    },
    async [`delete${singular}`]({ commit }, entity) {
      await apiSvc.delete(resource, entity);
      commit(`DELETE_${mutation}`, entity);
      return entity;
    },
  };
  actions.initStore = (context) => actions[`fetch${plural}`](context);
  return actions;
}
