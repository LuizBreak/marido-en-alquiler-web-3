import { axiosSvc } from "./axious.service";
import { TokenService } from "./storage.service";
import { resourceId } from "./resource-id";

export const apiSvc = {
  /**
   * Article Reference: https://medium.com/@zitko/structuring-a-vue-project-authentication-87032e5bfe16
   **/
  //

  init(baseURL) {
    axiosSvc.defaults.baseURL = baseURL;
  },

  setHeader() {
    axiosSvc.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${TokenService.getToken()}`;
  },

  removeHeader() {
    axiosSvc.defaults.headers.common = {};
  },

  get(resource) {
    return axiosSvc.get(`/${resource}`);
  },

  getById(resource, id) {
    return axiosSvc.get(`/${resource}/` + id);
  },

  async post(resource, entity) {
    return axiosSvc.post(`/${resource}`, entity);
  },

  delete(resource, entity) {
    return axiosSvc.delete(`/${resource}/` + resourceId(resource, entity));
  },

  update(resource, entity, payload = entity) {
    return axiosSvc.put(`/${resource}/` + resourceId(resource, entity), payload);
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  async customRequest(data) {
    return await axiosSvc(data);
  },
};
