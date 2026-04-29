<template>
  <form id="bookingForm" class="row mb-3" @submit.prevent="onSubmit">
    <div class="quick-contact-form">
      <h4 style="text-align: center">Registrar Proyecto</h4>
      <!-- <div class="container">
                <div class="row align-items-center">
                    <ul id="example-1" class="input-errors">
                        <li v-for="error of v$.$errors" :key="error.$uid">
                            <div class="error-msg">{{ error.$message }}</div>
                        </li>
                    </ul>
                </div>
            </div> -->
      <!-- Debub Only  
            <pre>
                {{v$.correo}}
            </pre> -->
      <div class="mb-3">
        <input
          class="form-control form-quriar-control"
          id="bb-nombre"
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
          id="bb-apellido"
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
          id="bb-telefono"
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
          id="bb-correo"
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
          name="bb-tipoDeServicios"
          id="bb-tipoDeServicios"
          :class="v$.tipoDeServicios.$error ? 'is-invalid' : ''"
          v-model="tipoDeServicios"
        >
          <option :value="null" disabled Selected>
            -- Seleccionar Tipo de Servicio --
          </option>
          <option :value="service" v-for="service in services" :key="service">
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
          id="bb-comentarios"
          placeholder="Caracteristicas del proyecto"
          style="height: 100px"
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
</template>

<script>
// Article Reference: https://vuelidate-next.netlify.app/#getting-started-1
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { EmailService } from "../../services/email.services";
import msgBoxDialog from "../../mixins/msgBoxDialog.js";
import * as types from "../../utils/types.js";

const selectionRequired = (value) => value; // if no selected value will be null therefore true

export default {
  mixins: [msgBoxDialog],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      contactusData: [],
      nombre: "",
      apellido: "",
      telefono: "",
      correo: "",
      tipoDeServicios: null,
      comentarios: "",
      tipoDeContacto: "Cliente",
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
        telefono: this.telefono,
        correo: this.correo,
        tipoDeServicios: this.tipoDeServicios,
        comentarios: this.comentarios,
        tipoDeContacto: "Cliente",
      };

      // vuex: Testing only - to be implemented in the future
      // this.$store.dispatch('contactus/registerContactus', this.formData);

      this.InvokeApi(this.formData);
      this.notify();
      this.resetFormData();
      await this.v$.$reset();
    },
    InvokeApi: function (dataElements) {
      // vuex: TODO: Testing only - to be implemented in the future
      // this.$store.dispatch('contactus/registerContactus', this.formData);

      import("/src/assets/js/contactUsEngine.js").then((mod) => {
        mod.postContactUsData(dataElements);

        // Approach 1 and 2 stopped woking when I turned
        //          booking from a page to a reusable
        //          component (for some reason vue.app does
        //          not hear the emit by the base component)

        // Approch #1: $parent (worked)
        // this.$parent.triggerMsgBox(true, this.message);

        // Approach #2: @emit (worked)
        this.triggerMsgBox(true, this.message);

        // Article to try: https://github.com/vuejs/core/issues/2540
        //                 https://programmerah.com/vue3-warning-vue-warn-extraneous-non-emits-event-listeners-changeparentprops-were-passed-to-component-32761/
      });
    },
    resetFormData: function () {
      this.nombre = "";
      this.apellido = "";
      this.telefono = "";
      this.correo = "";
      this.tipoDeServicios = null;
      this.comentarios = "";
      this.tipoDeContacto = "Cliente";
    },
    notify() {
      try {
        const msgData = {
          name: this.nombre + " " + this.apellido,
          email: this.correo,
          mobile: this.telefono,
          message:
            "marido-en-alquiler Client Service Request: " +
            this.comentarios +
            " tipo De Servicios: " +
            this.tipoDeServicios,
        };

        // console.log("Notify SysAdm by Email");
        // console.table("msgData", msgData);

        EmailService.send(msgData);
      } catch (error) {
        console.log(error);
      }
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
