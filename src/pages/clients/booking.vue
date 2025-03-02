<template>
  <section id="booking">
    <div class="container">
      <div class="row pt-5 pt-md-4 pt-lg-0">
        <div
          class="col-xl-5 col-lg-6 col-md-7 order-md-1 pt-xl-5 pe-lg-0 mb-1 text-md-start text-center"
        >
          <!-- Just a place holder to keep the here off the navbar -->
        </div>
      </div>

      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5 col-xl-4">
          <h2 class="text-danger">¿Tienes un proyecto en mente?</h2>
          <h5>Déjanos ayudarte. Te lo resolvemos todo.</h5>
          <!-- <p class="text-muted">De Lunes a Viernes, 9am-5pm.</p> -->
          <img
            src="../../assets/img/illustrations/Build-your-home-amico-light-blue.png"
            alt="Your Project"
          />
        </div>
        <div class="col-md-6 col-lg-5 col-xl-4">
          <base-booking @trigger-msg-box="triggerMsgBox" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// Article Reference: https://vuelidate-next.netlify.app/#getting-started-1
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

const selectionRequired = (value) => value; // if no selected value will be null therefore true

export default {
  emits: ["trigger-msg-box"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
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

      console.log(JSON.stringfy(this.formData));

      this.InvokeApi(this.formData);
      this.resetFormData();
      await this.v$.$reset();
    },
    InvokeApi: function (dataElements) {
      import("/src/assets/js/contactUsEngine.js").then((mod) => {
        mod.postContactUsData(dataElements);

        //this.MsgBox();

        // Approch #1: $parent (worked)
        // this.$parent.triggerMsgBox(true, this.message);

        // Approach #2: @emit (worked)
        console.log("Booking receiced msg");
        this.$emit("trigger-msg-box", true, this.message);
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
  },
};
</script>

<style scoped></style>
