export default {
  favorites(state) {
    return state.favorites;
  },
  favorite(state) {
    return state.favorite;
  },
  hasFavorites(state) {
    return state.favorites && state.favorites.length > 0;
  },
  selectedContractorId(_, getters, _2, rootGetters) {
    return rootGetters.userId;
  },
  loggedUser(_, getters, _2, rootGetters) {
    return rootGetters.loggedUser;
  },
};
