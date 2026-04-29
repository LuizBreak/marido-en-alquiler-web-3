<template>
  <div class="col-lg-8 col-md-7 mb-5">
    <h2 class="h2 card-title">
      <i class="fi-lock expand text-primary" aria-hidden="true" />
      Contraseña y Seguridad
    </h2>
    <p class="pt-1">
      Administra la configuración de tu contraseña y asegura tu cuenta
    </p>
    <!-- <h2 class="h5">Password</h2> -->
    <form class="needs-validation pb-4 quick-contact-form" novalidate>
      <div class="row align-items-end mb-2">
        <div class="col-sm-6 mb-2">
          <label class="form-label" for="account-password"
            >Contraseña actual</label
          >
          <div class="password-toggle">
            <input
              class="form-control"
              type="password"
              id="account-password"
              v-model="oldPassword"
              required
            />
            <label class="password-toggle-btn" aria-label="Show/hide password">
              <input
                class="password-toggle-check"
                type="checkbox"
                @change="SetPwdVisibility('account-password')"
              /><span class="password-toggle-indicator"></span>
            </label>
          </div>
        </div>
        <div class="col-sm-6 mb-2">
          <router-link class="d-inline-block mb-2" to="/olvide">
            Olvidé la contraseña
          </router-link>
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
    <div class="border-top pt-4 mt-3 quick-contact-form" v-if="false">
      <h2 class="h5 pt-2 mb-4">Where you're signed in on</h2>
      <div class="d-flex border-bottom pb-3 mb-3">
        <i class="fi-device-desktop fs-5 text-muted me-1"></i>
        <div class="ps-2">
          <div class="fw-bold mb-1">Mac - New York, USA</div>
          <span class="d-inline-block fs-sm text-muted border-end pe-2 me-2"
            >Chrome</span
          ><span class="fs-sm fw-bold text-success">Active now</span>
        </div>
      </div>
      <div class="d-flex border-bottom pb-3 mb-3">
        <i class="fi-device-mobile fs-5 text-muted me-1"></i>
        <div class="ps-2">
          <div class="fw-bold mb-1">iPhone 12 - New York, USA</div>
          <span class="d-inline-block fs-sm text-muted border-end pe-2 me-2"
            >Finder App</span
          ><span class="fs-sm text-muted">20 hours ago</span>
        </div>
        <div class="align-self-center ms-auto">
          <div class="dropdown">
            <button
              class="btn btn-icon btn-light btn-xs rounded-circle shadow-sm"
              type="button"
              id="contextMenu1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fi-dots-vertical"></i>
            </button>
            <ul class="dropdown-menu pb-3 my-1" aria-labelledby="contextMenu1">
              <li><a class="dropdown-item text-body" href="#">Not you?</a></li>
              <li><a class="d-block px-3" href="#">Sign out</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="d-flex border-bottom pb-3 mb-3">
        <i class="fi-device-desktop fs-5 text-muted me-1"></i>
        <div class="ps-2">
          <div class="fw-bold mb-1">Windows 10.1 - New York, USA</div>
          <span class="d-inline-block fs-sm text-muted border-end pe-2 me-2"
            >Chrome</span
          ><span class="fs-sm text-muted">November 15 at 8:42 AM</span>
        </div>
        <div class="align-self-center ms-auto">
          <div class="dropdown">
            <button
              class="btn btn-icon btn-light btn-xs rounded-circle shadow-sm"
              type="button"
              id="contextMenu2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fi-dots-vertical"></i>
            </button>
            <ul class="dropdown-menu pb-3 my-1" aria-labelledby="contextMenu2">
              <li><a class="dropdown-item text-body" href="#">Not you?</a></li>
              <li><a class="d-block px-3" href="#">Sign out</a></li>
            </ul>
          </div>
        </div>
      </div>
      <a class="d-inline-block fw-bold text-decoration-none mt-3" href="#"
        >Sign out of all sessions
      </a>
    </div>
  </div>
</template>

<script>
import * as types from "../../utils/types.js";
import { mapGetters } from "vuex";
import PwdVisibility from "../../mixins/passwordVisibility.js";

export default {
  emits: ["child-breadcrumbs-urls"],
  name: "Password-Security",
  mixins: [PwdVisibility],
  components: {},
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      formIsValid: true,
      errorMessage: "",
      code: "",
      urls: [
        { url: "/", caption: "Inicio", isActive: false, aria: "" },
        {
          url: this.isClient ? "/perfil" : "/profile",
          caption: "Cuenta",
          isActive: false,
          aria: "",
        },
        {
          url: "/security",
          caption: "Contraseña & Seguridad",
          isActive: true,
          aria: "page",
        },
      ],
    };
  },
  methods: {
    async confirmNewPassword() {
      if (this.oldPassword === "") {
        this.errorMessage = "Contraseña actual es un campo obligatorio.";
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
        user: this.user,
        code: this.code,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      };
      try {
        if (this.code) {
          await this.$store.dispatch("resetPassword", actionPayload);
        } else {
          await this.$store.dispatch("changePassword", actionPayload);
        }
        this.triggerMsgBox(true, "Contraseña actualizada con éxito.");
        this.resetForm();
      } catch (error) {
        this.formIsValid = false;
        this.errorMessage = error.message;
      }
    },
    resetForm() {
      this.oldPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
      this.formIsValid = true;
      this.errorMessage = "";
      this.code = "";
    },
  },
  computed: {
    ...mapGetters([
      types.LOGGED_USER,
      types.IS_LOGGED_IN,
      "IsClient",
      "isContractor",
      "user",
    ]),
  },
  created() {},
  mounted() {
    this.$emit("child-breadcrumbs-urls", this.urls);
  },
};
</script>

<style scoped></style>
