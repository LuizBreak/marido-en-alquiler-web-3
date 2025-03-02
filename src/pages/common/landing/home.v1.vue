<template>
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
            class="col-md-75 col-xl-6 col-xxl-5 text-md-start text-center px-5 py-1"
          >
            <!-- <h1 class="fw-bolder fs-6 fs-xxl-7 mb-2">Buscamos Profesionales como Usted</h1> -->
            <p class="fs-1 mb-2 text-dark fw-normal">
              Buscamos Profesionales como Usted
            </p>
            <h1 class="fw-normal fs-6 fs-xxl-7">
              Nuestra plataforma recibe cientos de solicitudes para servicios
              generales desde nuestros clientes.<br />Únete a nuestro equipo y
              empieza a recebirlas ya.
            </h1>
            <!-- href="#pro-registration" -->
            <!-- <a
              class="btn btn-primary me-2"
              href="#signin-modal"
              data-bs-toggle="modal"
              role="button"
            >
              Regístrate Hoy<i class="fas fa-arrow-right ms-2"></i
            ></a> -->
            <router-link class="btn btn-primary me-2" to="/comocontratistas">
              Regístrate Hoy<i class="fas fa-arrow-right ms-2"></i>
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

<style scoped></style>
