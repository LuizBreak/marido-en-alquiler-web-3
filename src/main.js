import { createApp, h } from "vue";
import App from "./App.vue";

import router from "./router.js";
import store, { authBootstrap } from "./store/index.js";
import { installSessionListeners } from "./services/session-events";
installSessionListeners(store, window);
// import { socket } from "./services/simpleSocket.service.js";

import sysLogger from "./mixins/sysLogger.js";
import DateFormatter from "./mixins/dateFormatter.js";
import DismissModal from "./mixins/dissmissModal.js";
import msgBoxDialog from "./mixins/msgBoxDialog.js";

import BaseBadge from "./components/ui/BaseBadge.vue";
import BaseDialog from "./components/ui/BaseDialog.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";

// Styling for the entire application
import "./css/theme.min.css";

// Imported with no error and place them in webpack/./node_modules
// Article Reference: https://academind.com/tutorials/vue-q-a#how-to-integrate-3rd-party-css-and-js-libraries

// import "../node_modules/tiny-slider/dist/tiny-slider";
// import "../node_modules/tiny-slider/dist/tiny-slider.css";
import "../node_modules/simplebar/dist/simplebar.min.css";
// Use the same modular instances as programmatic dialogs; a second bundle
// registers duplicate data-API handlers and leaves body scrolling locked.
import "bootstrap/js/dist/alert";
import "bootstrap/js/dist/button";
import "bootstrap/js/dist/carousel";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/offcanvas";
import "bootstrap/js/dist/popover";
import "bootstrap/js/dist/scrollspy";
import "bootstrap/js/dist/tab";
import "bootstrap/js/dist/toast";
import "bootstrap/js/dist/tooltip";
import { cleanupModalArtifacts } from "./services/modal-state";
import "../node_modules/smooth-scroll/dist/smooth-scroll.polyfills.min.js";
// import "../node_modules/@lottiefiles/lottie-player/dist/lottie-player.js";
import "../node_modules/leaflet/dist/leaflet.js";
import "../node_modules/jarallax/dist/jarallax.min.js";

import AmplifyVue from "@aws-amplify/ui-vue";
import VueSocialSharing from "vue-social-sharing";



// import "../node_modules/flatpickr/dist/flatpickr.min.css";
// import "../node_modules/flatpickr/dist/flatpickr.min.js";

// TODO: Implement it:
// const debug = process.env.NODE_ENV !== 'production'

const app = createApp({
  render: () => h(App),
});

// app.config.globalProperties.$socket = socket;

app.use(router);
app.use(store);
app.use(AmplifyVue);
app.use(VueSocialSharing);

// https://github.com/viktorlarsson/vue-tiny-slider
// import VueTinySlider from 'vue-tiny-slider';
// app.component('vue-tiny-slider', VueTinySlider);

// https://github.com/ganlanyuan/tiny-slider
import { tns } from "../node_modules/tiny-slider/dist/tiny-slider";
app.component("tiny-slider", tns);
import "../node_modules/tiny-slider/dist/tiny-slider.css";

app.component("base-badge", BaseBadge);
app.component("base-spinner", BaseSpinner);
app.component("base-dialog", BaseDialog);

// TODO: fix it and implement it
//       Article Reference: https://www.youtube.com/watch?v=8KwZNn56F78&t=629s
//       Source Code: https://github.com/Jebasuthan/Vue-Facebook-Google-oAuth
//
// import GoogleAuth from "./services/google.oAuth.service";
// const gauthOption = {
//   clientId: process.env.VUE_APP_GOOGLE_APP_ID;
//   scope: "profile email",
//   prompt: "select_account",
// };
// app.use(GoogleAuth, gauthOption);
app.config.productionTip = false;

app.mixin(sysLogger);
app.mixin(DateFormatter);
app.mixin(DismissModal);
app.mixin(msgBoxDialog);

authBootstrap.finally(() => {
  app.mount("#app");
  cleanupModalArtifacts();
});
