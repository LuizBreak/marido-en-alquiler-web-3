export function profileSaveError(error) {
  if (error.message === "Image storage is not configured.") {
    return "No se pudo guardar la foto: el almacenamiento de imagenes no esta configurado. Puedes guardar los datos sin seleccionar una foto.";
  }
  const status = error.response?.status;
  if (status) return `El servidor rechazo el guardado (HTTP ${status}). Tus cambios siguen en el formulario.`;
  if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
    return "No se pudo conectar con el servidor. Tus cambios siguen en el formulario; revisa la conexion e intentalo de nuevo.";
  }
  return "No se pudo confirmar el guardado. Tus cambios siguen en el formulario; intentalo de nuevo.";
}
