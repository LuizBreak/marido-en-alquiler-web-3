import { apiSvc } from "../../../services";

const resource = "favorites";

export default {
  fetchFavorites({ commit }) {
    apiSvc
      .get(resource)
      .then((response) => {
        commit("SET_FAVORITES", response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching favorites: " + error.message);
      });
  },
  fetchFavorite({ commit }, data) {
    apiSvc
      .getById(resource, data.id)
      .then((response) => {
        // console.table(response.data);
        commit("SET_FAVORITE", response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching favorite: " + error.message);
      });
  },
  async createFavorite({ commit }, favorite) {
    // TODO: investigate how
    // first delete any possible previous occurrence of this favorite
    // await this.deleteFavorite(commit, favorite);

    apiSvc
      .post(resource, favorite)
      .then(() => {
        commit("ADD_NEW_FAVORITE", favorite);
      })
      .catch((error) => {
        console.log("There was a problem creating favorite: " + error.message);
      });
  },
  async deleteFavorite({ commit }, favorite) {
    const requestData = {
      method: "delete",
      url: "/favorites/" + favorite.id,
      data: favorite,
    };
    apiSvc.customRequest(requestData).then(() => {
      commit("DELETE_FAVORITE", favorite);
    });

    // Attention: it needed more complex delete request than the startard one
    // apiSvc.delete(resource, favorite).then(() => {
    //   commit("DELETE_FAVORITE", favorite);
    // });
  },
  updateFavorite({ commit }, favorite) {
    apiSvc
      .update(resource, favorite)
      .then(() => {
        commit("UPDATE_FAVORITE", favorite);
      })
      .catch((error) => {
        console.log("there was an error updating favorite: " + error.message);
      });
  },
  async fetchMyFavorites(clientId) {
    const requestData = {
      method: "get",
      url: "/favorites/clients/58",
      data: clientId,
    };
    try {
      const response = await apiSvc.customRequest(requestData);
      return response.data.body;
    } catch (error) {
      // console.log("fetchMyFavorites: error : " + error);
      return {};
    }
    // try {
    //   apiSvc.customRequest(requestData).then((response) => {
    //     console.log("fetchMyFavorites response", response);
    //     console.log("fetchMyFavorites body:", response.data.body);
    //     // commit("SET_FAVORITES", []);

    //     return response.data.body;
    //   });
    // } catch (error) {
    //   console.log("fetchMyFavorites error", error);
    // }
  },
};
