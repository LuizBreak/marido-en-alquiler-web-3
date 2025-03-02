import { axiosSvc } from "../../../services/axious.service";
import { apiSvc } from "../../../services";

const resource = "contactus";

export default {
  addContactus({ commit }, payload) {
    apiSvc
      .post(resource, payload)
      .then(() => {
        commit("registerContactus", payload);
      })
      .catch((error) => {
        console.log(
          "There was a problem creating contactus message: " + error.message
        );
      });
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
