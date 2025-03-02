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
              src="../../assets/img/illustrations/marido-logo-612x612-no-bg.png"
              width="70%"
              alt="hero-header"
            />
          </div>
          <div
            class="col-md-75 col-xl-6 col-xxl-5 text-md-start text-center px-5 py-1"
          >
            <!-- <h1 class="fw-bolder fs-6 fs-xxl-7 mb-2">Buscamos Profesionales como Usted</h1> -->
            <p class="fs-1 mb-4 text-dark fw-normal">
              Ejecuta los <span class="text-primary">arreglos</span> de la casa
              de forma simple, rápida y segura
            </p>
            <h1 class="fw-normal fs-6 fs-xxl-7 mb-4">
              Publica detalles de tu proyecto, reciba ofertas de contratistas
              interesados o utiliza nuestro buscador para encontrarlos.
            </h1>

            <router-link class="btn btn-primary me-2" to="/comocontratistas">
              Busco Contratistas<i class="fas fa-search ms-2"></i>
            </router-link>
            <router-link class="btn btn-outline-danger" to="/comenta">
              Soy Contratista <i class="fi-edit"></i>
            </router-link>
          </div>
        </div>
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
