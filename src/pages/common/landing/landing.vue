<template>
  <!-- <NavAppBar /> -->
  <SiteHome />
  <why-us />
  <!-- <ProRegistration @trigger-msg-box="triggerMsgBox" /> -->
  <Services />
  <Reviews />
  <!-- <Booking @trigger-msg-box="triggerMsgBox"/> -->
  <AcercaDe @trigger-msg-box="triggerMsgBox" />
  <MsgBoxModal />
  <!-- <Footer / -->
</template>

<script>
// import NavAppBar from './Navbar.vue';
import SiteHome from "./home.vue";
// import ProRegistration from "./proRegistration";
import Services from "./services";
import Reviews from "./reviews";
// import Booking  from './booking';
import AcercaDe from "./acercaDe";
// import Footer from './footer';
import WhyUs from "./whyus.vue";

export default {
  emits: ["trigger-msg-box"],
  data() {
    return {};
  },
  components: {
    SiteHome,
    // ProRegistration,
    Services,
    Reviews,
    // Booking,
    AcercaDe,
    WhyUs,
  },
  methods: {
    triggerMsgBox: function (showIt, message) {
      console.log("landing issue the msg: " + message);
      this.$emit("trigger-msg-box", showIt, message);
    },
  },
  mounted() {},
};
</script>

<style>
.quick-contact-form {
  padding: 10px;
  border-radius: 7px;
  background-color: white;
  -webkit-box-shadow: 0 5px 20px -5px rgba(0, 0, 0, 0.5);
  box-shadow: 0 5px 20px -5px rgba(0, 0, 0, 0.5);
}
</style>
