<template>
  <div class="col-lg-8 col-md-7 mb-1" v-if="client">
    <h2 class="h2 mb-0">
      <i class="fi-user expand text-primary" aria-hidden="true" />
      Información del Contacto
    </h2>
    <h1 class="h2"></h1>
    <div class="mb-2 pt-1">
      Su información personal está completa en un
      {{ SetPercentageCompleted + "%" }}
    </div>
    <div class="progress mb-4" style="height: 0.25rem">
      <div
        class="progress-bar bg-warning"
        role="progressbar"
        :style="{ width: SetPercentageCompleted + '%' }"
        :aria-valuenow="percentCompleted"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    <form id="clientForm">
      <div class="card card-body border-0 shadow-sm p-4 mb-4">
        <div class="border rounded-3 p-3 mb-4" id="personal-info">
          <!-- First Name-->
          <div class="mb-3">
            <label class="form-label fw-bold">Nombre</label>
            <input
              class="form-control form-quriar-control"
              id="firstName"
              type="text"
              :class="v$.user.firstName.$error ? 'is-invalid' : ''"
              placeholder="Nombre"
              v-model="v$.user.firstName.$model"
              autofocus
            />
            <div
              class="input-errors text-danger"
              v-for="error of v$.user.firstName.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <!-- Last Name-->
          <div class="mb-3">
            <label class="form-label fw-bold">Apellido</label>
            <input
              class="form-control form-quriar-control"
              id="lastName"
              type="text"
              :class="v$.user.lastName.$error ? 'is-invalid' : ''"
              placeholder="Apellido"
              v-model="v$.user.lastName.$model"
            />
            <div
              class="input-errors text-danger"
              v-for="error of v$.user.lastName.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <!-- Email-->
          <div class="mb-3">
            <label class="form-label fw-bold">Correo</label>
            <input
              class="form-control form-quriar-control"
              id="email"
              type="text"
              :class="v$.user.email.$error ? 'is-invalid' : ''"
              placeholder="Correo"
              v-model="v$.user.email.$model"
              readonly
            />
            <div
              class="input-errors text-danger"
              v-for="error of v$.user.email.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <!-- Phone number-->
          <div class="mb-3">
            <label class="form-label fw-bold">Teléfono</label>
            <input
              class="form-control form-quriar-control"
              id="nombre"
              type="text"
              :class="v$.user.phone.$error ? 'is-invalid' : ''"
              placeholder="Telefono"
              v-model="v$.user.phone.$model"
            />
            <div
              class="input-errors text-danger"
              v-for="error of v$.user.phone.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>

          <!-- Address-->
          <div class="mb-3">
            <label class="form-label fw-bold">Ubicación </label>
            <input
              class="form-control form-quriar-control"
              id="address"
              type="text"
              :class="v$.user.address.$error ? 'is-invalid' : ''"
              placeholder="Ubicación"
              v-model="v$.user.address.$model"
            />
            <div
              class="input-errors text-danger"
              v-for="error of v$.user.address.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
          </div>
          <div class="row pb-2">
            <!-- Bio -->
            <!-- <label class="form-label pt-2" for="account-bio">Short bio</label>

            <div class="col-lg-7 col-sm-8 mb-4">
              <textarea
                class="form-control"
                id="bio"
                rows="6"
                placeholder="Write your bio here. It will be displayed on your public profile."
                v-model="v$.user.comments.$model"
              ></textarea>
            </div> -->
            <!-- <div class="col-lg-3 col-sm-4 mb-4">
                  <input class="file-uploader bg-secondary" type="file" accept="image/png, image/jpeg" data-label-idle="&lt;i class=&quot;d-inline-block fi-camera-plus fs-2 text-muted mb-2&quot;&gt;&lt;/i&gt;&lt;br&gt;&lt;span class=&quot;fw-bold&quot;&gt;Change picture&lt;/span&gt;" data-style-panel-layout="compact" data-image-preview-height="160" data-image-crop-aspect-ratio="1:1" data-image-resize-target-width="200" data-image-resize-target-height="200">
              </div> -->
            <!-- Photos / video-->
            <base-image-uploader-card
              @pass-selected-files="onEmitFileSelected"
            ></base-image-uploader-card>

            <!-- <div class="row">
              <div class="col-sm-12 mb-3">
                <section
                  class="card card-body border-0 shadow-sm p-4 mb-4"
                  id="photos"
                >
                  <h2 class="h4 mb-4">
                    <i class="fi-image text-primary fs-5 mt-n1 me-2"></i>Fotos
                  </h2>
                  <div class="alert alert-info mb-4" role="alert">
                    <div class="d-flex">
                      <i class="fi-alert-circle me-2 me-sm-3"></i>
                      <p class="fs-sm mb-1">
                        El tamaño máximo de la foto es de 8 MB. Formatos: jpeg,
                        jpg, png. Pon primero la imagen principal.<br />
                      </p>
                    </div>
                  </div>
                  <file-pond
                    class="file-uploader file-uploader-grid"
                    type="file"
                    id="file"
                    ref="file"
                    multiple
                    data-max-file-size="10MB"
                    accept="image/png, image/jpeg, video/mp4, video/mov"
                    @pass-selected-files="onEmitFileSelected"
                  />
                </section>
              </div>
            </div> -->
          </div>
          <!-- Client id-->
          <div class="mb-3" v-if="this.isDevelopmentEnvir">
            <label class="form-label fw-bold">Client Id </label>
            <input
              class="form-control form-quriar-control"
              id="id"
              type="text"
              placeholder="Client id"
              :value="user.id"
              disabled
            />
          </div>
        </div>

        <!-- Socials-->
        <div class="pt-2">
          <label class="form-label fw-bold mb-3">Redes Sociales</label>
        </div>
        <div class="d-flex align-items-center mb-3">
          <div
            class="btn btn-icon btn-light btn-xs shadow-sm rounded-circle pe-none flex-shrink-0 me-3"
          >
            <i class="fi-facebook text-body"></i>
          </div>
          <input
            class="form-control"
            type="text"
            placeholder="Su cuenta de Facebook"
            v-model="v$.user.facebook.$model"
          />
        </div>
        <div class="d-flex align-items-center mb-3">
          <div
            class="btn btn-icon btn-light btn-xs shadow-sm rounded-circle pe-none flex-shrink-0 me-3"
          >
            <i class="fi-instagram text-body"></i>
          </div>
          <input
            class="form-control"
            type="text"
            placeholder="Su cuenta de Instagram"
            v-model="v$.user.instagram.$model"
          />
        </div>
        <div class="d-flex align-items-center mb-3">
          <div
            class="btn btn-icon btn-light btn-xs shadow-sm rounded-circle pe-none flex-shrink-0 me-3"
          >
            <i class="fi-linkedin text-body"></i>
          </div>
          <input
            class="form-control"
            type="text"
            placeholder="Su cuenta de LinkedIn"
            v-model="v$.user.linkedin.$model"
          />
        </div>
        <!-- Socials Show More -->
        <!--
        <div class="collapse" id="showMoreSocials">
          <div class="d-flex align-items-center mb-3">
            <div
              class="btn btn-icon btn-light btn-xs shadow-sm rounded-circle pe-none flex-shrink-0 me-3"
            >
              <i class="fi-twitter text-body"></i>
            </div>
            <input
              class="form-control"
              type="text"
              placeholder="Your Twitter account"
            />
          </div>
          <div class="d-flex align-items-center mb-3">
            <div
              class="btn btn-icon btn-light btn-xs shadow-sm rounded-circle pe-none flex-shrink-0 me-3"
            >
              <i class="fi-pinterest text-body"></i>
            </div>
            <input
              class="form-control"
              type="text"
              placeholder="Your Pinterest account"
            />
          </div>
        </div>
        <a
          class="collapse-label collapsed d-inline-block fs-sm fw-bold text-decoration-none pt-2 pb-3"
          href="#showMoreSocials"
          data-bs-toggle="collapse"
          data-bs-label-collapsed="Show more"
          data-bs-label-expanded="Show less"
          role="button"
          aria-expanded="false"
          aria-controls="showMoreSocials"
          ><i class="fi-arrow-down me-2"></i
        ></a>
        -->

        <div
          class="d-flex align-items-center justify-content-between border-top mt-4 pt-4 pb-1"
        >
          <button
            class="btn btn-primary px-3 px-sm-4"
            @click.prevent="onSubmit"
            type="button"
          >
            Grabar
          </button>
          <button
            class="btn btn-link btn-sm px-0"
            @click.prevent="onDelete"
            type="button"
          >
            <i class="fi-trash me-2"></i>Borrar cuenta
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import BaseImageUploaderCard from "../../components/ui/BaseImageUploaderCard.vue";

import * as types from "../../utils/types.js";
import { s3Svc } from "../../services/s3.services.js";
import getUserAvatar from "../../mixins/getUserAvatar";

// const selectionRequired = (value) => value; // if no selected value will be null therefore true

export default {
  emits: ["child-breadcrumbs-urls"],
  setup() {
    return { v$: useVuelidate() };
  },
  name: "Profile-Info",
  components: { BaseImageUploaderCard },
  mixins: [getUserAvatar],
  data() {
    return {
      user: this.getUserCopy(),
      percentCompleted: 0,
      selectedFile: null,
      urls: [
        {
          url: "/",
          caption: "Inicio",
          isActive: false,
          aria: "",
        },
        {
          url: this.isClient ? "/perfil" : "/profile",
          caption: "Cuenta",
          isActive: false,
          aria: "",
        },
        {
          url: "/personalinfo",
          caption: "Info Personal",
          isActive: true,
          aria: "page",
        },
      ],
    };
  },
  validations() {
    const requiedMsg = "Campo obligatorio.";
    // const selectionRequiredMsg = "Seleccione una opcion valida.";
    const invalidEmailMsg = "Correo invalido";

    return {
      user: {
        firstName: { required: helpers.withMessage(requiedMsg, required) },
        lastName: { required: helpers.withMessage(requiedMsg, required) },
        phone: { required: helpers.withMessage(requiedMsg, required) },
        address: { required: helpers.withMessage(requiedMsg, required) },
        email: {
          required: helpers.withMessage(requiedMsg, required),
          email: helpers.withMessage(invalidEmailMsg, email),
        },
        facebook: {},
        instagram: {},
        linkedin: {},
      },
    };
  },
  methods: {
    async onSubmit() {
      const result = await this.v$.$validate();

      if (!result) {
        return;
      }
      if (this.selectedFile) {
        this.onUploadImage();
        // this.user.avatar= this.selectedFile.name;
        this.setUserAvatar(this.user.id, this.selectedFile.name);
      }

      try {
        if (!this.user.id) {
          await this.$store.dispatch("clients/createClient", this.user);
          this.user = this.getUserCopy();
          console.log("prof-info.msgbox issued");
          this.triggerMsgBox(true, "Registro realizado con éxito.");
        } else {
          await this.$store.dispatch("clients/updateClient", this.user);
          this.triggerMsgBox(true, "Registro actualizado con éxito.");
        }
      } catch (error) {
        this.triggerMsgBox(
          true,
          "No se pudo grabar el registro. Verifica la conexión e inténtalo de nuevo."
        );
      }
    },
    async onDelete() {
      if (this.user.id) {
        if (confirm("Estas seguro que quieres eliminar este registro?")) {
          this.$store.dispatch("clients/deleteClient", this.user);
          this.resetFormData();
          this.$router.replace("/signout");
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          this.triggerMsgBox(true, "Cuenta eliminada con éxito.");
        }
      }
    },
    async getAll() {
      this.$store.dispatch("clients/fetchClients", {});
    },
    async getOne(id) {
      try {
        this.$store.dispatch("clients/fetchClient", { id: id });
      } catch (e) {
        console.error(e);
      }
    },
    resetFormData: function () {
      this.user = {};
    },
    async getUserCopy() {
      // opcion #1
      // return JSON.parse(JSON.stringify(this.client));

      // opcion #1
      // console.log("client #455", this.client);
      const obj = await Object.assign({}, this.client);

      // TODO: Investigate it
      // ATTENTION: if I remove this console.log, the obj does not
      //            get loaded
      // console.log("copy obj end");
      // console.log(obj);
      return obj;
    },
    onEmitFileSelected(file) {
      this.selectedFile = file;
      this.user.avatar = this.selectedFile.name || "";
    },
    onUploadImage() {
      s3Svc.uploadFile(this.selectedFile);
    },
  },
  computed: {
    ...mapGetters([
      types.LOGGED_USER,
      types.IS_LOGGED_IN,
      "IsClient",
      "userId",
      "isDevelopmentEnvir",
    ]),
    SetPercentageCompleted() {
      const percentage =
        ((!this.v$.user.firstName.$invalid +
          !this.v$.user.lastName.$invalid +
          !this.v$.user.email.$invalid +
          !this.v$.user.phone.$invalid +
          !this.v$.user.address.$invalid) /
          5) *
        100;
      return new Intl.NumberFormat().format(percentage);
    },
    clients() {
      return { ...this.$store.getters["clients/clients"] };
    },
    client: {
      get() {
        return { ...this.$store.getters["clients/client"] };
      },
      set() {},
    },
    userId() {
      return this.$store.getters["userId"];
    },
    loggeduser() {
      return this.$store.getters["loggedUser"];
    },
  },
  watch: {
    client: {
      immediate: false,
      deep: true,
      async handler() {
        this.user = await this.getUserCopy();
        this.user.email = this.loggedUser.email;
      },
    },
    loggedUser: {
      immediate: false,
      deep: true,
      async handler() {
        this.user = await this.getUserCopy();
        this.user.email = this.loggedUser.email;
      },
    },
  },
  async mounted() {
    if (this.$store.getters.isContractor) {
      this.$router.replace("/profile/info");
      return;
    }

    this.$emit("child-breadcrumbs-urls", this.urls);

    // Why Get Copy that internally uses Getters work?? :()
    this.user = await this.getUserCopy();
    this.user.email = this.loggedUser.email;
  },
};
</script>

<style scoped></style>
