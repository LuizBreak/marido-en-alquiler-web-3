<template>
  <section>
    <div id="pro-registration" class="container my-4 pt-4">
      <!-- spacer to avoid pages to be under the navbar -->
      <div class="container mx-auto mt-2 mb-md-5 pt-2"></div>
    </div>
    <div class="container mx-auto mt-4 mb-md-5 pt-4">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5 col-xl-4">
          <img
            class="img-fluid"
            src="../../../assets/img/gallery/handyman-no-bg.png"
            alt="handyman"
          />
        </div>
        <div class="col-md-6 col-lg-5 col-xl-4">
          <div>
            <h3 class="text-danger">Regístrate hoy</h3>
            <h5>
              Crea tu perfil hoy y deja que nosotros busquemos tus proximos
              clientes.
            </h5>
            <p class="text-muted"></p>
            <br />
          </div>
          <form class="row" @submit.prevent="onSubmit" autocomplete="on">
            <div class="quick-contact-form">
              <div class="mb-3">
                <input
                  class="form-control form-quriar-control"
                  id="nombre"
                  type="text"
                  :class="v$.nombre.$error ? 'is-invalid' : ''"
                  placeholder="Nombre"
                  v-model="v$.nombre.$model"
                />
                <div
                  class="input-errors text-danger"
                  v-for="error of v$.nombre.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
              <div class="mb-3">
                <input
                  class="form-control form-quriar-control"
                  id="apellido"
                  type="text"
                  placeholder="Apellido"
                  v-model="apellido"
                  :class="v$.apellido.$error ? 'is-invalid' : ''"
                />
                <div
                  class="input-errors text-danger"
                  v-for="error of v$.apellido.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
              <div class="mb-3">
                <input
                  class="form-control form-quriar-control"
                  id="cedula"
                  type="text"
                  placeholder="Cedula"
                  v-model="cedula"
                  :class="v$.cedula.$error ? 'is-invalid' : ''"
                />
                <div
                  class="input-errors text-danger"
                  v-for="error of v$.cedula.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
              <div class="mb-3">
                <input
                  class="form-control form-quriar-control"
                  id="direccion"
                  type="text"
                  placeholder="Direccion"
                  v-model="direccion"
                  :class="v$.direccion.$error ? 'is-invalid' : ''"
                />
                <div
                  class="input-errors text-danger"
                  v-for="error of v$.direccion.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
              <div class="mb-3">
                <input
                  class="form-control form-quriar-control"
                  id="telefono"
                  type="text"
                  :class="v$.telefono.$error ? 'is-invalid' : ''"
                  placeholder="Telefono"
                  v-model="telefono"
                />
                <div
                  class="input-errors text-danger"
                  v-for="error of v$.telefono.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
              <div class="mb-3">
                <input
                  class="form-control form-quriar-control"
                  id="correo"
                  type="text"
                  :class="v$.correo.$error ? 'is-invalid' : ''"
                  placeholder="Correo"
                  v-model="correo"
                />
                <div
                  class="input-errors text-danger"
                  v-for="error of v$.correo.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
              <div class="mb-3">
                <select
                  class="form-control form-quriar-control"
                  name="tipoDeServicios"
                  id="_tipoDeServicios"
                  :class="v$.tipoDeServicios.$error ? 'is-invalid' : ''"
                  v-model="tipoDeServicios"
                >
                  <option :value="null" disabled Selected>
                    -- Seleccionar Tipo de Servicio --
                  </option>
                  <option
                    :value="service"
                    v-for="service in services"
                    :key="service"
                  >
                    {{ capitalizeFirstLetter(service) }}
                  </option>
                </select>
                <div
                  class="input-errors text-danger"
                  v-for="error of v$.tipoDeServicios.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
              <div class="mb-3">
                <textarea
                  class="form-control form-quriar-control border-400"
                  :class="v$.comentarios.$error ? 'is-invalid' : ''"
                  id="comentarios"
                  placeholder="Describa las caracteristicas de tus especialidades"
                  style="height: 150px"
                  v-model="comentarios"
                />
                <div
                  class="input-errors text-danger"
                  v-for="error of v$.comentarios.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
              <div class="d-grid">
                <button class="btn btn-primary" type="submit">
                  Enviar<i class="fas fa-paper-plane ms-2"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import * as types from "../../../utils/types.js";

const selectionRequired = (value) => value; // if no selected value will be null therefore true

export default {
  emits: ["trigger-msg-box"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      // formData:[],
      nombre: "",
      apellido: "",
      cedula: "",
      direccion: "",
      telefono: "",
      correo: "",
      tipoDeServicios: null,
      banco: "",
      numeroDeCuenta: "",
      tipoDeCuenta: "",
      comentarios: "",
      tipoDeContacto: "Contractor",
      message: "Gracias por registrarte. Pronto entramos en contacto contigo.",
    };
  },
  validations() {
    const requiedMsg = "Campo obligatorio.";
    const selectionRequiredMsg = "Seleccione una opcion valida.";
    const invalidEmailMsg = "Correo invalido";

    return {
      nombre: { required: helpers.withMessage(requiedMsg, required) },
      apellido: { required: helpers.withMessage(requiedMsg, required) },
      cedula: { required: helpers.withMessage(requiedMsg, required) },
      direccion: { required: helpers.withMessage(requiedMsg, required) },
      telefono: { required: helpers.withMessage(requiedMsg, required) },
      correo: {
        required: helpers.withMessage(requiedMsg, required),
        email: helpers.withMessage(invalidEmailMsg, email),
      },
      tipoDeServicios: {
        selectionRequired: helpers.withMessage(
          selectionRequiredMsg,
          selectionRequired
        ),
      },
      comentarios: { required: helpers.withMessage(requiedMsg, required) },
    };
  },
  methods: {
    async onSubmit() {
      const result = await this.v$.$validate();
      if (!result) {
        return;
      }
      // perform async actions
      this.formData = {
        nombre: this.nombre,
        apellido: this.apellido,
        cedula: this.cedula,
        direccion: this.direccion,
        telefono: this.telefono,
        correo: this.correo,
        tipoDeServicios: this.tipoDeServicios,
        banco: this.banco,
        numeroDeCuenta: this.numeroDeCuenta,
        tipoDeCuenta: this.tipoDeCuenta,
        comentarios: this.comentarios,
        tipoDeContacto: "Contractor",
      };
      this.InvokeApi(this.formData);
      this.resetFormData();
      await this.v$.$reset();
    },
    InvokeApi: function (dataElements) {
      import("/src/assets/js/contactUsEngine.js").then((mod) => {
        mod.postContactUsData(dataElements);
        this.$emit("trigger-msg-box", true, this.message);
      });
    },
    resetFormData: function () {
      this.nombre = "";
      this.apellido = "";
      this.cedula = "";
      this.direccion = "";
      this.telefono = "";
      this.correo = "";
      this.tipoDeServicios = null;
      this.banco = "";
      this.numeroDeCuenta = "";
      this.tipoDeCuenta = "";
      this.comentarios = "";
      this.tipoDeContacto = "Contractor";
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
  computed: {
    services() {
      return types.SERVICE_TYPES;
    },
  },
};
</script>
<style scoped></style>
