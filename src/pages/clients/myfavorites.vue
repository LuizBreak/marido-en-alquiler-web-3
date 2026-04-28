<template>
  <div class="col-lg-8 col-md-7 mb-5">
    <base-dialog :show="isLoading" title="Cargando..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>

    <div
      class="d-sm-flex align-items-center justify-content-between pb-3 pb-sm-4"
    >
      <h2 class="h2 mb-0">
        <i class="fi-heart expand text-primary" aria-hidden="true"></i>
        Mis Contratistas Favoritos
      </h2>
    </div>

    <div
      class="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch my-2"
    >
      <div class="d-flex align-items-center flex-shrink-0">
        <label class="fs-sm me-2 pe-1 text-nowrap" for="filterby">
          <i class="fi-filter text-muted mt-n1 me-2"></i>Filtrar por:
        </label>

        <select
          class="form-select form-select-sm"
          id="filterby"
          v-model="filters.serviceType"
          @change="setFilter"
        >
          <option value="ALL">-- Todos Servicios --</option>
          <option
            v-for="service in services"
            :key="service"
            :value="service"
          >
            {{ capitalizeFirstLetter(service) }}
          </option>
        </select>
      </div>

      <hr class="d-none d-sm-block w-100 mx-4" />

      <div class="d-none d-sm-flex align-items-center flex-shrink-0 text-muted">
        <i class="fi-check-circle me-2"></i>
        <span class="fs-sm mt-n1">Resultados: ({{ recordsFound }})</span>
      </div>
    </div>

    <div class="row g-4 py-4" v-if="hasContractors">
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
      />
    </div>

    <div v-else-if="!isLoading" class="py-4">
      <h3 class="h5 mb-0">No tienes contratistas favoritos todavía.</h3>
    </div>
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
      filters: {
        serviceType: "ALL",
      },
      urls: [
        { url: "/", caption: "Inicio", isActive: false, aria: "" },
        {
          url: this.IsClient ? "/perfil" : "/profile",
          caption: "Cuenta",
          isActive: false,
          aria: "",
        },
        {
          url: "/perfil/favoritos",
          caption: "Mis Favoritos",
          isActive: true,
          aria: "page",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["IsClient", "userId"]),

    myFavorites() {
      return this.$store.getters["contractors/contractors"] || [];
    },

    filteredContractors() {
      const contractors = this.myFavorites;

      if (!this.hasBeenFiltered || this.filters.serviceType === "ALL") {
        return contractors;
      }

      return contractors.filter((contractor) =>
        contractor.serviceTypes.includes(this.filters.serviceType)
      );
    },

    recordsFound() {
      return this.filteredContractors.length;
    },

    hasContractors() {
      return this.filteredContractors.length > 0;
    },

    services() {
      return types.SERVICE_TYPES;
    },
  },
  methods: {
    setFilter() {
      this.hasBeenFiltered = true;
    },

    resetFilters() {
      this.filters = {
        serviceType: "ALL",
      };
      this.hasBeenFiltered = false;
    },

    async refreshContractorList() {
      this.isLoading = true;

      try {
        const data = await this.$store.dispatch(
          "favorites/fetchMyFavorites",
          this.userId
        );

        this.$store.commit("contractors/SET_CONTRACTORS", data || []);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  },
  async mounted() {
    this.$emit("child-breadcrumbs-urls", this.urls);
    await this.refreshContractorList();
  },
};
</script>

<style scoped></style>