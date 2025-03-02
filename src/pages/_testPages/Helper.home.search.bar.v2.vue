<template>
  <!-- Hero-->
  <section class="container-fluid mb-0my-0 pt-0 pb-lg-4 px-xxl-4">
    <div
      class="jarallax card align-items-center justify-content-center border-0 p-md-5 p-4 bg-secondary overflow-hidden mt-n3"
      v-bind:style="backgroundImage2"
      data-jarallax
      data-speed="0.5"
    >
      <span class="img-overlay opacity-40"></span>
      <div class="content-overlay" style="max-width: 856px">
        <h2 class="display-5 mb-2 pb-md-3 px-md-3 text-white text-center">
          La maneira más fácil y confiable de encontrar contratistas
        </h2>
        <h4 class="mb-5 pb-md-3 px-md-3 text-mute text-center" v-if="false">
          Quickly get quotes from verified and reviewed pros
        </h4>

        <form class="form-group d-block dropup">
          <div class="row g-0">
            <div class="col-md-10 d-sm-flex align-items-center">
              <!-- Tipo de Servicio -->
              <div
                class="dropdown w-sm-50 border-end-sm"
                data-bs-toggle="select"
              >
                <button
                  class="btn btn-lg btn-link dropdown-toggle ps-2 ps-sm-3"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <i class="fi-home me-2"></i
                  ><span class="dropdown-toggle-label">Tipo de Servicio</span>
                </button>
                <input type="hidden" />
                <div class="dropdown-menu dropdown-menu-end my-1">
                  <!-- <ul class="dropdown-menu"> -->
                  <router-link
                    class="dropdown-item fw-bold"
                    :to="serviceFilter('limpieza')"
                  >
                    <i class="fi-trash fs-base opacity-60 me-2"></i
                    >Limpieza</router-link
                  >
                  <router-link
                    class="dropdown-item fw-bold"
                    :to="serviceFilter('ebanisteria')"
                  >
                    <i class="fi-pencil fs-base opacity-60 me-2"></i>Ebanisteria
                  </router-link>
                  <router-link
                    class="dropdown-item fw-bold"
                    :to="serviceFilter('seguridad electronica')"
                  >
                    <i class="fi-cctv fs-base opacity-60 me-2"></i>Seguridad
                    Electronica</router-link
                  >
                  <router-link
                    class="dropdown-item fw-bold"
                    :to="serviceFilter('refrigeracion')"
                  >
                    <i class="fi-snowflake fs-base opacity-60 me-2"></i
                    >Refrigeración</router-link
                  >
                  <router-link
                    class="dropdown-item fw-bold"
                    :to="serviceFilter('jardineria')"
                  >
                    <i class="fi-plant fs-base opacity-60 me-2"></i
                    >Jardineria</router-link
                  >
                  <router-link
                    class="dropdown-item fw-bold"
                    :to="serviceFilter('mudanza')"
                  >
                    <i class="fi-truck fs-base opacity-60 me-2"></i>Mudanza
                  </router-link>
                  <router-link
                    class="dropdown-item fw-bold"
                    :to="serviceFilter('cerrajero')"
                  >
                    <i class="fi-unlock fs-base opacity-60 me-2"></i>Cerrajero
                  </router-link>
                  <!-- </ul> -->
                </div>

                <!-- <ul class="dropdown-menu">
                  <li v-for="service in services" :key="service">
                    <router-link
                      class="dropdown-item"
                      :to="serviceFilter(service)"
                      ><span class="dropdown-item-label">
                        {{ service }}
                      </span></router-link
                    >
                  </li>
                </ul> -->
              </div>
              <hr class="d-sm-none my-2" />
              <!--  Ubicacion -->
              <div
                class="dropdown w-sm-50 border-end-sm"
                data-bs-toggle="select"
              >
                <button
                  class="btn btn-lg btn-link dropdown-toggle ps-2 ps-sm-3"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <i class="fi-map-pin me-2"></i
                  ><span class="dropdown-toggle-label">Ubicación</span>
                </button>
                <input type="hidden" />
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#"
                      ><span class="dropdown-item-label">New York</span></a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="#"
                      ><span class="dropdown-item-label">Chicago</span></a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="#"
                      ><span class="dropdown-item-label">Los Angeles</span></a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item" href="#"
                      ><span class="dropdown-item-label">San Diego</span></a
                    >
                  </li>
                </ul>
              </div>
              <hr class="d-sm-none my-2" />
            </div>
            <hr class="d-md-none mt-2" />
            <div class="col-md-2 d-sm-flex align-items-center pt-3 pt-md-0">
              <button
                class="btn btn-lg btn-icon btn-primary px-3 w-100"
                type="button"
              >
                Buscar
                <i class="fas fa-search ms-2"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
  <!-- Property categories-->
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-5 text-center mb-3 mt-5">
        <h5 class="text-danger">Servicios</h5>
        <h3>Número de Profesionales disponibles</h3>
      </div>
    </div>
    <section class="container mb-5">
      <div class="row row-cols-lg-6 row-cols-sm-3 row-cols-2 g-3 g-xl-4">
        <div class="col">
          <router-link
            class="icon-box card card-body h-100 border-0 shadow-sm card-hover h-100 text-center"
            :to="serviceFilter('remodelacion')"
          >
            <div class="text-center">
              <img
                class="imgBox"
                src="../../assets/img/icons/bricklayer.png"
                alt="..."
              />
            </div>
            <br />
            <h3 class="icon-box-title fs-base mb-0">x1Remodelación</h3>
            <h1 class="text-primary mt-1">26+</h1>
            <!-- </a> -->
          </router-link>
        </div>
        <div class="col">
          <router-link
            class="icon-box card card-body h-100 border-0 shadow-sm card-hover h-100 text-center"
            :to="serviceFilter('plomeria')"
          >
            <div class="text-center">
              <img
                class="imgBox"
                src="../../assets/img/icons/fixappliances.png"
                alt="..."
              />
            </div>
            <br />
            <h3 class="icon-box-title fs-base mb-0">Plomeria</h3>
            <h1 class="text-primary mt-1">45+</h1>
          </router-link>
        </div>
        <div class="col">
          <router-link
            class="icon-box card card-body h-100 border-0 shadow-sm card-hover h-100 text-center"
            :to="serviceFilter('pintura')"
          >
            <div class="text-center">
              <img
                class="imgBox"
                src="../../assets/img/icons/painting.png"
                alt="..."
              />
            </div>
            <br />
            <h3 class="icon-box-title fs-base mb-0">Pintura</h3>
            <h1 class="text-primary mt-1">43+</h1>
          </router-link>
        </div>
        <div class="col">
          <router-link
            class="icon-box card card-body h-100 border-0 shadow-sm card-hover h-100 text-center"
            :to="serviceFilter('eletricidad')"
          >
            <div class="text-center">
              <img
                class="imgBox"
                src="../../assets/img/icons/eletricity.png"
                alt="..."
              />
            </div>
            <br />
            <h3 class="icon-box-title fs-base mb-0">Electricidad</h3>
            <h1 class="text-primary mt-1">21+</h1>
          </router-link>
        </div>
        <div class="col">
          <router-link
            class="icon-box card card-body h-100 border-0 shadow-sm card-hover h-100 text-center"
            :to="serviceFilter('herreria')"
          >
            <div class="text-center">
              <img
                class="imgBox"
                src="../../assets/img/icons/renovation.png"
                alt="..."
              />
            </div>
            <br />
            <h3 class="icon-box-title fs-base mb-0">Herreria</h3>
            <h1 class="text-primary mt-1">54+</h1>
          </router-link>
        </div>
        <div class="col">
          <div class="dropdown h-100">
            <a
              class="icon-box card card-body h-100 border-0 shadow-sm card-hover text-center"
              href="#"
              data-bs-toggle="dropdown"
            >
              <div
                class="icon-box-media bg-faded-primary text-primary rounded-circle mb-3 mx-auto"
              >
                <i class="fi-dots-horisontal"></i>
              </div>
              <h3 class="icon-box-title fs-base mb-0">Mucho<br />más</h3></a
            >
            <div class="dropdown-menu dropdown-menu-end my-1">
              <router-link
                class="dropdown-item fw-bold"
                :to="serviceFilter('limpieza')"
              >
                <i class="fi-trash fs-base opacity-60 me-2"></i
                >Limpieza</router-link
              >
              <router-link
                class="dropdown-item fw-bold"
                :to="serviceFilter('ebanisteria')"
              >
                <i class="fi-pencil fs-base opacity-60 me-2"></i>Ebanisteria
              </router-link>

              <router-link
                class="dropdown-item fw-bold"
                :to="serviceFilter('seguridad electronica')"
              >
                <i class="fi-cctv fs-base opacity-60 me-2"></i>Seguridad
                Electronica</router-link
              >
              <router-link
                class="dropdown-item fw-bold"
                :to="serviceFilter('refrigeracion')"
              >
                <i class="fi-snowflake fs-base opacity-60 me-2"></i
                >Refrigeración</router-link
              >
              <router-link
                class="dropdown-item fw-bold"
                :to="serviceFilter('jardineria')"
              >
                <i class="fi-plant fs-base opacity-60 me-2"></i
                >Jardineria</router-link
              >
              <router-link
                class="dropdown-item fw-bold"
                :to="serviceFilter('mudanza')"
              >
                <i class="fi-truck fs-base opacity-60 me-2"></i>Mudanza
              </router-link>
              <router-link
                class="dropdown-item fw-bold"
                :to="serviceFilter('cerrajero')"
              >
                <i class="fi-unlock fs-base opacity-60 me-2"></i>Cerrajero
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
// import VueHelper from '@/components/VueHelper.vue'
import * as types from "../../utils/types.js";

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
      backgroundImage:
        `min-height: 65vh;
         background-image:url(${require("../../assets/img/gallery/user.requesting.service.4.jpg")})` +
        ";background-position:top;background-size:cover",
      backgroundImage2:
        `min-height: 65vh;
         background-image:url(${require("../../img/real-estate/hero-image-v2.jpg")})` +
        ";background-position:top;background-size:cover",
      backgroundImage3:
        `background-image:url(${require("../../assets/img/gallery/hero-header-bg.png")})` +
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
