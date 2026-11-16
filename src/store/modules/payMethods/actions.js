import { createCrudActions } from "../../crud-actions";


export default {
  ...createCrudActions({"resource":"paymethods","singular":"PayMethod","plural":"PayMethods","mutation":"PAYMETHOD","listMutation":"SET_PAYMETHODS","serialized":[]}),
  
  
  
  
  
  async getPayMethodsByClient({ commit }, payload) {
    await this.dispatch(
      "index",
      "paymethods/clients/" + payload.clientId,
      payload
    )
      .then((data) => {
        // console.log("getPayMethodsByClient.data", data);
        commit("SET_PAYMETHODS", JSON.parse(data));
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
