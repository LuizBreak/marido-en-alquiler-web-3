import { entityMutations } from "../../entity-state";
export default {
 ...entityMutations({"list":"quotes","item":"quote","key":"quoteId","mutation":"QUOTE","listMutation":"SET_QUOTES"})
};
