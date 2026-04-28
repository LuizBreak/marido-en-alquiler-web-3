<template>
  <div class="col-lg-8 col-md-7 mb-5">
    <base-dialog :show="isLoading" title="Cargando..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>

    <BaseReviewMsg @trigger-msg-box="triggerMsgBox" />

    <h2 class="h2 mb-0">
      <i class="fi-chat-circle expand text-primary" aria-hidden="true"></i>
      Comentarios
    </h2>

    <p class="pt-1 mb-4">
      Las reseñas que hayas recibido serán visibles tanto aquí como en tu perfil
      público.
    </p>

    <ul
      class="nav nav-tabs flex-column flex-sm-row align-items-stretch align-items-sm-start border-bottom mb-4"
      role="tablist"
    >
      <li class="nav-item me-sm-3 mb-3">
        <a
          class="nav-link text-center active"
          href="#reviews-about-you"
          data-bs-toggle="tab"
          role="tab"
          aria-controls="reviews-about-you"
          aria-selected="true"
        >
          Sobre Ti
        </a>
      </li>

      <li class="nav-item mb-3">
        <a
          class="nav-link text-center"
          href="#reviews-by-you"
          data-bs-toggle="tab"
          role="tab"
          aria-controls="reviews-by-you"
          aria-selected="false"
        >
          De Ti
        </a>
      </li>

      <li class="nav-item mb-3 mx-3" v-if="false">
        <a
          class="btn btn-outline-primary"
          href="#modal-review"
          data-bs-toggle="modal"
        >
          <i class="fi-edit me-1"></i>Añadir comentarios
        </a>
      </li>
    </ul>

    <div class="tab-content pt-2 card card-body border-0 shadow-sm p-4 mb-4">
      <div
        class="tab-pane fade show active"
        id="reviews-about-you"
        role="tabpanel"
      >
        <div
          class="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch justify-content-between pb-4 mb-2 mb-md-3"
        >
          <h3 class="h4 mb-sm-0">
            <i
              class="fi-star-filled mt-n1 me-2 lead align-middle text-warning"
            ></i>
            {{ client.rating }} ({{ reviewsAboutMe.length }} Puntuación)
          </h3>

          <div class="d-flex align-items-center ms-sm-4">
            <label class="fs-sm me-2 pe-1 text-nowrap" for="review-sorting1">
              <i class="fi-arrows-sort text-muted mt-n1 me-2"></i>Sort by:
            </label>
            <select class="form-select form-select-sm" id="review-sorting1">
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        <div v-if="hasReviewsAboutYou && !isLoading">
          <ReviewTileAboutYou
            v-for="review in reviewsAboutMe"
            :key="review.reviewId"
            :id="review.reviewId"
            name="Jack Ranieri"
            :comments="review.comments"
            :rating="2.7"
            :postedDate="review.createdAt"
            avatarImg="03.png"
            :likes="0"
            :dislikes="1"
          />
        </div>

        <h3 v-else-if="!isLoading">No hay comentarios registrados.</h3>
      </div>

      <div class="tab-pane fade" id="reviews-by-you" role="tabpanel">
        <div
          class="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch justify-content-between pb-4 mb-2 mb-md-3"
        >
          <h3 class="h4 mb-sm-0">{{ reviewsByMe.length }} comentarios</h3>

          <div class="d-flex align-items-center ms-sm-4">
            <label class="fs-sm me-2 pe-1 text-nowrap" for="review-sorting2">
              <i class="fi-arrows-sort text-muted mt-n1 me-2"></i>Sort by:
            </label>
            <select class="form-select form-select-sm" id="review-sorting2">
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        <div v-if="hasReviewsByYou && !isLoading">
          <ReviewTileByYou
            v-for="review in reviewsByMe"
            :key="review.reviewId"
            :id="review.reviewId"
            :title="review.title"
            :comments="review.comments"
            :rating="review.rating"
            :postedDate="review.createdAt"
            :likes="0"
            :dislikes="1"
          />
        </div>

        <h3 v-else-if="!isLoading">No hay comentarios registrados.</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import BaseReviewMsg from "../../components/ui/BaseReviewMsg.vue";
import ReviewTileByYou from "../../components/ui/BaseReviewTileByYou.vue";
import ReviewTileAboutYou from "../../components/ui/BaseReviewTileAboutYou.vue";

const selectionRequired = (value) => value;

export default {
  emits: ["trigger-msg-box"],
  name: "Reviews",
  components: {
    BaseReviewMsg,
    ReviewTileByYou,
    ReviewTileAboutYou,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      isLoading: false,
      review: {
        name: "",
        email: "",
        comments: "",
        rating: 1,
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
          url: "/perfil/reviews",
          caption: "Comentarios",
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
      review: {
        name: { required: helpers.withMessage(requiedMsg, required) },
        email: {
          required: helpers.withMessage(requiedMsg, required),
          email: helpers.withMessage(invalidEmailMsg, email),
        },
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
  computed: {
    ...mapGetters(["IsClient", "userId"]),

    reviews() {
      return this.$store.getters["reviews/reviews"] || [];
    },

    reviewsByMe() {
      return this.reviews.filter(
        (review) => review.reviewedById == this.userId
      );
    },

    reviewsAboutMe() {
      return this.reviews.filter(
        (review) => review.reviewedToId == this.userId
      );
    },

    hasReviewsByYou() {
      return this.reviewsByMe.length > 0;
    },

    hasReviewsAboutYou() {
      return this.reviewsAboutMe.length > 0;
    },

    client() {
      return this.$store.getters["clients/client"] || {};
    },
  },
  methods: {
    triggerMsgBox(showIt, message) {
      this.$emit("trigger-msg-box", showIt, message);
    },

    async refreshReviewList() {
      this.isLoading = true;

      try {
        await this.$store.dispatch("reviews/getReviewsByClient", {
          clientId: this.userId,
        });
      } catch (error) {
        console.log("Error refreshing review list", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  async created() {
    this.$emit("child-breadcrumbs-urls", this.urls);
    await this.refreshReviewList();
  },
};
</script>

<style scoped></style>