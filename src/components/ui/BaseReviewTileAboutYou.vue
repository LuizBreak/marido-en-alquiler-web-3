<template>
  <!-- Review Tile -->
  <div class="mb-4 pb-4 border-bottom">
    <div class="d-flex justify-content-between mb-3">
      <div class="d-flex align-items-center pe-2">
        <img class="rounded-circle me-1" :src="userAvatar" width="48" alt="" />
        <div class="ps-2">
          <h6 class="fs-base mb-0">{{ name }} Rating: {{ rating }}</h6>
          <RatingStars :rating="rating" />
          <!-- <span class="star-rating" :value="rating"
            ><i
              class="star-rating-icon active"
              :class="rating == 1 ? 'fi-star-filled' : 'fi-star'"
            ></i>
            <i
              class="star-rating-icon active"
              :class="rating == 2 ? 'fi-star-filled' : 'fi-star'"
            ></i>
            <i
              class="star-rating-icon active"
              :class="rating == 3 ? 'fi-star-filled' : 'fi-star'"
            ></i>
            <i
              class="star-rating-icon active"
              :class="rating == 4 ? 'fi-star-filled' : 'fi-star'"
            ></i>
            <i
              class="star-rating-icon active"
              :class="rating == 5 ? 'fi-star-filled' : 'fi-star'"
            ></i>
          </span> -->
        </div>
      </div>
      <span class="text-muted fs-sm">{{ date(postedDate, "DD MMM YY") }}</span>
    </div>
    <p>
      {{ comments }}
    </p>
    <div class="d-flex align-items-center">
      <button class="btn-like" type="button">
        <i class="fi-like"></i><span>{{ likes }}</span>
      </button>
      <div class="border-end me-1">&nbsp;</div>
      <button class="btn-dislike" type="button">
        <i class="fi-dislike"></i><span>{{ dislikes }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import DateFormatter from "../../mixins/dateFormatter.js";
import RatingStars from "./BaseRating.vue";

export default {
  name: "review-tile-by-you",
  mixins: [DateFormatter],
  props: {
    name: {
      type: String,
      required: true,
      default: null,
    },
    postedDate: {
      type: Date,
      required: true,
      default: null,
    },
    avatarImg: {
      type: String,
      required: true,
      default: "",
    },
    rating: {
      type: Number,
      required: true,
      default: 1,
    },
    comments: {
      type: String,
      required: true,
      default: "",
    },
    likes: { type: Number, required: true, default: 1 },
    dislikes: { type: Number, required: true, default: 1 },
  },
  components: { RatingStars },
  data() {
    return {
      id: "",
    };
  },
  methods: {},
  computed: {
    userAvatar() {
      try {
        return require("../../img/avatars/" + this.avatarImg);
      } catch (error) {
        // fallback image
        return require("../../img/avatars/13.png");
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped></style>
