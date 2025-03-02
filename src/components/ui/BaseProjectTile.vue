<template>
  <!-- Review modal-->
  <BaseReviewMsg
    :projectId="id"
    :reviewedById="userId"
    :reviewedToId="contractorId"
    :projectTitle="title"
    :contractorName="companyName"
  />
  <!-- Bid modal-->
  <BaseProjectBid
    :projectId="id"
    :projectTitle="title"
    :startDate="date(startDate, 'DD MMM YY')"
    :description="description"
  />
  <!-- Item-->
  <div class="card card-hover card-horizontal border-0 shadow-sm mb-4">
    <div
      class="card-img-top position-relative"
      v-bind:style="requiredImage(tileImage)"
    >
      <a class="stretched-link" href="#signin-modal" data-bs-toggle="modal"></a>
      <div class="position-absolute end-0 top-0 pt-3 pe-3 zindex-5">
        <button
          class="btn btn-icon btn-light btn-xs text-primary rounded-circle shadow-sm"
          type="button"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title=""
        >
          <i class="fi-heart-filled"></i>
        </button>
      </div>
    </div>
    <div class="card-body position-relative pb-3">
      <h3 class="h6 mb-2 fs-base">
        <a class="nav-link xstretched-link" href="#">{{ title }} </a>
      </h3>
      <p class="mb-2 fs-sm text-muted">
        {{ description }}
      </p>
      <br />
      <div>
        <h6 class="mb-1 fs-xs fw-normal text-uppercase text-primary">
          Servicioss Utilizados:
        </h6>
        <div class="center">
          <base-badge
            v-for="service in serviceTypes"
            :key="service"
            :type="service"
            :title="service"
          ></base-badge>
        </div>
      </div>
      <div>
        <p class="my-3 fs-sm text-muted">
          <strong>Fecha de Inicio:</strong>
          {{ date(startDate, "DD MMM YY") }}
          <strong> &nbsp;&nbsp; Estatus:</strong>
          {{ status }}
        </p>
        <a
          v-if="ShowProvideReview && status == 'completado' && this.isClient"
          class="btn btn-outline-primary"
          :href="`#modal-review-` + id"
          data-bs-toggle="modal"
          ><i class="fi-edit me-1"></i>Añadir Comentario</a
        >
        <a
          v-if="ShowProvideReview && status == 'created' && this.isContractor"
          class="btn btn-outline-primary"
          :href="`#modal-bid-` + id"
          data-bs-toggle="modal"
          ><i class="fi-accounting me-1"></i>Hacer Oferta</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DateFormatter from "../../mixins/dateFormatter.js";
import BaseReviewMsg from "./BaseReviewMsg.vue";
import BaseProjectBid from "./baseProjectBid.vue";
import getUserAvatar from "../../mixins/getUserAvatar";
import * as types from "../../utils/types.js";

export default {
  name: "base-project-tile",
  mixins: [DateFormatter, getUserAvatar],
  props: [
    "id",
    "contractorId",
    "title",
    "description",
    "tileImage",
    "services",
    "startDate",
    "status",
    "ShowProvideReview",
  ],
  components: {
    BaseReviewMsg,
    BaseProjectBid,
  },
  data() {
    return {};
  },
  methods: {
    async retrieveContractorName() {
      await this.$store
        .dispatch("contractors/fetchContractor", { id: this.contractorId })
        .catch(() => {
          console.log("Error refreshing contractor name");
        });
    },
  },
  computed: {
    ...mapGetters([
      types.LOGGED_USER,
      types.IS_LOGGED_IN,
      "isClient",
      "isContractor",
      "userId",
    ]),
    serviceTypes() {
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
      var data = this.services;
      try {
        const replaced = data.replaceAll(`'`, `"`);
        // console.log("data", replaced);
        var arr = JSON.parse(replaced);
        return arr;
      } catch (error) {
        return data;
      }
    },
    companyName() {
      return this.$store.getters["contractors/companyName"];
    },
  },
  async created() {
    await this.retrieveContractorName();
  },
  mounted() {},
};
</script>
<style scoped></style>
