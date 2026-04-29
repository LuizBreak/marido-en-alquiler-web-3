<template>
  <main class="page-wrapper">
    <!-- Page container-->
    <div class="container mt-1 mb-md-4">
      <div class="row">
        <!-- Page content-->
        <div class="col-lg-8">
          <div class="mb-4">
            <h1 class="h2 mb-0">Registrar Proyecto</h1>
          </div>

          <!-- Services Required -->
          <section
            class="card card-body border-0 shadow-sm p-4 mb-4"
            id="details"
          >
            <h2 class="h4 mb-4">
              <i class="fi-edit text-primary fs-5 mt-n1 me-2"></i>Servicios
              Requeridos
            </h2>
            <!-- class="form-control form-label d-block fw-bold mb-2 pb-1" -->

            <div class="mb-4">
              <label
                class="form-control pb-1"
                :class="v$.newProject.services.$error ? 'is-invalid' : ''"
              >
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="plomeria"
                        value="plomeria"
                        v-model="newProject.services"
                        checked
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
                        v-model="newProject.services"
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
                        v-model="newProject.services"
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
                        v-model="newProject.services"
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
                        id="herreira"
                        value="herreira"
                        v-model="newProject.services"
                      />
                      <label class="form-check-label" for="herreira"
                        >Herreria</label
                      >
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="pintura"
                        value="pintura"
                        v-model="newProject.services"
                      />
                      <label class="form-check-label" for="pintura"
                        >Pintura</label
                      >
                      <div
                        class="input-errors text-danger"
                        v-for="error of v$.newProject.services.$errors"
                        :key="error.$uid"
                      >
                        <div class="error-msg">{{ error.$message }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </section>

          <!--  Project Description -->
          <section
            class="card card-body border-0 shadow-sm p-4 mb-4"
            id="basic-info"
          >
            <h2 class="h4 mb-4">
              <i class="fi-info-circle text-primary fs-5 mt-n1 me-2"></i
              >Descripcion del Proyecto
            </h2>

            <form id="projectForm">
              <!-- Titulo del Proyecto-->
              <div class="mb-3">
                <label class="form-label" for="ap-title"
                  >Titulo para el Proyecto<span class="text-danger"
                    >*</span
                  ></label
                >
                <input
                  class="form-control form-quriar-control"
                  id="title"
                  type="text"
                  :class="v$.newProject.title.$error ? 'is-invalid' : ''"
                  placeholder="Titulo"
                  v-model="v$.newProject.title.$model"
                  maxlength="100"
                />
                <div
                  class="input-errors text-danger"
                  v-for="error of v$.newProject.title.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
                <span class="form-text">Quedan 100 caracteres</span>
              </div>

              <!-- Property Type -->
              <div class="mb-3">
                <label class="form-label" for="ap-type"
                  >Tipo de Propriedad<span class="text-danger">*</span></label
                >
                <select
                  class="form-control form-quriar-control"
                  name="propertyType"
                  id="propertyType"
                  :class="v$.newProject.propertyType.$error ? 'is-invalid' : ''"
                  v-model="v$.newProject.propertyType.$model"
                >
                  <option :value="null" disabled Selected>
                    -- Elegir Tipo de Propriedad --
                  </option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Casa">Casa</option>
                  <option value="Local Commercial">Local Commercial</option>
                  <option value="Otro">Otro</option>
                </select>
                <div
                  class="input-errors text-danger"
                  v-for="error of v$.newProject.propertyType.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>

              <!-- Project Description -->
              <div class="mb-3">
                <label class="form-label" for="ap-description"
                  >Detalles sobre el Proyecto<span class="text-danger">*</span>
                </label>
                <textarea
                  class="form-control"
                  id="description"
                  :class="v$.newProject.description.$error ? 'is-invalid' : ''"
                  v-model="v$.newProject.description.$model"
                  rows="5"
                  placeholder="Describir los detalles sobre el proyecto"
                  maxlength="400"
                ></textarea
                ><span class="form-text">Quedan 500 caracteres</span>
                <div
                  class="input-errors text-danger"
                  v-for="error of v$.newProject.description.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>

              <!-- Ready to Start -->
              <div class="row">
                <div class="col-sm-6 mb-3">
                  <div class="form-label fw-bold pt-3 pb-2">
                    ¿Lista para comenzar o solo estás cotizando?
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      id="ready"
                      name="isReady"
                      value="ready"
                      v-model="newProject.intention"
                      checked
                    />
                    <label class="form-check-label" for="ap-company"
                      >Estoy listo para comenzar inmediatamente.</label
                    >
                  </div>
                  <div class="form-check mb-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      id="notReady"
                      name="isReady"
                      value="quoting"
                      v-model="newProject.intention"
                    />
                    <label class="form-check-label" for="ap-individual"
                      >Solo cotizando por ahora</label
                    >
                  </div>
                </div>
                <div class="col-sm-6 mb-3">
                  <!-- Date picker -->

                  <label class="form-label"
                    >Fecha de Inicio<span class="text-danger">*</span></label
                  >

                  <div class="input-group">
                    <Datepicker
                      class="form-control date-picker rounded pe-5"
                      v-model="newProject.startDate"
                      placeholder="Fecha de inicio deseable"
                      autoApply
                      :format="format"
                      :class="
                        v$.newProject.startDate.$error ? 'is-invalid' : ''
                      "
                    ></Datepicker>
                  </div>
                  <div
                    class="input-errors text-danger"
                    v-for="error of v$.newProject.startDate.$errors"
                    :key="error.$uid"
                  >
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </div>
              </div>

              <!-- Photos / video-->
              <div class="row">
                <div class="col-sm-12 mb-3">
                  <base-image-uploader-card
                    @pass-selected-files="onEmitFileSelected"
                  ></base-image-uploader-card>
                </div>
              </div>

              <!-- Action buttons -->
              <section class="d-sm-flex justify-content-between pt-2">
                <!-- <a
              v-show="false"
              class="btn btn-outline-primary btn-lg d-block ps-3 mb-3 mb-sm-2"
              href="#preview-modal"
              data-bs-toggle="modal"
              ><i class="fi-eye-on me-2"></i>Preview</a
            > -->
                <a
                  class="btn btn-primary btn-lg d-block mb-2"
                  @click.prevent="save"
                  href="#"
                  >Grabar</a
                >
              </section>
            </form>
          </section>
        </div>

        <!-- Progress of completion-->
        <aside
          class="col-lg-3 offset-lg-1 d-none d-lg-block quick-contact-form"
        >
          <div class="sticky-top pt-5">
            <h6 class="pt-5 mt-3 mb-2">
              Contenido {{ SetPercentageCompleted }}% completado
            </h6>
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
            <ul class="list-unstyled">
              <li class="d-flex align-items-center">
                <i
                  class="fi-check me-2"
                  :class="
                    !v$.newProject.services.$invalid
                      ? 'text-primary'
                      : 'text-muted'
                  "
                ></i
                ><a
                  class="nav-link fw-normal ps-1 p-0"
                  href="#servicios-requeridos"
                  data-scroll
                  data-scroll-offset="20"
                  >Servicios Requeridos
                </a>
              </li>
              <li class="d-flex align-items-center">
                <i
                  class="fi-check me-2"
                  :class="
                    !v$.newProject.title.$invalid
                      ? 'text-primary'
                      : 'text-muted'
                  "
                ></i
                ><a
                  class="nav-link fw-normal ps-1 p-0"
                  href="#title"
                  data-scroll
                  data-scroll-offset="20"
                  >Titulo del Proyecto</a
                >
              </li>
              <li class="d-flex align-items-center">
                <i
                  class="fi-check me-2"
                  :class="
                    !v$.newProject.propertyType.$invalid
                      ? 'text-primary'
                      : 'text-muted'
                  "
                ></i
                ><a
                  class="nav-link fw-normal ps-1 p-0"
                  href="#title"
                  data-scroll
                  data-scroll-offset="20"
                  >Tipo de Propriedad</a
                >
              </li>
              <li class="d-flex align-items-center">
                <i
                  class="fi-check me-2"
                  :class="
                    !v$.newProject.description.$invalid
                      ? 'text-primary'
                      : 'text-muted'
                  "
                ></i
                ><a
                  class="nav-link fw-normal ps-1 p-0"
                  href="#description"
                  data-scroll
                  data-scroll-offset="20"
                  >Description del Proyecto</a
                >
              </li>

              <li class="d-flex align-items-center">
                <i
                  class="fi-check me-2"
                  :class="
                    !v$.newProject.startDate.$invalid
                      ? 'text-primary'
                      : 'text-muted'
                  "
                ></i
                ><a
                  class="nav-link fw-normal ps-1 p-0"
                  href="#price"
                  data-scroll
                  data-scroll-offset="20"
                  >Fecha de Inicio</a
                >
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>

<script>
import * as types from "../../utils/types.js";
import { mapGetters } from "vuex";

import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import DateFormatter from "../../mixins/dateFormatter.js";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
import { s3Svc } from "../../services/s3.services.js";
import BaseImageUploaderCard from "../../components/ui/BaseImageUploaderCard.vue";

const selectionRequired = (value) => value; // if no selected value will be null therefore true

export default {
  setup() {
    const dt = ref(new Date());
    // In case of a range picker, you'll receive [Date, Date]
    const format = (dt) => {
      const day = dt.getDate();
      const month = dt.getMonth() + 1;
      const year = dt.getFullYear();
      return `${day}/${month}/${year}`;
    };
    return { v$: useVuelidate(), dt, format };
  },
  emits: ["child-breadcrumbs-urls"],
  mixins: [DateFormatter],
  components: {
    Datepicker,
    BaseImageUploaderCard,
  },
  data() {
    return {
      percentCompleted: 0,
      newProject: {
        services: [],
      },
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
          url: "/profile/nuevoproyecto",
          caption: "Nuevo Proyecto",
          isActive: true,
          aria: "page",
        },
      ],
    };
  },
  validations() {
    const requiedMsg = "Campo obligatorio.";
    const selectionRequiredMsg = "Seleccione una opcion valida.";

    return {
      newProject: {
        title: { required: helpers.withMessage(requiedMsg, required) },
        services: { required: helpers.withMessage(requiedMsg, required) },
        propertyType: {
          selectionRequired: helpers.withMessage(
            selectionRequiredMsg,
            selectionRequired
          ),
        },
        description: { required: helpers.withMessage(requiedMsg, required) },
        startDate: {
          required: helpers.withMessage(requiedMsg, required),
          minValue: function (value) {
            const today = Date.now();
            return value >= today;
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters([
      types.LOGGED_USER,
      types.IS_LOGGED_IN,
      "IsClient",
      "isDevelopmentEnvir",
    ]),
    SetPercentageCompleted() {
      const percentage =
        ((!this.v$.newProject.services.$invalid +
          !this.v$.newProject.title.$invalid +
          !this.v$.newProject.propertyType.$invalid +
          !this.v$.newProject.startDate.$invalid +
          !this.v$.newProject.description.$invalid) /
          5) *
        100;
      return percentage;
    },
  },
  methods: {
    async save() {
      const result = await this.v$.$validate();
      if (!result) {
        return;
      }
      if (this.selectedFile) this.onUploadImage();
      // const today = Date.now();
      this.formData = {
        clientId: this.loggedUser.id,
        title: this.newProject.title,
        propertyType: this.newProject.propertyType,
        description: this.newProject.description,
        services: this.setServiceList(this.newProject.services),
        status: "created",
        avatar: this.newProject.avatar,
        intention: this.newProject.intention || "ready",
        updatedAt: this.date(Date.now(), "YYYY-MM-DD hh:mm:ss a"),
        startDate: this.date(this.newProject.startDate, "YYYY-MM-DD"),
        contractorId: 0,
      };
      // console.log("formData", this.formData);

      this.$store
        .dispatch("projects/save", JSON.stringify(this.formData))
        .then(() => {
          this.triggerMsgBox(
            true,
            this.newProject.id
              ? "Proyecto actualizado con éxito."
              : "Proyecto creado con éxito."
          );
        })
        .catch(() => {
          this.$triggerMsgBox(true, "Error adding project");
        });
    },
    triggerMsgBox: function (showIt, message) {
      this.$store.dispatch("triggerMsgBox", {
        showIt,
        message,
      });
    },
    setServiceList(services) {
      /*
       * Function to ensure problem quotation for a array-like string
       * for future use with JSON.parse() in other pages
       */
      // console.log("newProject", services);
      const serviceList = services.map((item) => `'${item}'`).join(",");
      // console.log("Transformed serviceList", serviceList);
      return "[" + serviceList + "]";
      // services: "[" + this.newProject.services.join() + "]", // this approach had a bug since it would now put single quotes around it
    },
    onEmitFileSelected(file) {
      this.selectedFile = file;
      this.newProject.avatar = this.selectedFile.name || "";
    },

    // When using <input> trigger it by onChnage (event)
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.newProject.avatar = this.selectedFile.name || "";
    },
    onUploadImage() {
      s3Svc.uploadFile(this.selectedFile);
    },
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  mounted() {
    this.$emit("child-breadcrumbs-urls", this.urls);
    // const today = Date.now();
    // this.date(today, "YYYY-MM-DD hh:mm:ss a");
    this.newProject.intention = "ready";
  },
};
</script>
<style scoped></style>
