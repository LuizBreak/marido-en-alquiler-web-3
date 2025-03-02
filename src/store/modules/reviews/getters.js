export default {
  reviews(state) {
    return state.reviews;
  },
  review(state) {
    return state.review;
  },
  hasReviews(state) {
    return state.reviews && state.reviews.length > 0;
  },
  selectedContractorId(_, getters, _2, rootGetters) {
    return rootGetters.userId;
  },
  loggedUser(_, getters, _2, rootGetters) {
    return rootGetters.loggedUser;
  },
};
