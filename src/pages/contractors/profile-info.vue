<template>
  <div class="col-lg-8 col-md-7 mb-1">
    <h1 class="h2">Registro del Contratista</h1>
    <div class="mb-2 pt-1">
      Su información está completa en un
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
          <!-- Page content-->
          <div>
            <!-- Contacts-->
            <section
              class="card card-body border-0 shadow-sm p-4 mb-4"
              id="contacts"
            >
              <h2 class="h4 mb-4">
                <i class="fi-phone text-primary fs-5 mt-n1 me-2"></i>Información
                de Contacto
              </h2>
              <div class="row">
                <!-- Nombre -->
                <div class="col-sm-6 mb-3">
                  <label class="form-label"
                    >Nombre
                    <span class="text-danger">*</span>
                    <input
                      class="form-control form-quriar-control"
                      id="firstName"
                      type="text"
                      :class="v$.user.firstName.$error ? 'is-invalid' : ''"
                      v-model="v$.user.firstName.$model"
                    />
                  </label>
                  <div
                    class="input-errors text-danger"
                    v-for="error of v$.user.firstName.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </div>

                <!-- Apellido -->
                <div class="col-sm-6 mb-3">
                  <label class="form-label">Apellido</label>
                  <span class="text-danger">*</span>
                  <input
                    class="form-control form-quriar-control"
                    id="lastName"
                    type="text"
                    :class="v$.user.lastName.$error ? 'is-invalid' : ''"
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
              </div>

              <div class="row">
                <!-- Email -->
                <div class="col-sm-6 mb-3">
                  <label class="form-label">Correo</label>
                  <span class="text-danger">*</span>
                  <input
                    class="form-control form-quriar-control"
                    id="email"
                    type="text"
                    :class="v$.user.email.$error ? 'is-invalid' : ''"
                    v-model="v$.user.email.$model"
                  />
                  <div
                    class="input-errors text-danger"
                    v-for="error of v$.user.email.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </div>

                <!-- Phone -->
                <div class="col-sm-6 mb-3">
                  <label class="form-label">Teléfono</label>
                  <span class="text-danger">*</span>
                  <input
                    class="form-control form-quriar-control"
                    id="telefono"
                    type="text"
                    :class="v$.user.phone.$error ? 'is-invalid' : ''"
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
              </div>

              <div class="row">
                <!-- Company Name -->
                <div class="col-sm-6 mb-3">
                  <label class="form-label">Nombre de La Empresa</label>
                  <input
                    class="form-control"
                    type="text"
                    id="CompanyName"
                    :class="v$.user.companyName.$error ? 'is-invalid' : ''"
                    v-model="v$.user.companyName.$model"
                  />
                  <div
                    class="input-errors text-danger"
                    v-for="error of v$.user.companyName.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </div>
                <!-- Cedula -->
                <div class="col-sm-6 mb-3">
                  <label class="form-label" for="company-name">Cédula</label>
                  <input
                    class="form-control"
                    type="text"
                    id="driversLicense"
                    :class="v$.user.driversLicense.$error ? 'is-invalid' : ''"
                    v-model="v$.user.driversLicense.$model"
                  />
                  <div
                    class="input-errors text-danger"
                    v-for="error of v$.user.driversLicense.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </div>
              </div>

              <div class="row" v-if="this.isDevelopmentEnvir">
                <!-- Contractor id-->
                <div class="col-sm-6 mb-3">
                  <label class="form-label fw-bold">User ID</label>
                  <input
                    class="form-control form-quriar-control"
                    id="id"
                    type="text"
                    placeholder="Contractor id"
                    :value="user.id"
                    disabled
                  />
                </div>
                <!-- Client Type-->
                <div class="col-sm-6 mb-3">
                  <label class="form-label fw-bold">Tipo de Usuario </label>
                  <input
                    class="form-control form-quriar-control"
                    id="contactType"
                    type="text"
                    v-model="user.userType"
                    disabled
                  />
                </div>
              </div>
            </section>

            <!-- Services Required -->
            <section
              class="card card-body border-0 shadow-sm p-4 mb-4"
              id="details"
            >
              <h2 class="h4 mb-4">
                <i class="fi-edit text-primary fs-5 mt-n1 me-2"></i>Servicios
                Prestados
              </h2>

              <div class="">
                <label class="form-label d-block fw-bold mb-2 pb-1"></label>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="plomeria"
                        value="plomeria"
                        v-model="user.serviceTypes"
                      />
                      <label class="form-check-label" for="plomeria"
                        >Plomeria</label
                      >
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="aire"
                        value="aire"
                        v-model="user.serviceTypes"
                      />
                      <label class="form-check-label" for="aire"
                        >Aire acondicionado</label
                      >
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="remodelacion"
                        value="remodelacion"
                        v-model="user.serviceTypes"
                      />
                      <label class="form-check-label" for="remodelacion"
                        >Remodelación</label
                      >
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="eletricidad"
                        value="eletricidad"
                        v-model="user.serviceTypes"
                      />
                      <label class="form-check-label" for="eletricidad"
                        >Electricidad</label
                      >
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="herreria"
                        value="herreria"
                        v-model="user.serviceTypes"
                      />
                      <label class="form-check-label" for="herreria"
                        >Herreria</label
                      >
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="pintura"
                        value="pintura"
                        v-model="user.serviceTypes"
                      />
                      <label class="form-check-label" for="pintura"
                        >Pintura</label
                      >
                    </div>
                    <div
                      class="input-errors text-danger"
                      v-for="error of v$.user.serviceTypes.$errors"
                      :key="error.$uid"
                    >
                      <div class="error-msg">{{ error.$message }}</div>
                    </div>
                  </div>
                </div>
                <!-- Company Description -->
                <div class="row mt-4">
                  <label class="form-label" for="description"
                    >Descripción de los Servicios Ofrecidos
                  </label>
                  <textarea
                    class="form-control"
                    id="description"
                    :class="v$.user.description.$error ? 'is-invalid' : ''"
                    v-model="v$.user.description.$model"
                    rows="5"
                    placeholder="Describir los detalles tu negocio y servicos que prestas"
                  ></textarea
                  ><span class="form-text">1500 characters left</span>
                  <div
                    class="input-errors text-danger"
                    v-for="error of v$.user.description.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </div>
              </div>
            </section>

            <!-- Location-->
            <section
              class="card card-body border-0 shadow-sm p-4 mb-4"
              id="location"
            >
              <h2 class="h4 mb-4">
                <i class="fi-map-pin text-primary fs-5 mt-n1 me-2"></i>Ubicación
              </h2>
              <div class="row">
                <!-- Called -->
                <div class="col-sm-8 mb-3">
                  <label class="form-label" for="address"
                    >Calle <span class="text-danger">*</span></label
                  >
                  <input
                    class="form-control"
                    type="text"
                    id="address"
                    :class="v$.user.address.$error ? 'is-invalid' : ''"
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
                <!-- Postal Code -->
                <div class="col-sm-4 mb-3">
                  <label class="form-label" for="postal-code"
                    >Codigo Postal <span class="text-danger">*</span></label
                  >
                  <input
                    class="form-control"
                    type="text"
                    id="postal-code"
                    placeholder=""
                    v-model="user.postalCode"
                    required
                  />
                </div>
              </div>

              <div class="row">
                <!-- Country -->
                <div class="col-sm-6 mb-3">
                  <label class="form-label" for="country"
                    >Pais <span class="text-danger">*</span></label
                  >
                  <select
                    class="form-select"
                    id="country"
                    required
                    v-model="user.country"
                  >
                    <option :value="null" disabled>--- Eligir Pais ---</option>
                    <option value="Republic Dominicana">
                      Republic Dominicana
                    </option>
                    <option value="Haiti">Haiti</option>
                    <option value="Canada">Canada</option>
                    <option value="Estado Unidos" selected>
                      Estado Unidos
                    </option>
                  </select>
                </div>
                <!-- Ciudad -->
                <div class="col-sm-6 mb-3">
                  <label class="form-label" for="city"
                    >Ciudad <span class="text-danger">*</span></label
                  >
                  <select class="form-select" id="city" v-model="user.city">
                    <option :value="null" disabled>
                      --- Eligir Ciudad ---
                    </option>
                    <option value="Santo Domingo">Santo Domingo</option>
                    <option value="Santiago">Santiago</option>
                    <option value="Puerto Plata">Puerto Plata</option>
                    <option value="Punta Cana" selected>Punta Cana</option>
                    <option value="Otro" selected>Otro</option>
                  </select>
                </div>
              </div>
            </section>

            <section>
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
            </section>
            <!-- Photos / video-->
            <base-image-uploader-card
              @pass-selected-files="onEmitFileSelected"
            ></base-image-uploader-card>

            <!-- Action buttons -->
            <section class="d-sm-flex justify-content-between pt-2">
              <button
                class="btn btn-primary btn-lg d-block mb-2"
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
            </section>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import * as types from "../../utils/types.js";
import { mapGetters } from "vuex";

import BaseImageUploaderCard from "../../components/ui/BaseImageUploaderCard.vue";
import { s3Svc } from "../../services/s3.services.js";
import getUserAvatar from "../../mixins/getUserAvatar";

const selectionRequired = (value) => value; // if no selected value will be null therefore true

export default {
  emits: ["child-breadcrumbs-urls"],
  setup() {
    return { v$: useVuelidate() };
  },
  name: "Contractor-Profile",
  mixins: [getUserAvatar],
  components: { BaseImageUploaderCard },
  data() {
    return {
      percentCompleted: 0,
      user: this.getUserCopy(),
      selectedFile: null,
      urls: [
        { url: "/", caption: "Inicio", isActive: false, aria: "" },
        {
          url: this.isClient ? "/perfil" : "/profile",
          caption: "Cuenta",
          isActive: false,
          aria: "",
        },
        {
          url: "/contractor/profile",
          caption: "Perfil",
          isActive: true,
          aria: "page",
        },
      ],
    };
  },
  validations() {
    const requiedMsg = "Campo obligatorio.";
    const selectionRequiredMsg = "Seleccione una opcion valida.";
    const invalidEmailMsg = "Correo invalido";

    return {
      user: {
        firstName: { required: helpers.withMessage(requiedMsg, required) },
        lastName: { required: helpers.withMessage(requiedMsg, required) },
        phone: { required: helpers.withMessage(requiedMsg, required) },
        address: { required: helpers.withMessage(requiedMsg, required) },
        driversLicense: { required: helpers.withMessage(requiedMsg, required) },
        companyName: { required: helpers.withMessage(requiedMsg, required) },
        email: {
          required: helpers.withMessage(requiedMsg, required),
          email: helpers.withMessage(invalidEmailMsg, email),
        },
        city: {
          selectionRequired: helpers.withMessage(
            selectionRequiredMsg,
            selectionRequired
          ),
        },
        description: { required: helpers.withMessage(requiedMsg, required) },
        serviceTypes: { required: helpers.withMessage(requiedMsg, required) },
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
        this.user.avatar = this.selectedFile.name;
        this.setUserAvatar(this.user.id, this.user.avatar);
      }

      // Previous approach
      // this.user.services = this.services;
      // console.log("user data", JSON.stringify(this.user));

      // TODO: Investigate if approach must be used here too like in addProjects
      // this.setServiceList(this.newProject.services),
      this.user.serviceTypes = this.setServiceList(this.user.serviceTypes);

      try {
        if (!this.user.id) {
          await this.$store.dispatch("contractors/createContractor", this.user);
          this.triggerMsgBox(true, "Registro realizado con éxito.");
        } else {
          console.log("onSubmit", this.user);
          await this.$store.dispatch("contractors/updateContractor", this.user);
          this.triggerMsgBox(true, "Registro actualizado con éxito.");
        }
      } catch (error) {
        this.triggerMsgBox(
          true,
          "No se pudo grabar el registro. Verifica la conexión e inténtalo de nuevo."
        );
      }
    },
    setServiceList(services) {
      /*
       * Function to ensure problem quotation for a array-like string
       * for future use with JSON.parse() in other pages
       */
      //console.log("newProject", services);
      const serviceList = services.map((item) => `'${item}'`).join(",");
      // console.log("Transformed serviceList", serviceList);
      return "[" + serviceList + "]";
      // services: "[" + this.newProject.serviceTypes.join() + "]", // this approach had a bug since it would now put single quotes around it
    },
    parseServiceTypes(services) {
      /*
       *   Explanation: We had to replace double quotes for single because in our database
       *                it is saved with single however, string.parse does not like and it
       *                fails to convert it to an array
       *
       *                Original string "['Pintura', 'Remodelacion']""
       *                Final arrray =  error
       *
       *                Original string '["Pintura", "Remodelacion"]'
       *                Final Array = [ "Pintura", "Remodelacion" ]
       */
      // console.log("List of Services from DB", this.services);
      var data = services;
      try {
        const replaced = data.replaceAll(`'`, `"`);
        // console.log("data", replaced);
        var arr = JSON.parse(replaced);
        return arr;
      } catch (error) {
        return data;
      }
    },
    async onDelete() {
      if (this.user.id) {
        if (confirm("Estas seguro que quieres eliminar este registro?")) {
          this.$store.dispatch("contractors/deleteContractor", this.user);
          this.resetFormData();
          this.$router.replace("/signout");
          document.body.scrollTop = document.documentElement.scrollTop = 0;
          this.triggerMsgBox(true, "Cuenta eliminada con éxito.");
        }
      }
    },
    resetFormData: function () {
      this.user = {};
    },
    getUserCopy() {
      const obj = Object.assign({}, this.contractor);
      return obj;
    },
    onEmitFileSelected(file) {
      console.log("onEmitFileSelected.selectedFile", file);
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
      "isContractor",
      "isDevelopmentEnvir",
    ]),
    contractor: {
      get() {
        return this.$store.getters["contractors/contractor"];
      },
      set() {},
    },
    SetPercentageCompleted() {
      const percentage =
        ((!this.v$.user.firstName.$invalid +
          !this.v$.user.lastName.$invalid +
          !this.v$.user.phone.$invalid +
          !this.v$.user.address.$invalid +
          !this.v$.user.email.$invalid +
          !this.v$.user.driversLicense.$invalid +
          !this.v$.user.companyName.$invalid +
          !this.v$.user.email.$invalid +
          !this.v$.user.city.$invalid +
          !this.v$.user.description.$invalid +
          !this.v$.user.serviceTypes.$invalid) /
          11) *
        100;
      return new Intl.NumberFormat().format(percentage);
    },
  },
  watch: {
    contractor: {
      immediate: false,
      deep: true,
      handler() {
        this.user = this.getUserCopy();
        this.user.serviceTypes = this.parseServiceTypes(this.user.serviceTypes);
      },
    },
  },
  created() {},
  mounted() {
    if (this.$store.getters.isClient) {
      this.$router.replace("/perfil/info");
      return;
    }

    this.$emit("child-breadcrumbs-urls", this.urls);

    this.user = this.getUserCopy();
    this.user.serviceTypes = this.parseServiceTypes(this.user.serviceTypes);

    // We have to convert a string-like array to real array
    // console.log(
    //   "2. Service Types",
    //   this.SetServiceTypes(this.user.serviceTypes)
    // );
  },
};
</script>

<style scoped></style>
