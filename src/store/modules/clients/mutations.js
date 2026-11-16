import { entityMutations } from "../../entity-state";
export default {
 ...entityMutations({"list":"clients","item":"client","key":"id","mutation":"CLIENT","listMutation":"SET_CLIENTS"})
};
