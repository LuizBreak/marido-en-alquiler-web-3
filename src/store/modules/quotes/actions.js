import { createCrudActions } from "../../crud-actions";


export default {
  ...createCrudActions({"resource":"quotes","singular":"Quote","plural":"Quotes","mutation":"QUOTE","listMutation":"SET_QUOTES","serialized":[]}),
  
  
  
  
  
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
