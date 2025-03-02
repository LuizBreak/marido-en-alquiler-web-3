<template>
  <span class="star-rating" :value="rating"
    ><i
      class="star-rating-icon active"
      :class="
        rating >= 0.5 && rating < 1
          ? 'fi-star-half'
          : rating >= 1
          ? 'fi-star-filled'
          : 'fi-star'
      "
    ></i>
    <i
      class="star-rating-icon active"
      :class="
        rating >= 1.5 && rating < 2
          ? 'fi-star-half'
          : rating >= 2
          ? 'fi-star-filled'
          : 'fi-star'
      "
    ></i>
    <i
      class="star-rating-icon active"
      :class="
        rating > 2.5 && rating < 3
          ? 'fi-star-half'
          : rating >= 3
          ? 'fi-star-filled'
          : 'fi-star'
      "
    ></i>
    <i
      class="star-rating-icon active"
      :class="
        rating > 3.5 && rating < 4
          ? 'fi-star-half'
          : rating >= 4
          ? 'fi-star-filled'
          : 'fi-star'
      "
    ></i>
    <i
      class="star-rating-icon active"
      :class="
        rating > 4.5 && rating < 5
          ? 'fi-star-half'
          : rating >= 5
          ? 'fi-star-filled'
          : 'fi-star'
      "
    ></i>
  </span>
</template>

<script>
export default {
  props: ["rating"],
  computed: {},
};
</script>

<style scoped></style>
