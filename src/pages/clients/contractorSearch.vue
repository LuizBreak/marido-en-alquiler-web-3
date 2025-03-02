<template>
  <!-- Page content-->
  <div class="container-fluid mt-3 pt-0 p-0">
    <!-- <div v-if="isLoading">
      <base-spinner v-if="isLoading"></base-spinner>
    </div> -->
    <base-dialog :show="isLoading" title="Cargando..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <div class="row mx-3 g-0 mt-n2 quick-contact-form">
      <!-- Filters sidebar (Offcanvas on mobile)-->
      <aside
        class="col-lg-4 col-xl-3 border-top-lg border-end-lg shadow-sm px-2 px-xl-4 px-xxl-5 pt-lg-2"
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
          <!-- TODO: Decided later if this button approach will be useful for us -->
          <div
            class="offcanvas-header d-block border-bottom pt-0 pt-lg-4 px-lg-0"
            v-if="false"
          >
            <ul class="nav nav-tabs mb-0">
              <li class="nav-item">
                <a class="nav-link" href="#"
                  ><i class="fi-check fs-base me-2"></i>Certificado</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="#"
                  ><i class="fi-home fs-base me-2"></i>Todos</a
                >
              </li>
            </ul>
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
                    >Refrigeracion</label
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
                    >remodelación</label
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
                    id="cleaning"
                    v-model="filters.cleaning"
                    @change="setFilter"
                  />
                  <label class="form-check-label fs-sm" for="cleaning"
                    >Limpieza</label
                  >
                </div> -->
              </div>
            </div>
            <div class="pb-4 mb-2">
              <h3 class="h6">Puntuación</h3>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="star5"
                  @change="setFilter"
                  v-model="filters.star5"
                />
                <label
                  class="form-check-label fs-sm align-middle mt-n2"
                  for="star5"
                  ><span class="star-rating"
                    ><i class="star-rating-icon fi-star-filled active"></i
                    ><i class="star-rating-icon fi-star-filled active"></i
                    ><i class="star-rating-icon fi-star-filled active"></i
                    ><i class="star-rating-icon fi-star-filled active"></i
                    ><i class="star-rating-icon fi-star-filled active"></i
                  ></span>
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="star4"
                  @change="setFilter"
                  v-model="filters.star4"
                />
                <label
                  class="form-check-label fs-sm align-middle mt-n2"
                  for="star4"
                  ><span class="star-rating"
                    ><i class="star-rating-icon fi-star-filled active"></i
                    ><i class="star-rating-icon fi-star-filled active"></i
                    ><i class="star-rating-icon fi-star-filled active"></i
                    ><i class="star-rating-icon fi-star-filled active"></i
                    ><i class="star-rating-icon fi-star"></i
                  ></span>
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="star3"
                  @change="setFilter"
                  v-model="filters.star3"
                />
                <label
                  class="form-check-label fs-sm align-middle mt-n2"
                  for="3-star"
                  ><span class="star-rating"
                    ><i class="star-rating-icon fi-star-filled active"></i
                    ><i class="star-rating-icon fi-star-filled active"></i
                    ><i class="star-rating-icon fi-star-filled active"></i
                    ><i class="star-rating-icon fi-star"></i
                    ><i class="star-rating-icon fi-star"></i
                  ></span>
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="star2"
                  @change="setFilter"
                  v-model="filters.star2"
                />
                <label
                  class="form-check-label fs-sm align-middle mt-n2"
                  for="2-star"
                  ><span class="star-rating"
                    ><i class="star-rating-icon fi-star-filled active"></i
                    ><i class="star-rating-icon fi-star-filled active"></i
                    ><i class="star-rating-icon fi-star"></i
                    ><i class="star-rating-icon fi-star"></i
                    ><i class="star-rating-icon fi-star"></i
                  ></span>
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="star1"
                  @change="setFilter"
                  v-model="filters.star1"
                />
                <label
                  class="form-check-label fs-sm align-middle mt-n2"
                  for="1-star"
                  ><span class="star-rating"
                    ><i class="star-rating-icon fi-star-filled active"></i
                    ><i class="star-rating-icon fi-star"></i
                    ><i class="star-rating-icon fi-star"></i
                    ><i class="star-rating-icon fi-star"></i
                    ><i class="star-rating-icon fi-star"></i
                  ></span>
                </label>
              </div>
            </div>

            <div class="d-flex justify-content-between mb-4">
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
            </div>
            <div class="pb-4 mb-2">
              <h3 class="h6">Opciones Adicionales</h3>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="verified"
                  @change="setFilter"
                  v-model="filters.verified"
                />
                <label class="form-check-label fs-sm" for="verified"
                  >Certificado</label
                >
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="featured"
                  @change="setFilter"
                  v-model="filters.featured"
                />
                <label class="form-check-label fs-sm" for="featured"
                  >Destacado</label
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
        <!-- Map popup-->
        <div class="map-popup invisible" id="map">
          <button
            class="btn btn-icon btn-light btn-sm shadow-sm rounded-circle"
            type="button"
            data-bs-toggle-class="invisible"
            data-bs-target="#map"
          >
            <i class="fi-x fs-xs"></i>
          </button>
          <div
            class="interactive-map"
            data-map-options-json="json/map-options-real-estate-rent.json"
          ></div>
        </div>

        <!-- Title-->
        <div
          class="d-sm-flex align-items-center justify-content-between pb-3 pb-sm-4"
        >
          <h1 class="h2 mb-sm-0">Contratistas Disponibles</h1>
          <a
            class="d-inline-block fw-bold text-decoration-none py-1"
            href="#"
            data-bs-toggle-class="invisible"
            data-bs-target="#map"
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
              <option>Más Populares</option>
              <option>Más Comentarios</option>
              <option>Ponctuacion Alta</option>
              <option>Ponctuacion Baja</option>
            </select>
          </div>
          <hr class="d-none d-sm-block w-100 mx-4" />
          <div
            class="d-none d-sm-flex align-items-center flex-shrink-0 text-muted"
          >
            <i class="fi-check-circle me-2"></i
            ><span class="fs-sm mt-n1">Resultados: ({{ recordsFound }})</span>
          </div>
        </div>

        <!-- Catalog grid-->
        <div class="row g-4 py-4" v-if="hasContractors">
          <!-- Item Loop -->
          <contractor-tile
            v-for="contractor in filteredContractors"
            :key="contractor.id"
            :id="contractor.id"
            :title="contractor.companyName"
            :description="contractor.description"
            :avatar="contractor.avatar"
            :rating="contractor.rating"
            :numberOfRatings="contractor.numberOfRatings"
            :reviews="contractor.reviews"
            :distance="contractor.distance"
            :newMember="false"
            :verified="contractor.verified"
            :featured="contractor.featured"
            :memberSince="contractor.createdAt"
            :services="contractor.serviceTypes"
            :isFavorite="contractor.verified"
            :email="contractor.email"
            :phone="contractor.phone"
            :nrProjectsCompleted="contractor.nrProjectsCompleted"
          ></contractor-tile>
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
import ContractorTile from "../../components/ui/BaseContractorTile.vue";
import * as types from "../../utils/types.js";
import getUserAvatar from "../../mixins/getUserAvatar";

export default {
  name: "contractor-search",
  components: { ContractorTile },
  mixins: [getUserAvatar],
  data() {
    return {
      isLoading: true,
      hasBeenFiltered: false,
      dataSet: null,
      filters: {},
      // serviceList: this.services,
      urls: [
        { url: "/", caption: "Inicio", isActive: false, aria: "" },
        { url: "/busqueda", caption: "Busqueda", isActive: true, aria: "page" },
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
        star1: false,
        star2: false,
        star3: false,
        star4: false,
        star5: false,
        withReviews: false,
        verified: false,
        featured: false,
        location: "ALL",
      };
      this.filters = resetedfilters;
      this.hasBeenFiltered = false;
      this.refreshContractorList();
    },
    // requiredImage(imageName) {
    //   try {
    //     return `${require("../../img/real-estate/catalog/" + imageName)}`;
    //   } catch (error) {
    //     // fallback image
    //     return `${require("../../img/real-estate/catalog/home.fix.avatar.jpeg")}`;
    //   }
    // },
    async refreshContractorList() {
      this.isLoading = true;
      await this.$store
        .dispatch("contractors/fetchContractors", {})
        .then(() => {
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          // console.log("Error refreshing contractor list");
        });
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
  computed: {
    filteredContractors() {
      const contractors = this.contractors;

      if (!this.hasBeenFiltered) {
        return contractors;
      }
      let dataSet = {};

      dataSet = contractors.filter((contractor) => {
        if (
          this.filters.pintura &&
          contractor.serviceTypes.includes("pintura")
        ) {
          return true;
        }
        if (
          this.filters.plomeria &&
          contractor.serviceTypes.includes("plomeria")
        ) {
          return true;
        }
        if (
          this.filters.remodelacion &&
          contractor.serviceTypes.includes("remodelación")
        ) {
          return true;
        }
        if (
          this.filters.electricidad &&
          contractor.serviceTypes.includes("electricidad")
        ) {
          return true;
        }
        if (
          this.filters.seguridad &&
          contractor.serviceTypes.includes("seguridad electrónica")
        ) {
          return true;
        }
        if (
          this.filters.herreria &&
          contractor.serviceTypes.includes("seguridad herreria")
        ) {
          return true;
        }
        if (
          this.filters.limpieza &&
          contractor.serviceTypes.includes("limpieza")
        ) {
          return true;
        }
        if (
          this.filters.jardineria &&
          contractor.serviceTypes.includes("jardineria")
        ) {
          return true;
        }
        if (
          this.filters.ebanisteria &&
          contractor.serviceTypes.includes("ebanisteria")
        ) {
          return true;
        }
        if (
          this.filters.mudanza &&
          contractor.serviceTypes.includes("mudanza")
        ) {
          return true;
        }
        if (
          this.filters.refrigeracion &&
          contractor.serviceTypes.includes("refrigeración")
        ) {
          return true;
        }
        if (
          this.filters.cerrajero &&
          contractor.serviceTypes.includes("cerrajero")
        ) {
          return true;
        }
        if (this.filters.star1 && contractor.rating <= 1) {
          return true;
        }
        if (this.filters.star2 && contractor.rating === 2) {
          return true;
        }
        if (this.filters.star3 && contractor.rating === 3) {
          return true;
        }
        if (this.filters.star4 && contractor.rating === 4) {
          return true;
        }
        if (this.filters.star5 && contractor.rating === 5) {
          return true;
        }
        if (this.filters.withReviews) {
          if (contractor.reviews >= 1) {
            return true;
          }
        }
        if (this.filters.verified) {
          if (contractor.verified) {
            return true;
          }
        }
        if (this.filters.featured) {
          if (contractor.featured) {
            return true;
          }
        }
        return false;
      });
      return dataSet;
    },
    hasContractors() {
      return !!this.recordsFound;
    },
    contractors() {
      return this.$store.getters["contractors/contractors"];
    },
    recordsFound() {
      return this.filteredContractors.length;
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
    await this.refreshContractorList();
    console.table(this.contractors);

    // apply filter in case query string was provided
    const serviceType = this.$route.query;
    this.filters[serviceType.type] = true;
    if (this.filters.undefined !== true) {
      this.hasBeenFiltered = true;
    }
    this.isLoading = false;
  },
};
</script>

<style scoped></style>
