// For dynamo const url = 'https://u3d98p841a.execute-api.us-east-1.amazonaws.com/resources';
// For mysql  const url = 'http://localhost:5000';
// const apiServer = 'https://hwuag0xk7k.execute-api.us-east-1.amazonaws.com/dev/marido-backend';

export const API_ROOT =
  process.env.VUE_APP_ENV === "production"
    ? process.env.VUE_APP_BASE_URL
    : process.env.VUE_APP_DEV_BASE_URL;

async function postContactUsData(formData) {
  const url = API_ROOT + "/contactus/";

  let data = {
    // "id": Number(formData.contactUsMsgId),
    firstName: formData.nombre,
    lastName: formData.apellido,
    driversLicense: formData.cedula,
    address: formData.direccion,
    phone: formData.telefono,
    email: formData.correo,
    serviceTypes: formData.tipoDeServicios,
    bank: formData.banco,
    accountType: formData.tipoDeCuenta,
    accountNumber: formData.numeroDeCuenta,
    comments: formData.comentarios,
    contactType: formData.tipoDeContacto,
  };

  // console.log(data);

  var request = new Request(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const response = await fetch(request);
  const json = await response.json();
  console.log(json);
}
export { postContactUsData };
