<template>
  <section class="container mt-n3 mt-md-0 mb-5 pb-3 pb-lg-4">
    <div>
      <div class="row">
        <div class="col-lg-7 col-md-5 mb-md-0 mb-3">
          <div class="position-relative pe-lg-5">
            <div
              class="position-absolute left-0 w-100 text-right d-md-block image-container"
              v-if="false"
            >
              <img
                alt="logo"
                src="../../../assets/img/gallery/marido-logo-no-bg.png"
                width="316"
              />
            </div>
            <img
              class="rounded-3 d-block mx-auto"
              src="../../../../src/img/real-estate/catalog/5-things-contractors-can-do-to-improve-client-communication.jpg"
              alt="Illustration"
            />
          </div>
        </div>
        <div class="col-lg-5 col-md-7">
          <div class="card h-100 card-span p-3">
            <div class="card-body">
              <h2 class="mb-5">
                ¿Por que
                <span class="text-primary">Marido</span>-en-alquiler?
              </h2>

              <!-- carrousel items  -->
              <div
                class="carousel slide pt-6 pb-5"
                id="myCarousel"
                data-bs-ride="carousel"
              >
                <div class="carousel-inner">
                  <div class="carousel-item active" data-bs-interval="5000">
                    <div class="row h-100">
                      <div class="col-md-12 mb-3 mb-md-0">
                        <div
                          class="d-sm-flex align-items-center justify-content-between pb-1"
                        >
                          <h5 class="h4 mb-0">
                            <i
                              class="fi-search expand text-primary"
                              aria-hidden="true"
                            />
                            Canal buscador
                          </h5>
                        </div>
                        <p class="card-text pt-3">
                          Nuestro canal de búsqueda brinda a los clientes la
                          facilidad de filtrar contratistas según sus oficios
                          técnicos e sus puntuaciones.
                        </p>
                        <div
                          class="d-sm-flex align-items-center justify-content-between pb-1"
                        >
                          <h5 class="h4 mb-0">
                            <i
                              class="fi-cup expand text-primary"
                              aria-hidden="true"
                            />
                            Simpleza
                          </h5>
                        </div>
                        <p class="card-text pt-3">
                          Nuestra pagina es intuitiva y fácil de usar, permite a
                          clientes publicar fotos de los detalles de su proyecto
                          para recibir ofertas de diferentes contratistas.
                          <br />
                          <br />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="carousel-item" data-bs-interval="5000">
                    <div class="row h-100">
                      <div class="col-md-12 mb-3 mb-md-0">
                        <div
                          class="d-sm-flex align-items-center justify-content-between pb-1"
                        >
                          <h5 class="h4 mb-0">
                            <i
                              class="fi-heart expand text-primary"
                              aria-hidden="true"
                            />
                            Calificación y comentarios
                          </h5>
                        </div>
                        <p class="card-text pt-3">
                          Los clientes pueden consultar la cantidad de estrellas
                          recibidas por los contratistas en proyectos anteriores
                          e incluso leer los comentarios que otros clientes
                          dijeron sobre ellos.
                        </p>
                        <div
                          class="d-sm-flex align-items-center justify-content-between pb-1"
                        >
                          <h5 class="h4 mb-0">
                            <i
                              class="fi-cash expand text-primary"
                              aria-hidden="true"
                            />
                            Protección de pago
                          </h5>
                        </div>
                        <p class="card-text pt-3">
                          Nuestro sistema de pagos brinda tranquilidad , ya que
                          los contratista solo serán pagos al terminar el
                          trabajo y cliente este satisfecho y aprobado el
                          proyecto.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="carousel-item" data-bs-interval="5000">
                    <div class="row h-100">
                      <div class="col-md-12 mb-3 mb-md-0">
                        <div
                          class="d-sm-flex align-items-center justify-content-between pb-1"
                        >
                          <h5 class="h4 mb-0">
                            <i
                              class="fi-user-check expand text-primary"
                              aria-hidden="true"
                            />
                            Perfil detallado de los contratistas
                          </h5>
                        </div>
                        <p class="card-text pt-3">
                          En cada se ofrece informacion sobre el contratista,
                          como su nombre , logo, si esta certificado por la
                          Plataforma, listado de servicios prestados, numeros de
                          estrellas y comentarios realizados por clientes
                          anteriores y su ubicacion
                        </p>
                        <div
                          class="d-sm-flex align-items-center justify-content-between pb-1"
                        >
                          <h5 class="h4 mb-0">
                            <i
                              class="fi-house-chosen expand text-primary"
                              aria-hidden="true"
                            />
                            Nuevos proyetos todos los dias
                          </h5>
                        </div>
                        <p class="card-text pt-3">
                          Clients crean nuesvos proyectos todos los dias para
                          satisfazer nuevas necesidades de arreglos en sus
                          hogares al diario
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- carrousel indicator  -->
                <ol class="carousel-indicators">
                  <li
                    data-bs-target="#myCarousel"
                    data-bs-slide-to="0"
                    class="active"
                  ></li>
                  <li data-bs-target="#myCarousel" data-bs-slide-to="1"></li>
                  <li data-bs-target="#myCarousel" data-bs-slide-to="2"></li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "why-us",
  components: {},
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style scoped>
.carousel-indicators [data-bs-target] {
  background-color: #3f51b5;
}

.carousel-indicators li {
  width: 10px;
  height: 10px;
  border-radius: 100%;
}
/* Article Reference: https://www.solodev.com/blog/web-design/how-to-use-absolute-positioning-with-your-images.stml */
.image-container {
  top: 20%;
  left: 68%;
}
.spacer {
  width: 100%;
  height: 8rem;
}
.w-100 {
  width: 100% !important;
}
.position-absolute {
  position: absolute !important;
}
.position-relative {
  position: relative !important;
}
@media (min-width: 768px) {
  .d-md-block {
    display: block !important;
  }
}
</style>
