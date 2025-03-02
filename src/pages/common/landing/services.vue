<template>
  <section class="py-7" id="services" container-xl="container-xl">
    <div id="servicios" class="container my-4 pt-4">
      <!-- spacer to avoid pages to be under the navbar -->
      <div class="container mx-auto mt-0 mb-md-5 pt-0"></div>
    </div>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-5 text-center mb-3 mt-5">
          <h5 class="text-danger">Servicios</h5>
          <h3>Número de Profesionales disponibles</h3>
        </div>
      </div>
      <!-- Property categories-->
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
                  src="../../../assets/img/icons/bricklayer.png"
                  alt="..."
                />
              </div>
              <br />
              <h3 class="icon-box-title fs-base mb-0">Remodelación</h3>
              <h1 class="text-primary mt-1">{{ nrRemodelacion }}+</h1>
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
                  src="../../../assets/img/icons/fixappliances.png"
                  alt="..."
                />
              </div>
              <br />
              <h3 class="icon-box-title fs-base mb-0">Plomeria</h3>
              <h1 class="text-primary mt-1">{{ nrPlomeria }}+</h1>
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
                  src="../../../assets/img/icons/painting.png"
                  alt="..."
                />
              </div>
              <br />
              <h3 class="icon-box-title fs-base mb-0">Pintura</h3>
              <h1 class="text-primary mt-1">{{ nrPintura }}+</h1>
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
                  src="../../../assets/img/icons/eletricity.png"
                  alt="..."
                />
              </div>
              <br />
              <h3 class="icon-box-title fs-base mb-0">Electricidad</h3>
              <h1 class="text-primary mt-1">{{ nrElectricidad }}+</h1>
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
                  src="../../../assets/img/icons/renovation.png"
                  alt="..."
                />
              </div>
              <br />
              <h3 class="icon-box-title fs-base mb-0">Herreria</h3>
              <h1 class="text-primary mt-1">{{ nrHerreria }}+</h1>
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
  </section>
</template>

<script>
export default {
  name: "service-types",
  data() {
    return {
      nrRemodelacion: "26",
      nrPlomeria: "45",
      nrPintura: "43",
      nrElectricidad: "21",
      nrHerreria: "54",
    };
  },
  methods: {
    serviceFilter(typeService) {
      return { name: "busqueda", query: { type: typeService } };
    },
  },
};
</script>

<style scoped>
img {
  width: 42px;
  height: 42px;
}

.imgBox:hover {
  -moz-box-shadow: 0 0 10px #fd5631;
  -webkit-box-shadow: 0 0 10px #fd5631;
  box-shadow: 0 0 10px #fd5631;
  border-radius: 50%;
}
</style>
