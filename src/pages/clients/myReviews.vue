<template>
  <base-dialog :show="isLoading" title="Cargango..." fixed>
    <base-spinner></base-spinner>
  </base-dialog>

  <!-- Review modal-->
  <BaseReviewMsg @trigger-msg-box="triggerMsgBox" />

  <!-- Content-->
  <div class="col-lg-8 col-md-7 mb-5">
    <h2 class="h2 mb-0">
      <i class="fi-chat-circle expand text-primary" aria-hidden="true" />
      Comentarios
    </h2>
    <h1 class="h2"></h1>
    <p class="pt-1 mb-4">
      Las reseñas que hayas recibido serán visibles tanto aquí como en tu perfil
      público.
    </p>
    <!-- Nav tabs-->
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
          >Sobre Ti</a
        >
      </li>
      <li class="nav-item mb-3">
        <a
          class="nav-link text-center"
          href="#reviews-by-you"
          data-bs-toggle="tab"
          role="tab"
          aria-controls="reviews-by-you"
          aria-selected="false"
          >De Ti</a
        >
      </li>
      <li class="nav-item mb-3 mx-3" v-if="false">
        <a
          class="btn btn-outline-primary"
          href="#modal-review"
          data-bs-toggle="modal"
          ><i class="fi-edit me-1"></i>Añadir comentarios</a
        >
      </li>
    </ul>

    <!-- Tabs content-->
    <div class="tab-content pt-2 card card-body border-0 shadow-sm p-4 mb-4">
      <!-- Reviews about you tab-->
      <div
        class="tab-pane fade show active"
        id="reviews-about-you"
        role="tabpanel"
      >
        <!-- Reviews - Total reviews issued to this client-->
        <div
          class="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch justify-content-between pb-4 mb-2 mb-md-3"
        >
          <h3 class="h4 mb-sm-0">
            <i
              class="fi-star-filled mt-n1 me-2 lead align-middle text-warning"
            ></i
            >{{ client.rating }} ({{ reviewsAboutMe.length }} Puntuación)
          </h3>
          <div class="d-flex align-items-center ms-sm-4">
            <label class="fs-sm me-2 pe-1 text-nowrap" for="review-sorting1"
              ><i class="fi-arrows-sort text-muted mt-n1 me-2"></i>Sort
              by:</label
            >
            <select class="form-select form-select-sm" id="review-sorting1">
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        <!-- Review Items About Me -->
        <div v-if="hasReviewsAboutYou && !isLoading">
          <ReviewTileAboutYou
            v-for="review in reviewsAboutMe"
            :key="review.reviewsId"
            :id="review.reviewId"
            name="Jack Ranieri"
            :comments="review.comments"
            :rating="2.7"
            :postedDate="review.createdAt"
            avatarImg="03.png"
            :likes="0"
            :dislikes="1"
          >
            ></ReviewTileAboutYou
          >
        </div>
        <h3 v-else>No hay comentarios registrados.</h3>

        <!-- Review Sample Only -->
        <div class="mb-4 pb-4 border-bottom" v-if="false">
          <div class="d-flex justify-content-between mb-3">
            <div class="d-flex align-items-center pe-2">
              <img
                class="rounded-circle me-1"
                src="../../img/avatars/05.jpg"
                width="48"
                alt="Avatar"
              />
              <div class="ps-2">
                <h6 class="fs-base mb-0">Floyd Miles</h6>
                <span class="star-rating"
                  ><i class="star-rating-icon fi-star-filled active"></i
                  ><i class="star-rating-icon fi-star-filled active"></i
                  ><i class="star-rating-icon fi-star-filled active"></i
                  ><i class="star-rating-icon fi-star-filled active"></i
                  ><i class="star-rating-icon fi-star-filled active"></i
                ></span>
              </div>
            </div>
            <span class="text-muted fs-sm">Oct 28, 2020</span>
          </div>
          <p>
            Viverra nunc blandit sapien non imperdiet sit. Purus tempus
            elementum aliquam eu urna. A aenean duis non egestas at libero
            porttitor integer eget. Sed dictum lobortis laoreet gravida.
          </p>
          <div class="d-flex align-items-center">
            <button class="btn-like" type="button">
              <i class="fi-like"></i><span>(2)</span>
            </button>
            <div class="border-end me-1">&nbsp;</div>
            <button class="btn-dislike" type="button">
              <i class="fi-dislike"></i><span>(1)</span>
            </button>
          </div>
        </div>

        <!-- Pagination-->
        <nav class="mt-2" aria-label="Reviews pagination" v-if="false">
          <ul class="pagination">
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

      <!-- Reviews by you tab-->
      <div class="tab-pane fade" id="reviews-by-you" role="tabpanel">
        <!-- Reviews - Total reviews issued by this client-->
        <div
          class="d-flex flex-sm-row flex-column align-items-sm-center align-items-stretch justify-content-between pb-4 mb-2 mb-md-3"
        >
          <h3 class="h4 mb-sm-0">{{ reviewsByMe.length }} comentarios</h3>
          <div class="d-flex align-items-center ms-sm-4">
            <label class="fs-sm me-2 pe-1 text-nowrap" for="review-sorting2"
              ><i class="fi-arrows-sort text-muted mt-n1 me-2"></i>Sort
              by:</label
            >
            <select class="form-select form-select-sm" id="review-sorting2">
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        <!-- Review Items by Me -->
        <div v-if="hasReviewsByYou && !isLoading">
          <ReviewTileByYou
            v-for="review in reviewsByMe"
            :key="review.reviewsId"
            :id="review.reviewId"
            :title="review.title"
            :comments="review.comments"
            :rating="review.rating"
            :postedDate="review.createdAt"
            :likes="0"
            :dislikes="1"
          >
            ></ReviewTileByYou
          >
        </div>
        <h3 v-else>No hay comentarios registrados.</h3>

        <!-- Review Sample Only -->
        <div class="mb-4 pb-4 border-bottom" v-if="false">
          <div class="d-flex justify-content-between mb-3">
            <div class="pe-2">
              <h6 class="mb-0">
                <span class="fw-normal text-muted me-1">For:</span>3-bed
                Apartment
              </h6>
              <span class="star-rating"
                ><i class="star-rating-icon fi-star-filled active"></i
                ><i class="star-rating-icon fi-star-filled active"></i
                ><i class="star-rating-icon fi-star"></i
                ><i class="star-rating-icon fi-star"></i
                ><i class="star-rating-icon fi-star"></i
              ></span>
            </div>
            <span class="text-muted fs-sm">Jan 13, 2021</span>
          </div>
          <p>
            Elementum ut quam tincidunt egestas vitae elit, hendrerit.
            Ullamcorper nulla amet lobortis elit, nibh condimentum enim. Aliquam
            felis nisl tellus sodales lectus dictum tristique proin vitae. Odio
            fermentum viverra tortor quis.
          </p>
          <div class="d-flex align-items-center">
            <button class="btn-like" type="button">
              <i class="fi-like"></i><span>(2)</span>
            </button>
            <div class="border-end me-1">&nbsp;</div>
            <button class="btn-dislike" type="button">
              <i class="fi-dislike"></i><span>(1)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import * as types from "../../utils/types.js";
import { mapGetters } from "vuex";

import useVuelidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import BaseReviewMsg from "../../components/ui/BaseReviewMsg.vue";
import ReviewTileByYou from "../../components/ui/BaseReviewTileByYou.vue";
import ReviewTileAboutYou from "../../components/ui/BaseReviewTileAboutYou.vue";

const selectionRequired = (value) => value; // if no selected value will be null therefore true

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
          url: this.isClient ? "/perfil" : "/profile",
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
    reviewsByMe() {
      const reviews = this.reviews;

      const dataSet = reviews.filter((review) => {
        if (review.reviewedById == this.userId) {
          return true;
        }
      });
      return dataSet;
    },
    reviewsAboutMe() {
      const reviews = this.reviews;

      const dataSet = reviews.filter((review) => {
        if (review.reviewedToId == this.userId) {
          return true;
        }
      });
      return dataSet;
    },
    hasReviewsByYou() {
      return !!this.reviewsByMe.length;
    },
    hasReviewsAboutYou() {
      return !!this.reviewsAboutMe.length;
    },
    reviews() {
      return this.$store.getters["reviews/reviews"];
    },
    client() {
      return this.$store.getters["clients/client"];
    },
  },
  methods: {
    async refreshReviewList() {
      this.isLoading = true;
      await this.$store
        .dispatch("reviews/getReviewsByClient", {
          clientId: this.userId,
        })
        .catch(() => {
          console.log("Error refreshing review list");
        });
      this.isLoading = false;
    },
  },
  async created() {
    this.$emit("child-breadcrumbs-urls", this.urls);
    await this.refreshReviewList();
    /*
      console.log("hasReviewsByMe", this.hasReviewsByYou);
      console.log("hasReviewsAboutYou", this.hasReviewsAboutYou);
      console.log("isLoading", this.isLoading);
      console.log("reviews", this.reviews);
    */
  },
  mounted() {},
};
</script>

<style scoped></style>
