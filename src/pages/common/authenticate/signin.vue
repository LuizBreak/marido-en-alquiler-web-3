<template>
  <div>
    <Signup />

    <!-- Sign In Modal-->
    <div class="modal fade" id="signin-modal" tabindex="-1" aria-hidden="true">
      <div
        class="modal-dialog modal-lg modal-dialog-centered p-2 my-0 mx-auto"
        style="max-width: 950px"
      >
        <div class="modal-content">
          <div class="modal-body px-0 py-2 py-sm-0">
            <button
              class="btn-close position-absolute top-0 end-0 mt-3 me-3"
              type="button"
              @click="closeSigninModal"
              aria-label="Close"
              id="close"
            ></button>
            <div class="row mx-0 align-items-center">
              <div class="col-md-6 border-end-md p-4 p-sm-5">
                <h2 class="h3 mb-4 mb-sm-5">
                  ¡Hola!<br />Te damos la bienvenida.
                </h2>
                <img
                  class="d-block mx-auto"
                  src="../../../img/signin-modal/signin.svg"
                  width="344"
                  alt="Illustration"
                />
                <div class="mt-4 mt-sm-5">
                  No tienes una cuenta?
                  <a href="#" @click.prevent="openSignupModal"
                    >Regístrate aquí</a
                  >
                </div>
              </div>
              <div class="col-md-6 px-4 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5">
                <!-- Social Buttons -->
                <div class="mx-5" v-if="false">
                  <SocialLogin />
                  <div
                    class="fb-login-button"
                    data-width=""
                    data-size="large"
                    data-button-type="continue_with"
                    data-layout="default"
                    data-auto-logout-link="true"
                    data-use-continue-as="false"
                  ></div>
                  <div v-if="false">
                    <a class="btn btn-outline-info w-100 mb-3"
                      ><i class="fi-google fs-lg me-1"></i>Continuar con
                      Google</a
                    ><a class="btn btn-outline-info w-100 mb-3" href="#"
                      ><i class="fi-facebook fs-lg me-1"></i>Continuar con
                      Facebook</a
                    >
                  </div>
                  <div class="d-flex align-items-center py-3 mb-3">
                    <hr class="w-100" />
                    <div class="px-3">O</div>
                    <hr class="w-100" />
                  </div>
                </div>

                <form class="needs-validation" @submit.prevent="submitForm">
                  <div class="mb-4">
                    <label class="form-label mb-2" for="signin-email"
                      >Correo</label
                    >
                    <input
                      class="form-control"
                      type="email"
                      id="signin-email"
                      placeholder="Entra tu correo"
                      required
                      v-model.trim="email"
                    />
                  </div>
                  <div class="mb-4">
                    <div
                      class="d-flex align-items-center justify-content-between mb-2"
                    >
                      <label class="form-label mb-0" for="signin-password"
                        >Contraseña</label
                      >
                      <router-link
                        class="fs-sm"
                        to="/olvide"
                        @click="dismissModal('#signin-modal')"
                      >
                        Olvidé la contraseña
                      </router-link>
                    </div>
                    <div class="password-toggle">
                      <input
                        class="form-control"
                        type="password"
                        id="signin-password"
                        placeholder="Entra tu contraseña"
                        required
                        v-model.trim="password"
                      />
                      <label
                        class="password-toggle-btn"
                        aria-label="Show/hide password"
                      >
                        <input
                          class="password-toggle-check"
                          type="checkbox"
                          @change="SetPwdVisibility('signin-password')"
                        /><span class="password-toggle-indicator"></span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <button class="btn btn-primary btn-lg w-100" type="submit">
                      <span v-if="!isLoading">Ingresar</span>
                      <span v-if="isLoading" class="px-2">Ingresando...</span>
                      <div
                        v-if="isLoading"
                        class="spinner-border spinner-border-sm"
                      ></div>
                    </button>
                    <br />
                    <br />
                    <p
                      class="input-errors blink"
                      style="color: red; text-decoration: blink"
                      v-if="!formIsValid"
                    >
                      Por favor, entra un correo y contraseña válida.<br />
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Signup from "./signup.vue";
import PwdVisibility from "../../../mixins/passwordVisibility.js";
import SocialLogin from "./SocialLogin.vue";
import { showdModal } from "../../../mixins/showModal";

export default {
  name: "Login",
  mixins: [PwdVisibility],
  components: {
    Signup,
    SocialLogin,
  },
  data() {
    return {
      email: "",
      password: "",
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters(["loggedUser", "user"]),
  },
  methods: {
    cleanupModalState() {
      document
        .querySelectorAll(".modal-backdrop")
        .forEach((backdrop) => backdrop.remove());
      document.body.classList.remove("modal-open");
      document.body.style.removeProperty("padding-right");
    },
    async closeSigninModal() {
      await this.dismissModal("#signin-modal");
    },
    async openSignupModal() {
      await this.dismissModal("#signin-modal");
      showdModal("#signup-modal");
    },
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;

      const credentials = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.$store.dispatch("login", credentials);
        await this.dismissModal("#signin-modal");
        this.logIt(
          this?.loggedUser?.id,
          "login for: " + this?.user?.attributes?.email,
          this.$options.name,
          this.user?.signInUserSession?.idToken?.jwtToken,
          true
        );
        const redirectUrl = this.$route.query.redirect
          ? `/${this.$route.query.redirect}`
          : this.$store.getters.loggedUser.userType === "client"
            ? "/perfil/info"
            : "/profile/info";
        this.$router.replace(redirectUrl);
        this.isLoading = false;
      } catch (error) {
        this.formIsValid = false;
        this.isLoading = false;
      }
    },
  },
  mounted() {
    const modal = document.querySelector("#signin-modal");
    modal?.addEventListener("hidden.bs.modal", this.cleanupModalState);
  },
  beforeUnmount() {
    const modal = document.querySelector("#signin-modal");
    modal?.removeEventListener("hidden.bs.modal", this.cleanupModalState);
  },
};
</script>
<style scoped></style>
