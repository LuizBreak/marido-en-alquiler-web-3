export default {
  SET_FAVORITES(state, favorites) {
    console.table("SET_FAVORITES", JSON.parse(favorites));
    state.contractors = [];
    for (const x of JSON.parse(favorites)) {
      state.favorites.push(x);
    }
  },
  SET_FAVORITE(state, favorite) {
    state.favorites = favorite;
  },
  ADD_NEW_FAVORITE(state, favorite) {
    state.favorites.push(favorite);
  },
  DELETE_FAVORITE(state, favorite) {
    let index = state.favorites.indexOf(favorite);
    if (index > -1) {
      state.favorites.splice(index, 1);
    }
  },
  UPDATE_FAVORITE(state, favorite) {
    state.favorites[favorite.id] = favorite;
  },
};
