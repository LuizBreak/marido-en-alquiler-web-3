import { axiosSvc } from "../../../services/axious.service";
import { apiSvc } from "../../../services";

const resource = "contactus";

export default {
  async addContactus({ commit }, payload) {
    const response = await apiSvc.post(resource, payload);
    const saved = response.data.data;
    commit("registerContactus", { ...payload, ...saved });
    return saved;
  },

  async registerContactus({ commit, state }, data) {
    const baseURL = state.storeBaseURL;

    const contactusData = {
      // "id": Number(formData.contactUsMsgId),
      firstName: data.nombre,
      lastName: data.apellido,
      driversLicense: data.cedula,
      address: data.direccion,
      phone: data.telefono,
      email: data.correo,
      serviceTypes: data.tipoDeServicios,
      bank: data.banco,
      accountType: data.tipoDeCuenta,
      accountNumber: data.numeroDeCuenta,
      comments: data.comentarios,
      contactType: data.tipoDeContacto,
    };

    try {
      const res = await axiosSvc.post(baseURL + "/contactus", contactusData);
      commit("registerContactus", res);
    } catch (e) {
      console.error(e);
    }
  },
};
