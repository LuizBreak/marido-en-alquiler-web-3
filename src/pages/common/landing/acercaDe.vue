<template>
  <section>
    <div id="acercade" class="container my-5 pt-5">
      <!-- Hero -->
      <section class="container-fluid my-5 pt-5 pb-lg-4 px-xxl-4">
        <div
          class="jarallax card align-items-center justify-content-center border-0 p-md-5 p-4 bg-secondary overflow-hidden mt-n3"
          v-bind:style="backgroundImage"
          data-jarallax
          data-speed="0.5"
        >
          <span class="img-overlay opacity-40"></span>
          <div class="content-overlay" style="max-width: 856px">
            <div style="" class="">
              <h1 class="display-5 mb-1 pb-md-3 px-md-1 text-white text-left">
                Acerca de <span style="color: #f95c19">Marido</span
                ><span style="color: black">-en-alquiler</span>
              </h1>
              <br />
              <p class="fs-4 mb-5">
                <strong>
                  <span class="cool-shadow">
                    Somos una plataforma de servicio gratuito para ayudar los
                    propietarios a encontrar contratistas que fueron verificados
                    por la plataforma y revisados por otros propietarios en
                    proyectos anteriores.
                  </span>
                </strong>
              </p>
              <router-link
                class="btn btn-primary btn-sm ms-2 order-lg-3"
                to="/busqueda"
              >
                <span class="d-none d-sm-inline">Buscar Contratistas</span
                ><i class="fas fa-search ms-2"></i>
              </router-link>
              <span class="d-none d-sm-inline opacity-10">space</span>
              <router-link
                class="btn btn-primary btn-sm ms-2 order-lg-3"
                to="/nuevoproyecto"
              >
                <span class="d-none d-sm-inline">Solicitar Servicio</span
                ><i class="fi-plus me-2 ms-2"></i>
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <section id="bottom">
        <!-- The Tools Needed -->
        <section class="container mb-1 pb-sm-3 pb-lg-4">
          <div class="bg-secondary rounded-3">
            <div
              class="col-md-11 col-12 offset-md-1 p-md-0 p-2 d-flex align-items-center justify-content-between"
            >
              <div class="col-4 d-md-block d-none align-self-top pt-3 px-0">
                <img
                  class="mt-n5"
                  src="../../../assets/img/gallery/handyman.team.png"
                  width="406"
                  alt="Cover image"
                />
              </div>

              <div class="me-md-5 py-md-5 px-md-0 p-4" style="max-width: 726px">
                <h2 class="mb-md-4">
                  Ciento de contratistas a tu disponibilidad
                </h2>
                <div class="card border-0 shadow-sm h-100">
                  <blockquote class="blockquote card-body">
                    <p class="mb-4 pb-md-3 fs-lg">
                      Somos la red dominicana más grande de profesionales de
                      servicio a domicilio verificados y revisados por la
                      comunidad. Ya sea que esté comenzando una renovación
                      importante o simplemente necesite una pequeña reparación,
                      contamos con profesionales en todo el país para ayudarlo a
                      realizar su proyecto. Nuestra misión es brindarle las
                      herramientas que necesita para contratar bien desde la
                      primera vez, para sus proyecto de mejoras para el hogar.
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="herramientas" class="container my-1 pt-1">
          <!-- spacer to avoid pages to be under the navbar -->
        </div>
        <div class="row h-100 justify-content-center">
          <h3 style="text-align: center">
            Las herramientas que necesitas <br />
            para contratar con confianza
          </h3>

          <div class="col-md-4 pt-1 px-md-2 px-lg-3">
            <div class="ard h-100 card-span p-3">
              <div class="card-body d-flex flex-column justify-content-around">
                <div class="text-center pt-2">
                  <img
                    class="img-fluid"
                    src="../../../assets/img/pricing/icon-2.svg"
                    alt="..."
                    width="86"
                  />
                  <!-- <img class="d-block mx-auto" src="img/pricing/icon-1.svg" width="86" alt="Icon"></div>                  <img class="d-block mx-auto" src="img/pricing/icon-1.svg" width="86" alt="Icon"></div> -->
                  <h5 class="my-4">Métricas de Confianza</h5>
                </div>
                <p>
                  Antes de contratar, verifique el perfil de cada contratista
                  para obtener una idea clara de la Puntuación y comentarios
                  asigndas por otros clientes.
                </p>
                <!-- <ul class="list-unstyled">
                            <li class="mb-2"><span class="me-2"><i class="fas fa-circle text-primary" style="font-size:.5rem"></i></span>Corporate goods
                            </li>
                            <li class="mb-2"><span class="me-2"><i class="fas fa-circle text-primary" style="font-size:.5rem"></i></span>Shipment
                            </li>
                            <li class="mb-2"><span class="me-2"><i class="fas fa-circle text-primary" style="font-size:.5rem"></i></span>Accesories
                            </li>
                        </ul> -->
                <div class="text-center my-1">
                  <div class="">
                    <router-link class="btn btn-outline-danger" to="/aprendamas"
                      ><i class="fi-eye-on me-2"></i>Aprende más
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 pt-1 px-md-2 px-lg-3">
            <div class="ard h-100 card-span p-3">
              <div class="card-body d-flex flex-column justify-content-around">
                <div class="text-center pt-2">
                  <img
                    class="img-fluid"
                    src="../../../assets/img/pricing/icon-1.svg"
                    alt="..."
                    width="86"
                  />
                  <h5 class="my-4">Lea y Comparta Comentarios</h5>
                </div>
                <p>
                  Busque un contratista para leer sus reseñas y ver fotos de sus
                  proyectos pasados o para dejarle un comentario y puntuación
                  del trabajo hecho para ti.
                </p>
                <div class="text-center my-1">
                  <div class="">
                    <router-link class="btn btn-outline-danger" to="/comenta">
                      <i class="fi-edit"></i> Comenta
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 pt-1 px-md-2 px-lg-3">
            <div class="ard h-100 card-span p-3">
              <div class="card-body d-flex flex-column justify-content-around">
                <div class="text-center pt-2">
                  <img
                    class="img-fluid"
                    src="../../../assets/img/pricing/icon-3.svg"
                    alt="..."
                    width="86"
                  />
                  <h5 class="my-4">Encuentra Contratistas<br />Cerca de Ti</h5>
                </div>
                <p>
                  Cuando estes listo para empezar tu proyecto, utilize la
                  plataforma para confirmar con el contratista preferido tu
                  fecha de inicio
                </p>

                <div class="text-center my-1">
                  <div class="">
                    <router-link class="btn btn-outline-danger" to="/busqueda">
                      <i class="fas fa-search ms-2"></i> Buscar Contratistas
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  emits: ["trigger-msg-box"],
  name: "AcercaDe",
  props: ["name"],
  data() {
    return {
      backgroundImage:
        `background-image:url(${require("../../../assets/img/gallery/user.requesting.service.4.jpg")})` +
        ";background-position:top;background-size:cover",
    };
  },
  triggerMsgBox: function (showIt, message) {
    this.$emit("trigger-msg-box", showIt, message);
  },
};
</script>

<style scoped>
.cool-shadow {
  color: white;
  text-shadow: 2px 2px 4px #000000;
}
</style>
