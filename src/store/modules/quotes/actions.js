import { apiSvc } from "../../../services/api.service";
import { createCrudActions } from "../../crud-actions";


export default {
  ...createCrudActions({"resource":"quotes","singular":"Quote","plural":"Quotes","mutation":"QUOTE","listMutation":"SET_QUOTES","serialized":[]}),
  
  
  
  
  
  async getQuotesByProject({ commit }, { projectId }) {
    const response = await apiSvc.get('quotes/projects/' + projectId);
    commit('SET_QUOTES', response.data.data);
    return response.data.data;
  },
  async acceptQuote({ commit }, quote) {
    const response = await apiSvc.update('quotes', quote, { clientConfirmation: true, expectedVersion: quote.version });
    const saved = response.data.data;
    commit('SET_QUOTE', saved.quote);
    commit('projects/SET_PROJECT', saved.project, { root: true });
    return saved;
  },
  async getQuotesByClient({ commit }, quoteload) {
    await this.dispatch(
      "index",
      "quotes/clients/" + quoteload.clientId,
      quoteload
    )
      .then((data) => {
        commit("SET_QUOTES", JSON.parse(data));
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
