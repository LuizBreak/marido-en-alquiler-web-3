import { entityMutations } from "../../entity-state";
export default {
 ...entityMutations({"list":"paymethods","item":"paymethod","key":"payMethodId","mutation":"PAYMETHOD","listMutation":"SET_PAYMETHODS"})
};
