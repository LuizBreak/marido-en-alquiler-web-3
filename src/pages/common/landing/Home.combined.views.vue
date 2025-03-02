<template>
  <!-- Home -->
  <section class="py-xxl-10 pb-0" id="home">
    <!-- <div class="bg-holder bg-size" style="background-image:url(src/assets/img/gallery/hero-header-bg.png);background-position:top center;background-size:cover;"> -->
    <div class="bg-holder bg-size" v-bind:style="backgroundImage3">
      <div class="container">
        <div class="row align-items-center">
          <div
            class="col-md-5 col-xl-6 col-xxl-7 order-0 order-md-1 text-center"
          >
            <img
              class="pt-7 pt-md-0 w-75"
              src="../../../assets/img/illustrations/marido-logo-612x612-no-bg.png"
              width="70%"
              alt="hero-header"
            />
          </div>
          <div
            class="col-md-75 col-xl-6 col-xxl-5 text-md-start text-center px-5 py-1"
          >
            <!-- <h1 class="fw-bolder fs-6 fs-xxl-7 mb-2">Buscamos Profesionales como Usted</h1> -->
            <p class="fs-1 mb-4 text-dark fw-normal">
              Realiza los <span class="text-primary">arreglos</span> de tu casa
              de forma simple, rápida y segura
            </p>
            <h1 class="fw-normal fs-6 fs-xxl-7 mb-4">
              Publica detalles de tus proyecto, recibe ofertas de contratistas
              interesados o utiliza nuestro buscador para encontrarlos.
            </h1>

            <router-link class="btn btn-primary me-2" to="/busqueda">
              Busco Contratistas<i class="fas fa-search ms-2"></i>
            </router-link>
            <router-link class="btn btn-outline-danger" to="/comocontratistas">
              Soy Contratista <i class="fi-edit"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
// import VueHelper from '@/components/VueHelper.vue'
import * as types from "../../../utils/types.js";

export default {
  name: "Helper",
  components: {
    // VueHelper
  },
  data() {
    return {
      authorName: this.$store.state.auth.authorName,
      date: null,
      filters: {},
      backgroundImage3:
        `background-image:url(${require("../../../assets/img/gallery/hero-header-bg.png")})` +
        ";background-position:top;background-size:cover",
    };
  },
  methods: {
    triggerMsgBox: function () {
      console.log("helper.triggering msgbox");
      this.$store.dispatch("triggerMsgBox", {
        showIt: false,
        message: "Registro realizado con éxito.",
      });
      this.$store.dispatch("triggerMsgBox", {
        showIt: true,
        message: "Registro realizado con éxito.",
      });
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    serviceFilter(typeService) {
      return { name: "busqueda", query: { type: typeService } };
    },
  },
  computed: {
    services() {
      return types.SERVICE_TYPES;
    },
  },
};
</script>

<style scoped>
img {
  width: 42px;
}

.imgBox:hover {
  -moz-box-shadow: 0 0 10px #fd5631;
  -webkit-box-shadow: 0 0 10px #fd5631;
  box-shadow: 0 0 10px #fd5631;
  border-radius: 25%;
}
</style>
