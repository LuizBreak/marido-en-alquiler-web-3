import { entityMutations, asList } from "../../entity-state";
export default {
 ...entityMutations({"list":"messages","item":"message","key":"messageId","mutation":"MESSAGE","listMutation":"SET_MESSAGES"}),
 SET_CONTACT_LIST(state, contacts) { state.contactList = asList(contacts); },
 SET_MYSELF(state, myself) { state.myself = myself; }
};
