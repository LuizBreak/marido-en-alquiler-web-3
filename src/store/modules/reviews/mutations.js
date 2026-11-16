import { entityMutations } from "../../entity-state";
export default {
 ...entityMutations({"list":"reviews","item":"review","key":"reviewId","mutation":"REVIEW","listMutation":"SET_REVIEWS"})
};
