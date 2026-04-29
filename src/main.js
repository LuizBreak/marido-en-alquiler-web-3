import { createApp, h } from "vue";
import App from "./App.vue";

import router from "./router.js";
import store, { authBootstrap } from "./store/index.js";
// import { socket } from "./services/simpleSocket.service.js";

import sysLogger from "./mixins/sysLogger.js";
import DateFormatter from "./mixins/dateFormatter.js";
import DismissModal from "./mixins/dissmissModal.js";
import msgBoxDialog from "./mixins/msgBoxDialog.js";

import BaseBadge from "./components/ui/BaseBadge.vue";
import BaseDialog from "./components/ui/BaseBadge.vue";
import BaseSpinner from "./components/ui/BaseSpinner.vue";

// Styling for the entire application
import "./css/theme.min.css";

// Imported with no error and place them in webpack/./node_modules
// Article Reference: https://academind.com/tutorials/vue-q-a#how-to-integrate-3rd-party-css-and-js-libraries

// import "../node_modules/tiny-slider/dist/tiny-slider";
// import "../node_modules/tiny-slider/dist/tiny-slider.css";
import "../node_modules/simplebar/dist/simplebar.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/smooth-scroll/dist/smooth-scroll.polyfills.min.js";
// import "../node_modules/@lottiefiles/lottie-player/dist/lottie-player.js";
import "../node_modules/leaflet/dist/leaflet.js";
import "../node_modules/jarallax/dist/jarallax.min.js";

import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import AmplifyVue from "@aws-amplify/ui-vue";
import VueSocialSharing from "vue-social-sharing";

Amplify.configure(awsExports);

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
});
