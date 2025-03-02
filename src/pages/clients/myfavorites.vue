<template>
  <base-dialog :show="isLoading" title="Cargango..." fixed>
    <base-spinner></base-spinner>
  </base-dialog>

  <div class="col-lg-8 col-md-7 mb-5">
    <!-- Title-->
    <div
      class="d-sm-flex align-items-center justify-content-between pb-3 pb-sm-4"
    >
      <h2 class="h2 mb-0">
        <i class="fi-heart expand text-primary" aria-hidden="true" />
        Mis Contratistas Favoritos
      </h2>
    </div>

    <!-- Debug only -->
    <!-- <p>{{ filters }}</p> -->

    <!-- Filtering -->
    <div
      class="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch my-2"
    >
      <div class="d-flex align-items-center flex-shrink-0">
        <label class="fs-sm me-2 pe-1 text-nowrap" for="sortby"
          ><i class="fi-filter text-muted mt-n1 me-2"></i>Filtrar por:</label
        >
        <select
          class="form-select form-select-sm"
          id="filterby"
          v-model="filters.serviceType"
          @change="setFilter"
        >
          <option value="ALL" selected>-- Todos Servicios --</option>
          <option :value="service" v-for="service in services" :key="service">
            {{ capitalizeFirstLetter(service) }}
          </option>
        </select>
      </div>
      <hr class="d-none d-sm-block w-100 mx-4" />
      <div class="d-none d-sm-flex align-items-center flex-shrink-0 text-muted">
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
        :tileImage="contractor.tileImage"
        :rating="contractor.rating"
        :numberOfRatings="contractor.numberOfRatings"
        :reviews="contractor.reviews"
        :distance="contractor.distance"
        :newMember="false"
        :verified="contractor.verified"
        :featured="contractor.featured"
        :memberSince="contractor.createdAt"
        :services="contractor.serviceTypes"
        :isFavorite="true"
      ></contractor-tile>
    </div>
    <!-- Pagination-->
    <!-- <nav class="border-top pb-md-4 pt-4 mt-2" aria-label="Pagination">
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
    </nav> -->
  </div>
</template>

<script>
import * as types from "../../utils/types.js";
import { mapGetters } from "vuex";

import ContractorTile from "../../components/ui/BaseContractorTile.vue";

export default {
  name: "my-favorites",
  components: { ContractorTile },
  data() {
    return {
      isLoading: true,
      hasBeenFiltered: false,
      recordsFound: 0,
      dataSet: null,
      filters: {
        serviceType: "ALL",
      },
      urls: [
        { url: "/", caption: "Inicio", isActive: false, aria: "" },
        {
          url: this.isClient ? "/perfil" : "/profile",
          caption: "Cuenta",
          isActive: false,
          aria: "",
        },
        {
          url: "/favoritos",
          caption: "Mis Favoritos",
          isActive: true,
          aria: "page",
        },
      ],
    };
  },
  methods: {
    setFilter(event) {
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
        serviceType: "ALL",
      };
      this.filters = resetedfilters;
      this.hasBeenFiltered = false;
      this.refreshContractorList();
    },
    async refreshContractorList() {
      this.isLoading = true;
      await this.$store
        .dispatch("favorites/fetchMyFavorites", this.userId)
        .then((data) => {
          this.isLoading = false;
          this.recordsFound = this.$store.getters["contractors/length"];
          this.$store.commit("contractors/SET_CONTRACTORS", data);
        })
        .catch((error) => {
          this.isLoading = false;
          console.log(error);
        });
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
  computed: {
    ...mapGetters(["IsClient", "userId"]),
    filteredContractors() {
      const contractors = this.myFavorites;

      if (!this.hasBeenFiltered) {
        // show all records
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isLoading = false;
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.recordsFound = contractors.length;
        return contractors;
      }
      let dataSet = {};

      dataSet = contractors.filter((contractor) => {
        if (this.filters.serviceType === "ALL") {
          return true;
        } else if (contractor.serviceTypes.includes(this.filters.serviceType)) {
          return true;
        }
        return false;
      });
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.recordsFound = dataSet.length;
      return dataSet;
    },
    hasContractors() {
      return !!this.recordsFound;
    },
    myFavorites() {
      return this.$store.getters["contractors/contractors"];
    },
    userId() {
      return this.$store.getters["userId"];
    },
    services() {
      return types.SERVICE_TYPES;
    },
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  async mounted() {
    this.$emit("child-breadcrumbs-urls", this.urls);
    await this.refreshContractorList();
    this.isLoading = false;
  },
};
</script>

<style scoped></style>
