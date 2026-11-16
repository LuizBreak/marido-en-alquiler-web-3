import { createCrudActions } from "../../crud-actions";
import { apiSvc } from "../../../services";

const resource = "clients";

export default {
  ...createCrudActions({"resource":"clients","singular":"Client","plural":"Clients","mutation":"CLIENT","listMutation":"SET_CLIENTS","serialized":["SET_CLIENT","SET_CLIENTS"]}),
  
  
  
  
  
  
  async getClientInfoByProjectId({ commit }, data) {
    await apiSvc
      .getById(resource + "/getbyprojectid", data.id)
      .then((response) => {
        commit("SET_CLIENT", response.data.body);
      })
      .catch((error) => {
        console.log("There was an error fetching client: " + error.message);
      });
  },
};
