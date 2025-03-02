<template>
  <!-- Page content-->
  <div class="container-fluid mt-3 pt-0 p-0">
    <base-dialog :show="isLoading" title="Cargango..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <div class="row g-0 mt-n3 quick-contact-form">
      <!-- Filters sidebar (Offcanvas on mobile)-->
      <aside
        class="col-lg-4 col-xl-3 border-top-lg border-end-lg shadow-sm px-3 px-xl-4 px-xxl-5 pt-lg-2"
      >
        <div
          class="offcanvas offcanvas-start offcanvas-collapse"
          id="filters-sidebar"
        >
          <div class="offcanvas-header d-flex d-lg-none align-items-center">
            <h2 class="h5 mb-0">Filters</h2>
            <button
              class="btn-close"
              type="button"
              data-bs-dismiss="offcanvas"
            ></button>
          </div>
          <div class="offcanvas-body py-lg-4">
            <div class="pb-4 mb-2">
              <h3 class="h6">Ubicación</h3>
              <select
                class="form-select mb-2"
                v-model="filters.location"
                @change="setFilter"
              >
                <option value="ALL" selected>-- Todas las zonas --</option>
                <option value="SD">Santo Domingo</option>
                <option value="SDE">Santo Domingo Este</option>
                <option value="SDO">Santo Domingo Oeste</option>
                <option value="SDN">Santo Domingo Norte</option>
                <option value="DN" selected>Distrito Nacional</option>
              </select>
            </div>
            <!-- Service Types -->
            <div class="pb-4 mb-2">
              <h3 class="h6">Tipos de Servicio</h3>
              <div
                class="overflow-auto"
                data-simplebar
                data-simplebar-auto-hide="false"
                style="height: 11rem"
              >
                <div
                  class="form-check"
                  v-for="service in services"
                  :key="service"
                >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="service"
                    @change="setFilter"
                    v-model="filters[service]"
                  />
                  <label class="form-check-label fs-sm" :for="service">{{
                    capitalizeFirstLetter(service)
                  }}</label>
                </div>

                <!-- <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="plomeria"
                    @change="setFilter"
                    v-model="filters.plomeria"
                  />
                  <label class="form-check-label fs-sm" for="Plomeria"
                    >Plomeria</label
                  >
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="aire"
                    @change="setFilter"
                    v-model="filters.aire"
                  />
                  <label class="form-check-label fs-sm" for="Aire"
                    >Aire Acondicionado</label
                  >
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="remodelacion"
                    v-model="filters.remodelacion"
                    @change="setFilter"
                  />
                  <label class="form-check-label fs-sm" for="Remodelacion"
                    >Remodelación</label
                  >
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="eletricidad"
                    v-model="filters.eletricidad"
                    @change="setFilter"
                  />
                  <label class="form-check-label fs-sm" for="Eletricidad"
                    >Electricidad</label
                  >
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="herreria"
                    v-model="filters.herreria"
                    @change="setFilter"
                  />
                  <label class="form-check-label fs-sm" for="Herreria"
                    >Herreria</label
                  >
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="pintura"
                    v-model="filters.pintura"
                    @change="setFilter"
                  />
                  <label class="form-check-label fs-sm" for="pintura"
                    >Pintura</label
                  >
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="jardineria"
                    v-model="filters.jardineria"
                    @change="setFilter"
                  />
                  <label class="form-check-label fs-sm" for="Jardineria"
                    >Jardineria</label
                  >
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="limpieza"
                    v-model="filters.limpieza"
                    @change="setFilter"
                  />
                  <label class="form-check-label fs-sm" for="limpieza"
                    >Limpieza</label
                  >
                </div> -->
              </div>
            </div>

            <!-- with Reviews  -->
            <!-- <div class="d-flex justify-content-between mb-4">
              <div class="me-2">
                <h6 class="mb-1">Solo con Comentarios</h6>
              </div>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="withReviews"
                  v-model="filters.withReviews"
                  @change="setFilter"
                />
                <label class="form-check-label" for="new-rental"></label>
              </div>
            </div> -->

            <div class="pb-4 mb-2">
              <h3 class="h6">Opciones Adicionales</h3>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="ready"
                  @change="setFilter"
                  v-model="filters.ready"
                />
                <label class="form-check-label fs-sm" for="verified"
                  >Listo para empezar</label
                >
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="quoting"
                  @change="setFilter"
                  v-model="filters.quoting"
                />
                <label class="form-check-label fs-sm" for="featured"
                  >cotizando</label
                >
              </div>
            </div>
            <div class="border-top py-4">
              <button
                class="btn btn-outline-primary"
                type="button"
                @click="resetFilters"
              >
                <i class="fi-rotate-right me-2"></i>Limpiar filtros
              </button>
            </div>
          </div>
        </div>
      </aside>
      <!-- Page content-->
      <div
        class="col-lg-8 col-xl-9 position-relative overflow-hidden pb-5 pt-4 px-3 px-xl-4 px-xxl-5"
      >
        <!-- Title-->
        <div
          class="d-sm-flex align-items-center justify-content-between pb-3 pb-sm-4"
        >
          <h1 class="h2 mb-sm-0">Proyectos Disponibles</h1>
          <a
            class="d-inline-block fw-bold text-decoration-none"
            href="#"
            @click="resetFilters"
            ><i class="fi-x fs-xs mt-n1 me-2"></i>Limpiar filtros</a
          >
        </div>
        <!-- Debug only -->
        <!-- <p>{{ filters }}</p> -->

        <!-- Sorting-->
        <div
          class="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch my-2"
        >
          <div class="d-flex align-items-center flex-shrink-0">
            <label class="fs-sm me-2 pe-1 text-nowrap" for="sortby"
              ><i class="fi-arrows-sort text-muted mt-n1 me-2"></i>Ordenar por
              :</label
            >
            <select class="form-select form-select-sm" id="sortby">
              <option>Más Recientes</option>
              <option>Más Antiguos</option>
            </select>
          </div>
          <hr class="d-none d-sm-block w-100 mx-4" />
          <div
            class="d-none d-sm-flex align-items-center flex-shrink-0 text-muted"
          >
            <i class="fi-check-circle me-2"></i
            ><span class="fs-sm mt-n1">Resultado: ({{ recordsFound }})</span>
          </div>
        </div>

        <!-- Catalog grid-->
        <div class="row g-4 py-4">
          <div v-if="hasProjects">
            <!-- Item-->
            <ProjectTile
              v-for="project in FilteredProjects"
              :key="project.projectId"
              :id="project.projectId"
              :title="project.title"
              :description="project.description"
              :status="project.status"
              :tileImage="project.avatar"
              :startDate="project.startDate"
              :services="project.services"
              :ShowProvideReview="true"
            ></ProjectTile>
          </div>
          <h3 v-else>Todavia no hay proyectos registrados. {{ refreshKey }}</h3>
        </div>
        <!-- Pagination-->
        <nav class="border-top pb-md-4 pt-4 mt-2" aria-label="Pagination">
          <ul class="pagination mb-1">
            <li class="page-item d-sm-none">
              <span class="page-link page-link-static">1 / 5</span>
            </li>
            <li class="page-item active d-none d-sm-block" aria-current="page">
              <span class="page-link"
                >1<span class="visually-hidden">(current)</span></span
              >
            </li>
            <li class="page-item d-none d-sm-block">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item d-none d-sm-block">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item d-none d-sm-block">...</li>
            <li class="page-item d-none d-sm-block">
              <a class="page-link" href="#">8</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next"
                ><i class="fi-chevron-right"></i
              ></a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- Filters sidebar toggle button (mobile)-->
    <button
      class="btn btn-primary btn-sm w-100 rounded-0 fixed-bottom d-lg-none"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#filters-sidebar"
    >
      <i class="fi-filter me-2"></i>Filters
    </button>
  </div>
</template>

<script>
import ProjectTile from "../../components/ui/BaseProjectTile.vue";
import * as types from "../../utils/types.js";

export default {
  name: "project-search",
  components: { ProjectTile },
  data() {
    return {
      isLoading: true,
      hasBeenFiltered: false,
      dataSet: null,
      filters: {},
      urls: [
        { url: "/", caption: "Inicio", isActive: false, aria: "" },
        {
          url: "/projectlist",
          caption: "Listado de Proyectos",
          isActive: true,
          aria: "page",
        },
      ],
    };
  },
  methods: {
    setFilter(event) {
      this.isLoading = true;
      this.hasBeenFiltered = true;

      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive,
      };
      this.filters = updatedFilters;
    },
    resetFilters() {
      this.isLoading = false;
      const resetedfilters = {
        plomeria: false,
        electricidad: false,
        pintura: false,
        remodelacion: false,
        seguridad: false,
        herreria: false,
        limpieza: false,
        jardineria: false,
        ebanisteria: false,
        mudanza: false,
        refrigeracion: false,
        cerrajero: false,
        status: "created",
        ready: false,
        quoting: false,
        location: "ALL",
        withReviews: false,
      };
      this.filters = resetedfilters;
      this.hasBeenFiltered = false;
    },
    requiredImage(imageName) {
      try {
        return `${require("../../img/real-estate/catalog/" + imageName)}`;
      } catch (error) {
        // fallback image
        return `${require("../../img/real-estate/catalog/home.fix.avatar.jpeg")}`;
      }
    },
    async refreshProjectList() {
      this.isLoading = true;
      await this.$store
        .dispatch("projects/all", {})
        .then(() => {
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
  computed: {
    FilteredProjects() {
      if (this.refreshKey) {
        // console.log("FilteredProjects.filters", this.filters);
      } else {
        // console.log("FilteredProjects.filters", this.filters);
      }

      const projects = this.projects;

      if (!this.hasBeenFiltered) {
        return projects;
      }
      let dataSet = {};

      dataSet = projects.filter((project) => {
        if (project.status.includes("created")) {
          if (this.filters.ready && project.intention.includes("ready")) {
            return true;
          }
          if (this.filters.quoting && project.intention.includes("quoting")) {
            return true;
          }
          if (this.filters.pintura && project.services.includes("pintura")) {
            return true;
          }
          if (this.filters.plomeria && project.services.includes("plomeria")) {
            return true;
          }
          if (
            this.filters.pintura &&
            project.serviceTypes.includes("pintura")
          ) {
            return true;
          }
          if (
            this.filters.plomeria &&
            project.serviceTypes.includes("plomeria")
          ) {
            return true;
          }
          if (
            this.filters.remodelacion &&
            project.serviceTypes.includes("remodelación")
          ) {
            return true;
          }
          if (
            this.filters.electricidad &&
            project.serviceTypes.includes("electricidad")
          ) {
            return true;
          }
          if (
            this.filters.seguridad &&
            project.serviceTypes.includes("seguridad electrónica")
          ) {
            return true;
          }
          if (
            this.filters.herreria &&
            project.serviceTypes.includes("seguridad herreria")
          ) {
            return true;
          }
          if (
            this.filters.limpieza &&
            project.serviceTypes.includes("limpieza")
          ) {
            return true;
          }
          if (
            this.filters.jardineria &&
            project.serviceTypes.includes("jardineria")
          ) {
            return true;
          }
          if (
            this.filters.ebanisteria &&
            project.serviceTypes.includes("ebanisteria")
          ) {
            return true;
          }
          if (
            this.filters.mudanza &&
            project.serviceTypes.includes("mudanza")
          ) {
            return true;
          }
          if (
            this.filters.refrigeracion &&
            project.serviceTypes.includes("refrigeración")
          ) {
            return true;
          }
          if (
            this.filters.cerrajero &&
            project.serviceTypes.includes("cerrajero")
          ) {
            return true;
          }
          if (
            this.filters.fomigacion &&
            project.services.includes("fomigación")
          ) {
            return true;
          }
        }
        return false;
      });
      return dataSet;
    },
    hasProjects() {
      return !!this.recordsFound;
    },
    projects() {
      return this.$store.getters["projects/projects"];
    },
    recordsFound() {
      return this.FilteredProjects.length;
    },
    services() {
      return types.SERVICE_TYPES;
    },
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  updated() {
    this.isLoading = false;
  },
  async mounted() {
    this.$emit("child-breadcrumbs-urls", this.urls);
    await this.refreshProjectList();
    this.isLoading = false;
  },
};
</script>

<style scoped></style>
