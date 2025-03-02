<template>
  <!-- Review modal-->
  <div class="modal fade" :id="`modal-review-` + projectId" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div
          class="modal-header d-block position-relative border-0 pb-0 px-sm-5 px-4"
        >
          <button
            class="btn-close position-absolute top-0 end-0 mt-3 me-3"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="d-flex align-items-center">
          <img
            class="img-fluid mx-5"
            src="../../assets/img/pricing/icon-1.svg"
            alt="..."
            width="52"
          />

          <h3 class="modal-title mt-4 text-center">Añadir Comentario</h3>
        </div>

        <div class="modal-body px-sm-5 px-4">
          <form class="needs-validation" novalidate>
            <!-- Proyecto Name -->
            <div class="mb-3">
              <label class="form-label fw-bold">Proyecto:</label>&nbsp;
              <label class="" id="Proyecto" type="text">{{
                projectTitle
              }}</label>
            </div>

            <!-- Contractor Name-->
            <div class="mb-3">
              <label class="form-label fw-bold">Contratista:</label>&nbsp;
              <label
                class=""
                id="name"
                type="text"
                placeholder="Nombre"
                :value="contractorName"
              >
                {{ contractorName }}
              </label>
            </div>

            <!-- Rating -->
            <div class="mb-3 align-items-center">
              <label class="form-label fw-bold">Valoracion</label>
              <star-rating
                v-bind:show-rating="false"
                v-bind:star-size="25"
                @update:rating="setRating"
              />
              <div
                class="input-errors text-danger"
                v-for="error of v$.review.rating.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>

            <!-- Comments -->
            <div class="mb-3">
              <label class="form-label fw-bold">Comentarios</label>
              <textarea
                class="form-control form-quriar-control border-400"
                :class="v$.review.comments.$error ? 'is-invalid' : ''"
                id="comments"
                placeholder="Describir tu experiencia con este contratista en este proyecto"
                style="height: 150px"
                v-model="v$.review.comments.$model"
              />
              <div
                class="input-errors text-danger"
                v-for="error of v$.review.comments.$errors"
                :key="error.$uid"
              >
                <div class="error-msg">{{ error.$message }}</div>
              </div>
            </div>

            <button
              class="btn btn-primary d-block w-100 mb-4"
              type="submit"
              @click.prevent="onSubmit"
              :disabled="v$.review.$error"
            >
              Grabar Comentario
              <i class="fas fa-bullhorn me-3" aria-hidden="true"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import StarRating from "vue-star-rating";

import DateFormatter from "../../mixins/dateFormatter.js";
import DismissModal from "../../mixins/dissmissModal.js";
import msgBoxDialog from "../../mixins/msgBoxDialog.js";

const selectionRequired = (value) => value; // if no selected value will be null therefore true

export default {
  name: "review-msg",
  mixins: [DateFormatter, msgBoxDialog, DismissModal],
  props: [
    "projectId",
    "reviewedById",
    "reviewedToId",
    "contractorName",
    "projectTitle",
  ],
  components: { StarRating },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      review: {},
    };
  },
  validations() {
    const requiedMsg = "Campo obligatorio.";
    const selectionRequiredMsg = "Seleccione una opcion valida.";

    return {
      review: {
        rating: {
          selectionRequired: helpers.withMessage(
            selectionRequiredMsg,
            selectionRequired
          ),
        },
        comments: { required: helpers.withMessage(requiedMsg, required) },
      },
    };
  },
  methods: {
    async onSubmit() {
      const result = await this.v$.$validate();

      if (!result) {
        return;
      }

      const dataSet = {
        reviewedById: this.reviewedById,
        reviewedToId: this.reviewedToId,
        projectId: this.projectId,
        title: this.projectTitle,
        comments: this.review.comments,
        rating: this.review.rating,
        updatedAt: this.date(Date.now(), "YYYY-MM-DD hh:mm:ss a"),
        isApproved: 0,
      };

      this.$store.dispatch("reviews/createReview", dataSet).then(() => {
        this.dismissModal("#modal-review-" + this.projectId);
        this.triggerMsgBox(
          true,
          "Registro realizado con éxito. Gracias por tu comentario. El nos ayuda a mejorar el sistema"
        );
      });
    },
    setRating: function (rating) {
      this.review.rating = rating;
    },
  },
  computed: {},
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
