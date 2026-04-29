<template>
  <div>
    <h1 class="h2">Resetear Contraseña</h1>
    <p class="pt-1">
      Entra el código recibido por correo y elige una nueva contraseña
    </p>
    <!-- <h2 class="h5">Password</h2> -->
    <form class="needs-validation pb-4 quick-contact-form">
      <div class="row align-items-end mb-2">
        <div class="col-sm-6 mb-2">
          <label class="form-label" for="account-password">Código</label>
          <div class="password-toggle">
            <input
              class="form-control"
              type="password"
              id="code"
              v-model="code"
              required
              placeholder="Entrar el código recibido por correo"
            />
            <label class="password-toggle-btn" aria-label="Show/hide password">
              <input
                class="password-toggle-check"
                type="checkbox"
                @change="SetPwdVisibility('code')"
              /><span class="password-toggle-indicator"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-sm-6 mb-3">
          <label class="form-label" for="account-password-new"
            >Nueva contraseña</label
          >
          <div class="password-toggle">
            <input
              class="form-control"
              type="password"
              id="account-password-new"
              v-model="newPassword"
              required
            />
            <label class="password-toggle-btn" aria-label="Show/hide password">
              <input
                class="password-toggle-check"
                type="checkbox"
                @change="SetPwdVisibility('account-password-new')"
              /><span class="password-toggle-indicator"></span>
            </label>
          </div>
        </div>
        <div class="col-sm-6 mb-3">
          <label class="form-label" for="account-password-confirm"
            >Confirmar contraseña</label
          >
          <div class="password-toggle">
            <input
              class="form-control"
              type="password"
              id="account-password-confirm"
              v-model="confirmPassword"
              required
            />
            <label class="password-toggle-btn" aria-label="Show/hide password">
              <input
                class="password-toggle-check"
                type="checkbox"
                @change="SetPwdVisibility('account-password-confirm')"
              /><span class="password-toggle-indicator"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-sm-6 mb-3">
          <button
            class="btn btn-outline-primary"
            type="submit"
            @click.prevent="confirmNewPassword"
          >
            Actualizar contraseña
          </button>
        </div>
        <div class="col-sm-6 mb-3">
          <p
            class="input-errors blink"
            style="color: red; text-decoration: blink"
            v-if="!formIsValid"
          >
            {{ this.errorMessage }}<br />
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import * as types from "../../../utils/types.js";
import { mapGetters } from "vuex";

import PwdVisibility from "../../../mixins/passwordVisibility.js";

export default {
  name: "Password-reset-with-code",
  props: ["email"],
  mixins: [PwdVisibility],
  components: {},
  data() {
    return {
      code: "",
      newPassword: "",
      confirmPassword: "",
      formIsValid: true,
      errorMessage: "",
      urls: [
        { url: "/", caption: "Inicio", isActive: false, aria: "" },
        {
          url: this.isClient ? "/perfil" : "/profile",
          caption: "Cuenta",
          isActive: false,
          aria: "",
        },
        { url: "/security", caption: "Security", isActive: true, aria: "page" },
      ],
    };
  },
  methods: {
    async confirmNewPassword() {
      if (this.code === "") {
        this.errorMessage = "Código es un campo obligatorio.";
        this.formIsValid = false;
        return;
      }
      if (this.newPassword.length < 6) {
        this.formIsValid = false;
        this.errorMessage =
          "La contraseña nueva debe tener al menos 6 caracteres.";
        return;
      }
      if (this.newPassword != this.confirmPassword) {
        this.errorMessage =
          "Contraseña nueva y confirmar contraseña no coinciden.";
        this.formIsValid = false;
        return;
      }
      const actionPayload = {
        username: this.email,
        code: this.code,
        newPassword: this.newPassword,
      };
      try {
        await this.$store.dispatch("resetPasswordWithCode", actionPayload);
        this.triggerMsgBox(true, "Contraseña actualizada con éxito.");
        this.isLoading = true;
        this.resetForm();
        const redirectUrl = "/" + (this.$route.query.redirect || "/");
        this.$router.replace(redirectUrl);
      } catch (error) {
        this.formIsValid = false;
        this.isLoading = false;
        this.errorMessage = error.message + "email: " + this.email;
      }
    },
    resetForm() {
      this.code = "";
      this.newPassword = "";
      this.confirmPassword = "";
      this.formIsValid = true;
      this.errorMessage = "";
    },
  },
  computed: {
    ...mapGetters([types.LOGGED_USER, types.IS_LOGGED_IN, "IsClient", "user"]),
  },
  created() {},
  mounted() {
    this.$emit("child-breadcrumbs-urls", this.urls);
  },
};
</script>

<style scoped></style>
