<template>
  <!-- <NavAppBar /> -->
  <SiteHome />
  <why-us />
  <!-- <ProRegistration /> -->
  <Services />
  <Reviews />
  <!-- <Booking /> -->
  <AcercaDe />
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
  emits: ["child-breadcrumbs-urls"],
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
  mounted() {
    this.$emit("child-breadcrumbs-urls", []);
  },
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
