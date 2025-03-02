import { createStore, createLogger } from "vuex";

import contactusModule from "./modules/contactus/index.js";
import clientsModule from "./modules/clients/index.js";
import reviewModule from "./modules/reviews/index.js";
import contractorsModule from "./modules/contractors/index.js";
import favoritesModule from "./modules/favorites/index.js";
import payMethodModule from "./modules/payMethods/index.js";
import logTrailModule from "./modules/logTrail/index.js";
import quoteModule from "./modules/quotes/index.js";
import messageModule from "./modules/messages/index.js";

import authModule from "./modules/auth/index";
import subStoreModule from "./modules/genericApiSvc/store";
// import dispatchActionForAllModules from "../utils/dispatch-action-for-all-modules";
import chatModule from "./modules/chat/index.js";

const debug = process.env.NODE_ENV !== "production";

const store = createStore({
  modules: {
    contactus: contactusModule,
    clients: clientsModule,
    reviews: reviewModule,
    contractors: contractorsModule,
    auth: authModule,
    subStore: subStoreModule,
    favorites: favoritesModule,
    payMethods: payMethodModule,
    logTrail: logTrailModule,
    quotes: quoteModule,
    messages: messageModule,
    chat: chatModule,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state() {
    return {
      envir: process.env.VUE_APP_ENV || "development",
      apiMode: process.env.VUE_APP_API_MODE || "serverless",
      showIt: false,
      title: "",
      modalMessage: "",
      emailContainer: {},
    };
  },
  getters: {
    emailContainer: (state) => state.emailContainer,
    modalMessage: (state) => state.modalMessage,
    apiMode: (state) => state.apiMode,
    isDevelopmentEnvir(state) {
      return state.envir === "development" ? true : false;
    },
    showIt: (state) => state.showIt,
  },
  actions: {
    triggerMsgBox({ commit }, modalItems) {
      // console.log("msgbox issued by store", modalItems);
      commit("setShowIt", modalItems.showIt);
      commit("setMsgBoxMessage", modalItems.message);
    },
    async setEmailAttributes({ commit }, payload) {
      await commit("setEmailAttributes", payload);
    },
    resetShowIt({ commit }) {
      commit("setShowIt", false);
    },
  },
  mutations: {
    setShowIt: (state, showIt) => {
      // hard reset it first to avoid
      // any previously open modal
      state.showIt = false;
      state.showIt = showIt;
    },
    setMsgBoxMessage: (state, message) => {
      state.modalMessage = message;
    },
    setEmailAttributes: (state, payload) => {
      state.emailContainer = payload;
      console.log("setEmailAttributes", payload);
    },
  },
});

export default store;

// TODO: to be implemented to triggers all Init function for all modules
//       Video Reference: https://youtu.be/dGlTmR5DzP8?t=764
// dispatchActionForAllModules("init");

// Application Environment Variables Dashboard for development only
if (process.env.VUE_APP_ENV === "development") {
  let msg = `%c Hi 👋! Welcome to Marido-en-Aquiler Website`;
  let styles = [
    `font-size: 12px`,
    `font-family: monospace`,
    `background: white`,
    `display: inline-block`,
    `color: red`,
    `padding: 8px 19px`,
    `border: 1px dashed;`,
  ].join(`;`);
  console.log(msg, styles);
  console.table("Store Information:", store);
  console.log("Env Variables:", process.env);
  console.log(`%c ***            End of Dashboard           ***`, styles);

  // TODO: Still having issues to trigger initStore
  //       more investigation why it does not find
  //       auth/initSore

  // const storeModules = store._modules.root._children;
  // console.log(storeModules);

  // for (const moduleName of Object.keys(storeModules)) {
  //   const moduleDefinition = storeModules[moduleName];
  //   console.log("Module Name:", moduleName);
  //   console.log("Module Definition", moduleDefinition);
  //   console.log(moduleDefinition._rawModule.actions.initStore || "n/a");
  //   if (
  //     moduleDefinition._rawModule.actions &&
  //     moduleDefinition._rawModule.actions.initStore
  //   ) {
  //     console.log("dispatching IniStore for ", moduleName);
  //     store.dispatch(`${moduleName}/initSore`);
  //   }
  // }
}

console.log("Trying logging in from StoreInit using cached user info.");
store.dispatch("tryLogin");
