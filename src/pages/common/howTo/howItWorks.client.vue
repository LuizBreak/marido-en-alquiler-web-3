<template>
  <!-- How it works-->
  <section class="container mb-5 pb-2 pb-lg-4">
    <div class="row gy-4">
      <div class="rounded-3 col-md-5 col-12">
        <img
          class="rounded-3 d-block mx-auto"
          src="../../../assets/img/gallery/2-male-plumber-and-female-customer-in-the-kitchen-EKTSSW7.jpg"
          alt="Illustration"
        />
      </div>
      <div class="col-lg-6 offset-lg-1 col-md-7 col-12">
        <h2 class="h3 mb-lg-5 mb-sm-4">Clientes: ¿Cómo funciona?</h2>
        <div class="steps steps-vertical">
          <div class="step active">
            <div class="step-progress"><span class="step-number">1</span></div>
            <div class="step-label ms-4">
              <h3 class="h5 mb-2 pb-1">Cuéntanos qué necesita tu hogar</h3>
              <p class="mb-0">
                Registra tu proyecto y describe en detalles que necesita ser
                hecho para que los contratistas puedan proveer un cotizacion
                precisa.
              </p>
            </div>
          </div>
          <div class="step active">
            <div class="step-progress"><span class="step-number">2</span></div>
            <div class="step-label ms-4">
              <h3 class="h5 mb-2 pb-1">Recibe las ofertas</h3>
              <p class="mb-0">
                Empieze a recebir ofertas de los contratistas interesados en tu
                proyecto. Chatea directamente con los contratistas interesados y
                discuta detalles del proyecto, costos y fechas de finalización
              </p>
            </div>
          </div>
          <div class="step active">
            <div class="step-progress"><span class="step-number">3</span></div>
            <div class="step-label ms-4">
              <h3 class="h5 mb-2 pb-1">Selecciona tu contratista preferido</h3>
              <p class="mb-0">
                Lea los comentarios, puntuación y fotos que fueron submitdas por
                otros clientes en proyectos anteriores realizados por cada uno
                de estos contratistas. Compare cotizaciones y contrate con
                confianza.
              </p>
            </div>
          </div>
        </div>
        <br />
        <router-link
          class="btn btn-lg btn-primary"
          to="#signup-modal"
          data-bs-toggle="modal"
        >
          Crear Registro<i class="fas fa-arrow-right ms-2"></i>
        </router-link>
      </div>
    </div>
  </section>

  <!-- Registrate Hoy -->
  <section class="container mb-5 pb-sm-3 pb-lg-4">
    <div class="bg-secondary rounded-3">
      <div
        class="col-md-11 col-12 offset-md-1 p-md-0 p-2 d-flex align-items-center justify-content-between"
      >
        <div class="me-md-5 py-md-5 px-md-0 p-4" style="max-width: 526px">
          <h2 class="mb-md-4 text-danger">
            Recebir un servicio de calidad<br />
            nunca fue tan facil!
          </h2>
          <p class="mb-4 pb-md-3 fs-lg">
            <strong>Deja de estar llamando para encontrar contratistas!</strong>
            <br />
            <br />
            Marido-en-alquiler te enviara perfiles de los contratistas
            directamente a tu bandeja de entrada. Tan solo tiene que registrar
            tu proyecto.
          </p>
          <router-link class="btn btn-lg btn-primary" to="/nuevoproyecto">
            Solicitar Servicio<i class="fi-plus me-2 ms-2"></i>
          </router-link>
        </div>
        <div class="col-4 d-md-block d-none align-self-left px-0">
          <img
            class="mt-3"
            width="350"
            alt="Cover image"
            src="../../../assets/img/gallery/handyman-no-bg.png"
          />
          <!-- src="../../../assets/img/illustrations/Build-your-home-amico-light-blue.png" -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as types from "../../../utils/types.js";
import { mapGetters } from "vuex";

export default {
  name: "how-it-works-client",
  components: {},
  emits: ["child-breadcrumbs-urls"],
  data() {
    return {
      urls: [
        { url: "/", caption: "Inicio", isActive: false, aria: "" },
        {
          url: "/comoclientes",
          caption: "Cómo funciona?",
          isActive: true,
          aria: "page",
        },
      ],
    };
  },
  methods: {},
  computed: {
    ...mapGetters([types.LOGGED_USER, types.IS_LOGGED_IN, "user"]),
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.logIt(
      this.loggedUser.id || "visitor",
      "visit: " + this.loggedUser?.email || "visitor",
      this.$options.name,
      this.user.signInUserSession?.idToken?.jwtToken,
      false
    );
  },
  mounted() {
    this.$emit("child-breadcrumbs-urls", this.urls);
  },
};
</script>
<style scoped></style>
