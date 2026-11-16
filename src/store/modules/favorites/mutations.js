import { entityMutations } from "../../entity-state";
export default {
 ...entityMutations({"list":"favorites","item":"favorite","key":"Id","mutation":"FAVORITE","listMutation":"SET_FAVORITES"})
};
