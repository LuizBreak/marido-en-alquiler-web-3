<template>
  <!-- Sign Up Modal-->
  <div class="modal fade" id="signup-modal" tabindex="-1" aria-hidden="true">
    <div
      class="modal-dialog modal-lg modal-dialog-centered p-2 my-0 mx-auto"
      style="max-width: 950px"
    >
      <div class="modal-content">
        <div class="modal-body px-0 py-2 py-sm-0">
          <button
            class="btn-close position-absolute top-0 end-0 mt-3 me-3"
            type="button"
            data-bs-dismiss="modal"
          ></button>
          <div class="row mx-0 align-items-center">
            <!-- Welcome Side Bar -->

            <div class="col-md-6 border-end-md p-4 p-sm-5">
              <div id="benefitsForClients" v-show="forClient">
                <h2 class="h3 mb-4 mb-sm-5">
                  Únete a nosotros.<br />Te lo resolvemos todo.
                </h2>
                <ul class="list-unstyled mb-4 mb-sm-5">
                  <li class="d-flex mb-2">
                    <i class="fi-check-circle text-primary mt-1 me-2"></i
                    ><span>Registra tu proyecto</span>
                  </li>
                  <li class="d-flex mb-2">
                    <i class="fi-check-circle text-primary mt-1 me-2"></i
                    ><span>Reciba ofertas</span>
                  </li>
                  <li class="d-flex mb-0">
                    <i class="fi-check-circle text-primary mt-1 me-2"></i
                    ><span>Evalue los contratistas</span>
                  </li>
                  <li class="d-flex mb-0">
                    <i class="fi-check-circle text-primary mt-1 me-2"></i
                    ><span>Contrata el profesional más calificado</span>
                  </li>
                </ul>
              </div>
              <div id="benefitsForClients" v-show="!forClient">
                <h2 class="h3 mb-4 mb-sm-5">
                  Únete a nosotros.<br />Clientes buscando por tus servicios.
                </h2>
                <ul class="list-unstyled mb-4 mb-sm-5">
                  <li class="d-flex mb-2">
                    <i class="fi-check-circle text-primary mt-1 me-2"></i
                    ><span>Crea tu perfil</span>
                  </li>
                  <li class="d-flex mb-2">
                    <i class="fi-check-circle text-primary mt-1 me-2"></i
                    ><span>Reciba sugerencias de posibles clientes</span>
                  </li>
                  <li class="d-flex mb-2">
                    <i class="fi-check-circle text-primary mt-1 me-2"></i
                    ><span>Haga ofertas a proyectos existentes</span>
                  </li>
                  <li class="d-flex mb-2">
                    <i class="fi-check-circle text-primary mt-1 me-2"></i
                    ><span>Promove tu trabajo con fotos y videos</span>
                  </li>
                </ul>
              </div>
              <img
                class="d-block mx-auto"
                src="../../../img/signin-modal/signup.svg"
                width="344"
                alt="Illustartion"
              />
              <div class="mt-sm-4 pt-md-3">
                Ya tines un cuenta?
                <a
                  href="#signin-modal"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                  >Iniciar Sesión</a
                >
              </div>
            </div>

            <div class="col-md-6 px-4 pt-2 pb-4 px-sm-5 pb-sm-5 pt-md-5">
              <div v-if="!isSignedUp">
                <!-- Social Buttons -->
                <div v-if="false">
                  <a class="btn btn-outline-info w-100 mb-3" href="#"
                    ><i class="fi-google fs-lg me-1"></i>Continuar con Google</a
                  ><a class="btn btn-outline-info w-100 mb-3" href="#"
                    ><i class="fi-facebook fs-lg me-1"></i>Continuar con
                    Facebook</a
                  >
                  <div class="d-flex align-items-center py-3 mb-3">
                    <hr class="w-100" />
                    <div class="px-3">O</div>
                    <hr class="w-100" />
                  </div>
                </div>

                <!-- Signup Form-->
                <form @submit.prevent="submitForm" novalidate>
                  <h4 class="h4">Regístrate ahora como</h4>
                  <div class="mb-2 text-center">
                    <label
                      class="form-control pb-1"
                      :class="v$.user.userType.$error ? 'is-invalid' : ''"
                    >
                      <!-- Inline radios -->
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          id="client"
                          name="userType"
                          value="client"
                          v-model="user.userType"
                          :class="v$.user.userType.$error ? 'is-invalid' : ''"
                        />
                        <label class="form-label" for="form-radio-4"
                          >Cliente</label
                        >
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input"
                          type="radio"
                          id="contractor"
                          name="userType"
                          value="contractor"
                          v-model="user.userType"
                          :class="v$.user.userType.$error ? 'is-invalid' : ''"
                        />
                        <label class="form-label" for="form-radio-5"
                          >Contratista</label
                        >
                      </div>
                      <error-list
                        :errors="v$.user.userType.$errors"
                      ></error-list>
                    </label>
                  </div>

                  <div class="mb-4">
                    <label class="form-label" for="signup-name">Nombre</label>
                    <input
                      class="form-control"
                      type="text"
                      id="signup-firstName"
                      placeholder="Entra tu nombre"
                      required
                      v-model.trim="user.firstName"
                      :class="v$.user.firstName.$error ? 'is-invalid' : ''"
                    />
                    <error-list
                      :errors="v$.user.firstName.$errors"
                    ></error-list>
                  </div>
                  <div class="mb-4">
                    <label class="form-label" for="signup-name">Apellido</label>
                    <input
                      class="form-control"
                      type="text"
                      id="signup-lastName"
                      placeholder="Entra tu apellido"
                      required
                      v-model.trim="user.lastName"
                      :class="v$.user.lastName.$error ? 'is-invalid' : ''"
                    />
                    <error-list :errors="v$.user.lastName.$errors"></error-list>
                  </div>
                  <div class="mb-4">
                    <label class="form-label" for="signup-email">Correo</label>
                    <input
                      class="form-control"
                      type="email"
                      id="signup-email"
                      placeholder="Entra tu correo"
                      required
                      v-model.trim="user.email"
                      :class="v$.user.email.$error ? 'is-invalid' : ''"
                    />
                    <error-list :errors="v$.user.email.$errors"></error-list>
                  </div>
                  <div class="mb-4">
                    <label class="form-label" for="signup-password"
                      >Contraseña
                      <span class="fs-sm text-muted"
                        >min. 8 caracteres</span
                      ></label
                    >
                    <div class="password-toggle">
                      <input
                        class="form-control"
                        type="password"
                        id="signup-password"
                        placeholder="Entra tu Contraseña"
                        minlength="8"
                        required
                        v-model.trim="user.password"
                        :class="v$.user.password.$error ? 'is-invalid' : ''"
                      />
                      <label
                        class="password-toggle-btn"
                        aria-label="Show/hide password"
                      >
                        <input
                          class="password-toggle-check"
                          type="checkbox"
                          @change="SetPwdVisibility('signup-password')"
                        /><span class="password-toggle-indicator"></span>
                      </label>
                    </div>
                    <error-list :errors="v$.user.password.$errors"></error-list>
                  </div>
                  <div class="mb-4">
                    <label class="form-label" for="signup-password-confirm"
                      >Confirmar Contraseña</label
                    >
                    <div class="password-toggle">
                      <input
                        class="form-control"
                        type="password"
                        id="signup-password-confirm"
                        placeholder="Confirma tu Contraseña"
                        minlength="8"
                        required
                        v-model.trim="user.confirmPassword"
                        :class="
                          v$.user.confirmPassword.$error ? 'is-invalid' : ''
                        "
                      />
                      <label
                        class="password-toggle-btn"
                        aria-label="Show/hide password"
                      >
                        <input
                          class="password-toggle-check"
                          type="checkbox"
                          @change="SetPwdVisibility('signup-password-confirm')"
                        /><span class="password-toggle-indicator"></span>
                      </label>
                    </div>
                    <error-list
                      :errors="v$.user.confirmPassword.$errors"
                    ></error-list>
                  </div>
                  <div class="form-check mb-4">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="agree-to-terms"
                      value="yes"
                      required
                      :class="v$.user.acceptTerms.$error ? 'is-invalid' : ''"
                      v-model.trim="user.acceptTerms"
                    />
                    <label class="form-label" for="agree-to-terms">
                      Al continuar, acepta los
                      <router-link
                        to="/terminos"
                        @click="dismissModal('#signup-modal')"
                      >
                        Términos de Servicio
                      </router-link>
                      y de la
                      <router-link
                        to="/privacidad"
                        @click="dismissModal('#signup-modal')"
                      >
                        Política de Privacidad
                      </router-link>
                    </label>
                    <error-list
                      :errors="v$.user.acceptTerms.$errors"
                    ></error-list>
                  </div>
                  <p
                    class="input-errors blink"
                    style="color: red; text-decoration: blink"
                    v-if="!!errorMessage"
                  >
                    {{ errorMessage }} <br />
                  </p>
                  <br />
                  <button class="btn btn-primary btn-lg w-100" type="submit">
                    Regístrate</button
                  ><br />
                </form>
              </div>

              <!-- Signup Confirmation Code Form-->
              <div v-if="isSignedUp">
                <form
                  class="needs-validation"
                  @submit.prevent="confirmSignUpCode"
                >
                  <h2 class="h3 mb-4 mb-sm-5">Confirmar Registro</h2>
                  <div class="mb-4">
                    <label class="form-label" for="signup-email">Correo</label>
                    <input
                      class="form-control"
                      type="email"
                      id="signup-email"
                      placeholder="Entra tu correo"
                      required
                      v-model.trim="email"
                    />
                  </div>
                  <div class="mb-4">
                    <input
                      class="form-control"
                      v-model="code"
                      type="text"
                      placeholder="Entra el código"
                      required
                    /><br />
                    <p
                      class="input-errors blink"
                      style="color: red; text-decoration: blink"
                      v-if="!!confirmationErrorMessage"
                    >
                      {{ confirmationErrorMessage }} <br />
                    </p>
                    <button class="btn btn-primary btn-lg w-100">
                      Submeter
                    </button>
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
import PwdVisibility from "../../../mixins/passwordVisibility.js";
import ErrorList from "../../../components/ui/BaseValidationErrorList.vue";
import { showdModal } from "../../../mixins/showModal";

import useVuelidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";

const selectionRequired = (value) => value; // if no selected value will be null therefore true

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: "signup-confirmation",
  components: { ErrorList },
  mixins: [PwdVisibility],
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "",
        acceptTerms: false,
      },
      error: null,
      errorMessage: "",
      confirmationErrorMessage: "",
      email: "",
      code: "",
      isSignedUp: false,
      urls: [],
    };
  },
  validations() {
    const requiedMsg = "Campo obligatorio.";
    const selectionRequiredMsg = "Seleccione una opcion valida.";
    const invalidEmailMsg = "Correo invalido";
    const notAcceptedMsg = "Debes acceptar los terminos de uso.";
    const pwdsDontMatch = "Contraseña y confirmar contraseña no coinciden.";
    const minLengthMsg = "Contraseña debe tener al menos 6 caracteres.";

    return {
      user: {
        firstName: { required: helpers.withMessage(requiedMsg, required) },
        lastName: { required: helpers.withMessage(requiedMsg, required) },
        email: {
          required: helpers.withMessage(requiedMsg, required),
          email: helpers.withMessage(invalidEmailMsg, email),
        },
        userType: {
          selectionRequired: helpers.withMessage(
            selectionRequiredMsg,
            selectionRequired
          ),
        },
        password: {
          required: helpers.withMessage(requiedMsg, required),
          minLength: helpers.withMessage(minLengthMsg, minLength(6)),
        },
        confirmPassword: {
          required: helpers.withMessage(requiedMsg, required),
          matchPassword: helpers.withMessage(pwdsDontMatch, function (value) {
            return value === this.user.password;
          }),
        },
        acceptTerms: {
          required: helpers.withMessage(requiedMsg, required),
          checked: helpers.withMessage(
            notAcceptedMsg,
            (value) => value === true
          ),
        },
      },
    };
  },
  methods: {
    async submitForm() {
      this.errorMessage = "";
      const result = await this.v$.$validate();
      if (!result) {
        return;
      }

      const actionPayload = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: this.user.password,
        userType: this.user.userType,
      };
      // console.log("actionPayload", actionPayload);

      try {
        // console.log("about to signup");
        await this.$store.dispatch("signup", actionPayload);
        this.logIt(
          this?.loggedUser?.id || "",
          "signup for: " + this.actionPayload,
          this.$options.name,
          this.user.signInUserSession?.idToken?.jwtToken,
          true
        );
        this.isSignedUp = true;
        // const redirectUrl = "/" + (this.$route.query.redirect || "perfil/info");
        // this.$router.replace(redirectUrl);
      } catch (error) {
        this.isSignedUp = false;
        this.errorMessage = error.message;
      }
    },
    async confirmSignUpCode() {
      this.confirmationErrorMessage = "";
      const actionPayload = {
        username: this.email,
        code: this.code,
      };
      // console.log("confirmSignUpCode Payload", actionPayload);

      try {
        await this.$store.dispatch("confirmSignUp", actionPayload);
        await this.$store.dispatch("logout");

        this.dismissModal("#signup-modal");
        showdModal("#signin-modal");
      } catch (error) {
        this.isSignedUp = true;
        this.confirmationErrorMessage = error.message;
      }
    },
  },
  computed: {
    forClient() {
      return this.user.userType !== "contractor";
    },
  },
  mounted() {
    this.$emit("child-breadcrumbs-urls", this.urls);
  },
};
</script>
<style scoped></style>
