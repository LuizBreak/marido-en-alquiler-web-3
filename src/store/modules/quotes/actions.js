import { apiSvc } from "../../../services";

const resource = "quotes";

export default {
  fetchQuotes({ commit }) {
    apiSvc
      .get(resource)
      .then((response) => {
        commit("SET_QUOTE", response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching quote method: " + error.quote);
      });
  },
  fetchQuote({ commit }, data) {
    apiSvc
      .getById(resource, data.id)
      .then((response) => {
        commit("SET_QUOTE", response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching quote method: " + error.quote);
      });
  },
  createQuote({ commit }, quote) {
    apiSvc
      .post(resource, quote)
      .then(() => {
        commit("ADD_NEW_QUOTE", quote);
      })
      .catch((error) => {
        console.log(
          "There was a problem creating quote method: " + error.quote
        );
      });
  },
  deleteQuote({ commit }, quote) {
    apiSvc.delete(resource, quote).then(() => {
      commit("DELETE_QUOTE", quote);
    });
  },
  updateQuote({ commit }, quote) {
    apiSvc
      .update(resource, quote)
      .then(() => {
        commit("UPDATE_QUOTE", quote);
      })
      .catch((error) => {
        console.log("there was an error updating quote: " + error.quote);
      });
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
