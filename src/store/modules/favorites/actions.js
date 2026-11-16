import { apiSvc } from "../../../services/api.service";
import { createCrudActions } from "../../crud-actions";
export default {
  ...createCrudActions({ resource: "favorites", singular: "Favorite", plural: "Favorites", mutation: "FAVORITE", listMutation: "SET_FAVORITES" }),
  async deleteFavorite({ commit }, favorite) {
    const id = favorite.Id ?? favorite.id;
    if (id != null) {
      await apiSvc.delete("favorites", favorite);
    } else {
      if (!favorite.clientId || !favorite.contractorId) throw new Error("Favorite owner and professional are required.");
      await apiSvc.customRequest({ method: "delete", url: "/favorites/clients/" + encodeURIComponent(favorite.clientId) + "/contractors/" + encodeURIComponent(favorite.contractorId) });
    }
    commit("DELETE_FAVORITE", favorite);
    return favorite;
  },
  async fetchMyFavorites({ rootGetters }, clientId) {
    const owner = clientId ?? rootGetters.userId;
    if (!owner || owner === "undefined" || owner === "null") throw new Error("A client identity is required.");
    const response = await apiSvc.get("favorites/clients/" + encodeURIComponent(owner));
    return response.data.data;
  },
};
