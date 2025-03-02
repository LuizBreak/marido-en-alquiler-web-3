<template>
  <!-- Font Awesome CDN for the page using <i> elements -->
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
    integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
    crossorigin="anonymous"
  />

  <section id="template">
    <div class="container mx-auto mt-4 pt-4">
      <!-- spacer to avoid pages to be under the navbar -->
      <app-breadcrumb v-show="true" :links="urls"></app-breadcrumb>
    </div>

    <PageLoadingSpinner />
    <Navbar />

    <router-view
      @trigger-msg-box="triggerMsgBoxCaller"
      @child-breadcrumbs-urls="setBreadcrumbs"
    >
    </router-view>

    <Footer />
    <MsgBoxModal />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "./components/layout/Navbar.vue";
import Breadcrumb from "./components/layout/breadcrump.vue";
import Footer from "./components/layout/footer";
import MsgBoxModal from "./components/ui/msgBoxModal.vue";
import PageLoadingSpinner from "./components/layout/pageloading.vue";
import { scrollFunction } from "./mixins/scrollToTop.js";
import { spinnerLoader } from "./mixins/spinnerControl.js";
// import SocketioService from "./services/socketio.service.js";

// import store from "./store/index.js";

/*
 *  triggers loading spinner while page is loading
 */
window.onload = function () {
  spinnerLoader();
};

/*
 *  When the user scrolls down 250px from the top of the document, show the button
 */
window.onscroll = function () {
  scrollFunction();
};
export default {
  name: "App",
  props: ["childUrls"],
  data() {
    return {
      urls: [],
    };
  },
  components: {
    PageLoadingSpinner,
    Navbar,
    "app-breadcrumb": Breadcrumb,
    Footer,
    MsgBoxModal,
  },
  methods: {
    setBreadcrumbs: function (childUrls) {
      this.urls = childUrls;
    },
    triggerMsgBoxCaller: function (showItFlag, message) {
      // TODO: We need to remove all the msgbox emits in the entire
      //       project and replace with the store.msgBox approach
      this.triggerMsgBox(showItFlag, message);
    },
  },
  computed: {
    ...mapGetters(["loggedUser"]),
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  created() {
    // SocketioService.setupSocketConnection();
  },
  beforeUnmount() {
    // SocketioService.disconnect();
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace("/");
        ``;
      }
    },
  },
  // It does not seem to be working to upload resources
  // mounted() {
  //   // https://stackoverflow.com/questions/48426972/importing-javascript-file-for-use-within-vue-component
  //   const plugin = document.createElement("script");
  //   plugin.setAttribute(
  //     "src",
  //     "./vendor/tiny-slider/dist/tiny-slider.js"
  //   );
  //   plugin.async = true;
  //   document.head.appendChild(plugin);
  // }
};
</script>

<style>
/*  Data Entry Forms  Settup */
.quick-contact-form {
  padding: 50px;
  border-radius: 7px;
  background-color: white;
  -webkit-box-shadow: 0 5px 20px -5px rgba(0, 0, 0, 0.5);
  box-shadow: 0 5px 20px -5px rgba(0, 0, 0, 0.5);
}

/* <!-- Page loading styles--> */
.page-loading {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-transition: all 0.4s 0.2s ease-in-out;
  transition: all 0.4s 0.2s ease-in-out;
  background-color: #fff;
  opacity: 0;
  visibility: hidden;
  z-index: 9999;
}
.page-loading.active {
  opacity: 1;
  visibility: visible;
}
.page-loading-inner {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: opacity 0.2s ease-in-out;
  transition: opacity 0.2s ease-in-out;
  opacity: 0;
}
.page-loading.active > .page-loading-inner {
  opacity: 1;
}
.page-loading-inner > span {
  display: block;
  font-size: 1rem;
  font-weight: normal;
  color: #666276;
}
.page-spinner {
  display: inline-block;
  width: 2.75rem;
  height: 2.75rem;
  margin-bottom: 0.75rem;
  vertical-align: text-bottom;
  border: 0.15em solid #bbb7c5;
  border-right-color: transparent;
  border-radius: 50%;
  -webkit-animation: spinner 0.75s linear infinite;
  animation: spinner 0.75s linear infinite;
}
@-webkit-keyframes spinner {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes spinner {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

section {
  background-image: url("./assets/img/gallery/bg.png");
  /* background-color:hsla(40,100%,50%,0.1); */
  background-position: relative;
  background-repeat: repeat-y;
  background-size: cover;
}
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#fff7e7),
    to(#fff1dc)
  );
  background-image: -o-linear-gradient(top, #fff7e7 0%, #fff1dc 100%);
  background-image: linear-gradient(180deg, #fff7e7 0%, #fff1dc 100%);
}

div {
  /* For Debug Only  */
  /* border-style: solid; */
  /* width: 400px; */
  /* background-color:hsla(40,100%,50%,0.1); */
}
.error-msg {
  text-align: right;
}
</style>
