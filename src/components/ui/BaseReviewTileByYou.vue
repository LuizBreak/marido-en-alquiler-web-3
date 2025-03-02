<template>
  <!-- Review Tile By You -->
  <div class="mb-4 pb-4 border-bottom">
    <div class="d-flex justify-content-between mb-3">
      <div class="pe-2">
        <h6 class="mb-0">
          <span class="fw-normal text-muted me-1">For: </span>{{ title }}
        </h6>
        <RatingStars :rating="rating" />
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
    title: {
      type: String,
      required: true,
      default: null,
    },
    postedDate: {
      type: Date,
      required: true,
      default: null,
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
  computed: {},
  created() {},
  mounted() {},
};
</script>
<style scoped></style>
