<template>
  <section id="template">
    <div class="container text-center">
      <h1>Comenta</h1>
      <h3>Pagina en Construcción</h3>
      <div class="col-lg-12offset-lg-2 order-lg-2 order-1">
        <div class="ratio ratio-1x1 mx-auto" style="max-width: 40%">
          <!-- <lottie-player class="py-4" src="../assets/json/animation-car-finder-404.json" background="transparent" speed="1" loop autoplay></lottie-player> -->
          <!-- <img class="pt-7 pt-md-0 w-70" src="../../img/real-estate/404-Error-Page-not-Found-with-people-connecting-a-plug-amico.png" width="30%" alt="hero-header" /> -->
          <img :src="backgroundImage" alt="hero-header" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "comenta",
  components: {},
  data() {
    return {
      urls: [
        { url: "/", caption: "Inicio", isActive: false, aria: "" },
        {
          url: "/comenta",
          caption: "Comenta",
          isActive: true,
          aria: "page",
        },
      ],
      backgroundImage: `${require("../../../assets/img/illustrations/under-construction-pana.png")}`,
    };
  },
  methods: {},
  computed: {},
  created() {},
  mounted() {
    this.$emit("child-breadcrumbs-urls", this.urls);
  },
};
</script>

<style scoped></style>
