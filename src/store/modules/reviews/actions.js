import { createCrudActions } from "../../crud-actions";


export default {
  ...createCrudActions({"resource":"reviews","singular":"Review","plural":"Reviews","mutation":"REVIEW","listMutation":"SET_REVIEWS","serialized":[]}),
  
  
  
  
  
  async getReviewsByClient({ commit }, payload) {
    await this.dispatch("index", "reviews/clients/" + payload.clientId, payload)
      .then((data) => {
        // console.log("getReviewsByClient.data", data);
        commit("SET_REVIEWS", JSON.parse(data));
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
