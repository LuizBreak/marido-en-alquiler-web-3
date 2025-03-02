<template>
  <!-- How it works-->
  <section class="container mb-5 pb-2 pb-lg-4">
    <div class="row gy-4">
      <div class="col-md-5 col-12">
        <img
          class="d-block mx-auto"
          src="../../../img/real-estate/illustrations/find.svg"
          alt="Illustration"
        />
      </div>
      <div class="col-lg-6 offset-lg-1 col-md-7 col-12">
        <h2 class="h3 mb-lg-5 mb-sm-4">Contratistas: ¿Cómo funciona?</h2>
        <div class="steps steps-vertical">
          <div class="step active">
            <div class="step-progress"><span class="step-number">1</span></div>
            <div class="step-label ms-4">
              <h3 class="h5 mb-2 pb-1">Seleccione un proyecto</h3>
              <p class="mb-0">
                Visita el listado de proyectos disponibles, lea los detalles del
                proyecto y seleccione lo que te conviene.
              </p>
            </div>
          </div>
          <div class="step active">
            <div class="step-progress"><span class="step-number">2</span></div>
            <div class="step-label ms-4">
              <h3 class="h5 mb-2 pb-1">Presente la cotización</h3>
              <p class="mb-0">
                Entre en contacto con el cliente para explicarle la
                justificación de tu precio y tu plan de trabajo. Ofrece tu mejor
                cotización.
              </p>
            </div>
          </div>
          <div class="step active">
            <div class="step-progress"><span class="step-number">3</span></div>
            <div class="step-label ms-4">
              <h3 class="h5 mb-2 pb-1">
                Entregue el proyecto y recibe el pago
              </h3>
              <p class="mb-0">
                Entregue el proyecto de acuerdo con el alcance y calidad
                esperada. Así que recibes el visto bueno del cliente, te
                enviamos tu pago por la plataforma.
              </p>
            </div>
          </div>
        </div>
        <br />
        <!-- to="/#pro-registration" -->
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

  <!-- Select a Project -->
  <section class="container mb-5 pb-sm-3 pb-lg-4">
    <div class="bg-secondary rounded-3">
      <div
        class="col-md-11 col-12 offset-md-1 p-md-0 p-2 d-flex align-items-center justify-content-between"
      >
        <div class="me-md-5 py-md-5 px-md-0 p-4" style="max-width: 526px">
          <h2 class="mb-md-4 text-danger">Nuevos Proyectos todos Los dias!</h2>
          <p class="mb-4 pb-md-3 fs-lg">
            Esté atento a lista de proyectos y a tu bandeja de entrada.
            Diariamente, nuestra plataforma te enviará notificaciones de los
            nuevos proyectos publicados por nuestros clientes que estarán
            esperando por cotización de los contratistas.
          </p>

          <router-link class="btn btn-lg btn-primary" to="/projectlist">
            Seleccionar proyecto <i class="fi-search me-2"></i>
          </router-link>
        </div>
        <div class="col-4 d-md-block d-none align-self-end px-0">
          <img
            class="mt-n5"
            src="../../../assets/img/gallery/marido-logo-no-bg.png"
            width="406"
            alt="Cover image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import * as types from "../../../utils/types.js";
import { mapGetters } from "vuex";

export default {
  name: "how-it-works-contractor",
  props: ["name"],
  components: {},
  data() {
    return {
      urls: [
        { url: "/", caption: "Inicio", isActive: false, aria: "" },
        {
          url: "/comocontratistas",
          caption: "¿Cómo funciona?",
          isActive: true,
          aria: "page",
        },
      ],
    };
  },
  methods: {},
  computed: {
    ...mapGetters([
      types.LOGGED_USER,
      types.IS_LOGGED_IN,
      "IsClient",
      "isContractor",
      "user",
      "userId",
      "isDevelopmentEnvir",
    ]),
  },
  created() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.logIt(
      this?.loggedUser?.id || "visitor",
      "visit: " + this?.loggedUser?.email,
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
