import { apiSvc } from "../../../services";

const resource = "reviews";

export default {
  fetchReviews({ commit }) {
    apiSvc
      .get(resource)
      .then((response) => {
        commit("SET_REVIEW", response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching review: " + error.message);
      });
  },
  fetchReview({ commit }, data) {
    apiSvc
      .getById(resource, data.id)
      .then((response) => {
        // console.table(response.data);
        commit("SET_REVIEW", response.data);
      })
      .catch((error) => {
        console.log("There was an error fetching review: " + error.message);
      });
  },
  createReview({ commit }, review) {
    apiSvc
      .post(resource, review)
      .then(() => {
        commit("ADD_NEW_REVIEW", review);
      })
      .catch((error) => {
        console.log("There was a problem creating review: " + error.message);
      });
  },
  deleteReview({ commit }, review) {
    apiSvc.delete(resource, review).then(() => {
      commit("DELETE_REVIEW", review);
    });
  },
  updateReview({ commit }, review) {
    // console.table(review);
    apiSvc
      .update(resource, review)
      .then(() => {
        commit("UPDATE_REVIEW", review);
      })
      .catch((error) => {
        console.log("there was an error updating review: " + error.message);
      });
  },
  async getReviewsByClient({ commit }, payload) {
    await this.dispatch("index", "reviews/clients/" + payload.clientId, payload)
      .then((data) => {
        // console.log("getReviewsByClient.data", data);
        commit("SET_REVIEWS", JSON.parse(data));
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
