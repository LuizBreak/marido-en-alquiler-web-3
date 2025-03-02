export default {
  SET_REVIEWS(state, reviews) {
    // console.table("SET_REVIEWS", reviews);
    state.reviews = [];
    for (const x of reviews) {
      state.reviews.push(x);
    }
  },
  SET_REVIEW(state, review) {
    state.review = review;
  },
  ADD_NEW_REVIEW(state, review) {
    state.reviews.push(review);
  },
  DELETE_REVIEW(state, review) {
    let index = state.reviews.indexOf(review);
    if (index > -1) {
      state.reviews.splice(index, 1);
    }
  },
  UPDATE_REVIEW(state, review) {
    state.reviews[review.id] = review;
  },
};
