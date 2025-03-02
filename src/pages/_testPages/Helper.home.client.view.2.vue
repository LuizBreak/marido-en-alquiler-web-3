<template>
  <section id="template">
    <div class="container">
      <!-- Hero-->
      <section class="container-fluid my-5 pt-5 pb-lg-4 px-xxl-4">
        <div
          class="jarallax card align-items-center justify-content-center border-0 p-md-5 p-4 bg-secondary overflow-hidden mt-n3"
          v-bind:style="backgroundImage"
          data-jarallax
          data-speed="0.5"
        >
          <span class="img-overlay opacity-40"></span>
          <div class="content-overlay" style="max-width: 856px">
            <h2 class="display-5 mb-2 pb-md-3 px-md-3 text-white text-center">
              La maneira mas facil y confiable de encontrar un contratista
            </h2>
            <h4 class="mb-5 pb-md-3 px-md-3 text-mute text-center" v-if="false">
              Quickly get quotes from verified and reviewed pros
            </h4>

            <form class="form-group d-block">
              <div class="row g-0">
                <div class="col-md-10 d-sm-flex align-items-center">
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
                      ><span class="dropdown-toggle-label"
                        >Tipo de Servicio</span
                      >
                    </button>
                    <input type="hidden" />
                    <ul class="dropdown-menu">
                      <li v-for="service in services" :key="service">
                        <router-link
                          class="dropdown-item"
                          :to="serviceFilter(service)"
                          ><span class="dropdown-item-label">
                            {{ service }}
                          </span></router-link
                        >
                      </li>
                      <li>
                        <a class="dropdown-item" href="#"
                          ><span class="dropdown-item-label">For rent</span></a
                        >
                      </li>
                      <li>
                        <a class="dropdown-item" href="#"
                          ><span class="dropdown-item-label">For sale</span></a
                        >
                      </li>
                    </ul>
                  </div>
                  <hr class="d-sm-none my-2" />
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
                          ><span class="dropdown-item-label"
                            >Los Angeles</span
                          ></a
                        >
                      </li>
                      <li>
                        <a class="dropdown-item" href="#"
                          ><span class="dropdown-item-label">San Diego</span></a
                        >
                      </li>
                    </ul>
                  </div>
                  <!-- <hr class="d-sm-none my-2" />
                  <div class="dropdown w-sm-50" data-bs-toggle="select">
                    <button
                      class="btn btn-lg btn-link dropdown-toggle ps-2 ps-sm-3"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <i class="fi-list me-2"></i
                      ><span class="dropdown-toggle-label">Property type</span>
                    </button>
                    <input type="hidden" />
                    <ul class="dropdown-menu">
                      <li>
                        <a class="dropdown-item" href="#"
                          ><span class="dropdown-item-label">Houses</span></a
                        >
                      </li>
                      <li>
                        <a class="dropdown-item" href="#"
                          ><span class="dropdown-item-label"
                            >Apartments</span
                          ></a
                        >
                      </li>
                      <li>
                        <a class="dropdown-item" href="#"
                          ><span class="dropdown-item-label"
                            >Commercial</span
                          ></a
                        >
                      </li>
                      <li>
                        <a class="dropdown-item" href="#"
                          ><span class="dropdown-item-label"
                            >Daily rental</span
                          ></a
                        >
                      </li>
                      <li>
                        <a class="dropdown-item" href="#"
                          ><span class="dropdown-item-label"
                            >New buildings</span
                          ></a
                        >
                      </li>
                    </ul>
                  </div> -->
                </div>
                <hr class="d-md-none mt-2" />
                <div class="col-md-2 d-sm-flex align-items-center pt-3 pt-md-0">
                  <button
                    class="btn btn-lg btn-icon btn-primary px-3 w-100"
                    type="button"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  </section>
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

<style scoped></style>
