import { createCrudActions } from "../../crud-actions";


export default {
  ...createCrudActions({"resource":"logtrail","singular":"LogTrail","plural":"LogTrails","mutation":"LOGTRAIL","listMutation":"SET_LOGTRAILS","serialized":[]}),
  
  
  
  
  
  async getLogTrailByClient({ commit }, payload) {
    await this.dispatch(
      "index",
      "logtrail/clients/" + payload.clientId,
      payload
    )
      .then((data) => {
        commit("SET_LOGTRAIL", JSON.parse(data));
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
