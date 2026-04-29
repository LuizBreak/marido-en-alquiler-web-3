<template>
  <!-- Home -->
  <section class="py-xxl-10 pb-0" id="home">
    <!-- <div class="bg-holder bg-size" style="background-image:url(src/assets/img/gallery/hero-header-bg.png);background-position:top center;background-size:cover;"> -->
    <div class="bg-holder bg-size" v-bind:style="backgroundImage">
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
            class="col-md-75 col-xl-6 col-xxl-5 text-md-start text-center px-5 py-1 mb-5"
          >
            <!-- <h1 class="fw-bolder fs-6 fs-xxl-7 mb-2">Buscamos Profesionales como Usted</h1> -->
            <p class="fs-1 mb-4 text-dark fw-normal">
              Realiza los
              <span class="text-primary">arreglos</span> de tu casa de forma
              simple, rápida y segura
            </p>
            <h1 class="fw-normal fs-6 fs-xxl-7 mb-4">
              Publica detalles de tu proyecto, recibe ofertas de contratistas
              interesados o utiliza nuestro buscador para encontrarlos.
            </h1>

            <router-link
              class="btn btn-primary btn-sm ms-2 order-lg-3"
              to="/busqueda"
            >
              <span class="d-none d-sm-inline">Buscar Contratistas</span
              ><i class="fas fa-search ms-2"></i>
            </router-link>
            <span class="d-none d-sm-inline opacity-10">space</span>

            <!-- TODO: Why the css outline revert to solid color when using #modal? -->

            <router-link
              class="btn btn-outline-info btn-sm ms-2 order-lg-3"
              to="#signup-modal"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
            >
              <span class="d-none d-sm-inline">Soy Contratista </span
              ><i class="fi-edit me-2"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SiteHome",
  data() {
    return {
      backgroundImage:
        `background-image:url(${require("../../../assets/img/gallery/hero-header-bg.png")})` +
        ";background-position:top;background-size:cover",
    };
  },
};
</script>

<style scoped>
.btn-outline-info1 {
  color: #3c76f2;
  border-color: #3c76f2;
}
.btn-outline-info1:hover {
  color: #000;
  background-color: #3c76f2;
  border-color: #3c76f2;
}
</style>
