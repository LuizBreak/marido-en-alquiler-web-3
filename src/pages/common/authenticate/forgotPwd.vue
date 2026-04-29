<template>
  <section id="template">
    <div class="modal-content center mb-3">
      <div class="modal-body mx-0 py-2 py-sm-0" v-if="!showSecurityCodeForm">
        <router-link
          class="btn-close position-absolute top-0 end-0 mt-3 me-3"
          to="/"
        >
        </router-link>
        <div class="row mx-0 align-items-center">
          <div class="col-md-6 border-end-md p-4 p-sm-5">
            <h2 class="h3 mb-4 mb-sm-5 text-center">
              Olvidé mi contraseña
            </h2>
            <img
              class="d-block mx-auto"
              src="../../../assets/img/illustrations/Forgot-password-pana.svg"
              width="344"
              alt="Illustration"
            />
          </div>
          <div class="col-md-6 px-4 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5">
            <p class="text-center">Enviar instrucciones por correo</p>
            <form class="needs-validation" @submit.prevent="submitForm">
              <div class="mb-4">
                <label class="form-label mb-2" for="signin-email">Correo</label>
                <input
                  class="form-control"
                  type="email"
                  id="signin-email"
                  placeholder="Entra tu correo"
                  required
                  v-model.trim="email"
                />
              </div>

              <div>
                <button
                  class="btn btn-primary btn-lg w-100"
                  type="submit"
                  @click.prevent="sendConfirmationCode"
                >
                  Enviar <i class="fas fa-paper-plane ms-2" />
                </button>
                <br />
                <br />
                <p
                  class="input-errors blink text-center"
                  style="color: red; text-decoration: blink"
                  v-if="!formIsValid"
                >
                  {{ this.errorMessage }}<br />
                </p>
              </div>
              <div class="form-check mb-4">
                <label class="form-check-label" for="agree-to-terms">
                  Al continuar, acepta los
                  <router-link to="/terminos">
                    Términos de Servicio
                  </router-link>
                  y
                  <router-link to="/privacidad">
                    Política de Privacidad
                  </router-link>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        class="modal-body mx-0 my-3 py-2 py-sm-0"
        v-if="showSecurityCodeForm"
      >
        <ResetPwdWithCode :email="email"></ResetPwdWithCode>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ResetPwdWithCode from "./resetPwdWithCode.vue";
export default {
  name: "forgot-password",
  components: {
    ResetPwdWithCode,
  },
  data() {
    return {
      email: "luiz.break@gmail.com",
      errorMessage: "",
      showSecurityCodeForm: false,
      urls: [],
    };
  },
  methods: {
    async sendConfirmationCode() {
      this.formIsValid = true;
      if (this.email === "") {
        this.errorMessage = "Correo es un campo obligatorio.";
        this.formIsValid = false;
        return;
      }
      try {
        await this.$store.dispatch("sendConfirmationCode", this.email);
        this.triggerMsgBox(
          true,
          "El código de reinicio fue enviado por correo electrónico. Revisa tu correo."
        );
        this.showSecurityCodeForm = true;
      } catch (error) {
        this.formIsValid = false;
        this.errorMessage = error.message;
      }
    },
  },
  computed: {
    ...mapGetters(["loggedUser", "user"]),
  },
  created() {},
  mounted() {
    this.$emit("child-breadcrumbs-urls", this.urls);
  },
};
</script>

<style scoped>
.center {
  margin: auto;
  width: 70%;
}
</style>
