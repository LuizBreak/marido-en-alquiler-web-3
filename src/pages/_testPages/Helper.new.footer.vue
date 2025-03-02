<template>
  <section id="template">
    <!-- Footer-->
    <footer class="footer pt-lg-5 pt-4 bg-dark text-light">
      <div class="container mb-0 py-4 pb-lg-0">
        <div class="row gy-4">
          <!-- Hero section -->

          <div class="col-lg-2 col-md-6 col-sm-4">
            <div class="mb-4 pb-sm-3">
              <!-- Back to the top button -->
              <a class="btn-scroll-top show" href="#top" data-scroll=""
                ><span class="btn-scroll-top-tooltip text-muted fs-sm me-2"
                  >Top</span
                ><i class="btn-scroll-top-icon fi-chevron-up"> </i
              ></a>

              <a class="d-inline-block mb-4" href="real-estate-home.html">
                <img
                  src="../../assets/img/gallery/marido-logo-no-bg.png"
                  width="116"
                  alt="logo"
              /></a>
              <p class="text-500 my-0">
                <span style="color: #f95c19"><strong>Marido</strong></span
                ><span style="color: white"
                  >-en-alquiler<br />
                  Te lo resolvemos todo.</span
                >
              </p>
              <div class="pt-2">
                <a
                  class="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle me-2 mb-2"
                  href="#"
                  ><i class="fi-facebook"></i></a
                ><a
                  class="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle me-2 mb-2"
                  href="https://www.instagram.com/conch__app/"
                  target="_blank"
                  ><i class="fi-instagram"></i></a
                ><a
                  class="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle me-2 mb-2"
                  href="https://wa.me/+18098930330"
                  target="_blank"
                  ><i class="fi-whatsapp"></i>
                </a>
                <a
                  class="btn btn-icon btn-light-primary btn-xs shadow-sm rounded-circle me-2 mb-2"
                  href="https://www.youtube.com/channel/UCzWIkivSVgOqPYMsOu7pIww"
                  target="_blank"
                  ><i class="fi-youtube"></i
                ></a>
              </div>
            </div>
          </div>

          <!-- Links-->
          <div class="col-lg-2 col-md-3 col-sm-4 px-4 px-4 offset-lg-1">
            <h5 class="lh-lg fw-bold mb-4 text-light font-sans-serif">
              Enlances
            </h5>
            <ul class="list-unstyled mb-md-4 mb-lg-0">
              <li class="lh-lg"><a class="text-500" href="/#top">Inicio</a></li>
              <li class="lh-lg">
                <a class="text-500" href="/#acercade">Acerca de</a>
              </li>
              <li class="lh-lg">
                <a class="text-500" href="/#servicios">Servicios</a>
              </li>
              <li class="lh-lg">
                <a class="text-500" href="/#herramientas">Las Herramientas</a>
              </li>
            </ul>
          </div>
          <!-- Links-->
          <div class="col-lg-3 col-md-3 col-sm-4">
            <h5 class="lh-lg fw-bold text-light mb-4 font-sans-serif">
              Contáctanos
            </h5>
            <ul class="list-unstyled mb-md-4 mb-lg-0">
              <li class="lh-lg">
                <i class="far fa-handshake text-warning me-3"></i>
                <router-link to="/contactus">
                  <a class="text-500">Acuerdo Corporativo</a>
                </router-link>
              </li>
              <li class="lh-lg">
                <i class="fas fa-bullhorn text-warning me-3"></i>
                <router-link to="/contactus">
                  <a class="text-500">Buzón de Sugerencias</a>
                </router-link>
              </li>
              <li class="lh-lg">
                <i class="far fa-envelope text-warning me-3"> </i
                ><a class="text-500" href="mailto:hello@target-innovations.com"
                  >hello@target-innovations.com</a
                >
              </li>
              <li class="lh-lg">
                <i class="fas fa-map-marker-alt text-warning me-3"></i
                ><a class="text-500" href="#!">Santo Domingo, DN</a>
              </li>
            </ul>
          </div>
          <!-- Subscription form-->
          <div class="col-lg-4">
            <h3 class="h4 text-light">Subscribe to our newsletter</h3>
            <p class="fs-sm mb-4 opacity-60 font-sans-serif">
              Don’t miss any relevant vacancies!
            </p>
            <form
              class="form-group form-group rounded-pill"
              style="max-width: 500px"
            >
              <div class="input-group input-group-sm">
                <span class="input-group-text text-muted"
                  ><i class="fi-mail"></i
                ></span>
                <input
                  class="form-control"
                  type="email"
                  placeholder="Your email"
                />
              </div>
              <button class="btn btn-primary btn-sm rounded-pill" type="button">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
    <section class="py-0 bg-1000">
      <div class="container">
        <div class="row justify-content-md-between justify-content-evenly py-0">
          <div
            class="col-12 col-sm-8 col-md-6 col-lg-auto text-center text-md-start"
          >
            <p class="fs--1 my-2 fw-bold text-200">
              All rights Reserved ©
              <a
                class="text-500"
                href="https://www.target-innovations.com"
                target="_blank"
                >Target Innovations</a
              >
            </p>
          </div>
          <div class="col-12 col-sm-8 col-md-6">
            <p class="fs--1 my-2 text-center text-md-end text-200">
              Made with&nbsp;
              <svg
                class="bi bi-suit-heart-fill"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="#F95C19"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"
                ></path></svg
              >&nbsp;by&nbsp;<a
                class="fw-bold text-primary"
                href="https://createx.studio/"
                target="_blank"
                >Createx Studio
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: "bid-email-template",
  props: ["projectId", "projectTitle"],
  components: {},
  data() {
    return {};
  },
  methods: {},
  computed: {
    contractor: {
      get() {
        return { ...this.$store.getters["contractors/contractor"] };
      },
    },
    emailContainer() {
      return this.$store.getters["emailContainer"];
    },
  },
  mounted() {},
};
</script>
<style scoped></style>
