<template>
  <section id="template">
    <div class="container">
      <main class="page-wrapper">
        <!-- Page content-->

        <div class="row">
          <!-- Sidebar-->
          <aside class="col-lg-4 col-md-5 pe-xl-4 mb-5">
            <!-- Account nav-->
            <div class="card card-body border-0 shadow-sm pb-1 me-lg-1">
              <div
                class="d-flex d-md-block d-lg-flex align-items-start pt-lg-2 mb-4"
              >
                <img
                  class="rounded-circle"
                  :src="userAvatar"
                  width="48"
                  alt="avatar"
                  v-if="signedIn"
                  @error="onImgError()"
                />
                <div class="pt-md-2 pt-lg-0 ps-3 ps-md-0 ps-lg-3">
                  <h2 class="fs-lg mb-0">
                    {{ loggedUser.firstName }} {{ loggedUser.lastName }}
                  </h2>
                  <star-rating
                    v-bind:star-size="17"
                    v-bind:show-rating="false"
                    :rating="ratings()"
                    read-only="true"
                  />
                  <ul class="list-unstyled fs-sm mt-3 mb-0">
                    <li>
                      <a
                        class="nav-link fw-normal p-0"
                        href="tel:{{ loggedUser.phone }}"
                        ><i class="fi-phone opacity-60 me-2"></i
                        >{{ loggedUser.phone }}</a
                      >
                    </li>
                    <li>
                      <a
                        class="nav-link fw-normal p-0"
                        href="mailto:
                        {{
                        loggedUser.email
                        }}"
                        ><i class="fi-mail opacity-60 me-2"></i
                        >{{ loggedUser.email }}</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <router-link
                class="btn btn-primary btn-lg w-100 mb-3"
                to="/nuevoproyecto"
              >
                <span class="d-none d-sm-inline">Solicitar Servicio</span
                ><i class="fi-plus me-2 ms-2"></i>
              </router-link>
              <a
                class="btn btn-outline-secondary d-block d-md-none w-100 mb-3"
                href="#account-nav"
                data-bs-toggle="collapse"
                aria-expanded="true"
              >
                <i class="fi-align-justify me-2"></i>Menu
              </a>
              <div class="collapse d-md-block mt-3" id="account-nav">
                <div class="card-nav">
                  <router-link class="card-nav-link" to="/perfil/info">
                    <i class="fi-user opacity-60 me-2"></i>Información Personal
                  </router-link>
                  <router-link class="card-nav-link" to="/perfil/seguridad">
                    <i class="fi-lock opacity-60 me-2"></i>Contraseña &amp;
                    Seguridad
                  </router-link>
                  <router-link class="card-nav-link" to="/perfil/proyectos">
                    <i class="fi-home opacity-60 me-2"></i>Mis Proyectos
                  </router-link>
                  <router-link class="card-nav-link" to="/perfil/mensajes">
                    <i class="fi-chat-left opacity-60 me-2"></i>Mis Mensajes
                    <span
                      v-if="nrOfNewMessages > 0"
                      class="d-inline-block badge fw-bold bg-primary border-end pe-2 me-2 mx-3"
                      >{{ nrOfNewMessages }}</span
                    >
                  </router-link>
                  <router-link class="card-nav-link" to="/perfil/favoritos">
                    <i class="fi-heart opacity-60 me-2"></i>Mis Favoritos
                  </router-link>
                  <router-link class="card-nav-link" to="/perfil/reviews">
                    <i class="fi-star opacity-60 me-2"></i>Mis Comentarios
                  </router-link>
                  <router-link class="card-nav-link" to="/perfil/formas-pago">
                    <i class="fi-credit-card opacity-60 me-2"></i>Formas de Pago
                  </router-link>
                  <router-link
                    class="card-nav-link"
                    to="/perfil/notificaciones"
                  >
                    <i class="fi-bell opacity-60 me-2"></i>Notificaciones
                  </router-link>
                  <router-link class="card-nav-link" to="/ayuda">
                    <i class="fi-help opacity-60 me-2"></i>Ayuda
                  </router-link>
                  <router-link class="card-nav-link" to="/signout">
                    <i class="fi-logout opacity-60 me-2"></i>Cerrar Sesión
                  </router-link>
                </div>
              </div>
            </div>
          </aside>

          <!-- Content-->
          <router-view
            @trigger-msg-box="triggerMsgBox"
            @child-breadcrumbs-urls="setBreadcrumbs"
          >
          </router-view>
        </div>
      </main>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "../../utils/types";
import getUserAvatar from "../../mixins/getUserAvatar";
import StarRating from "vue-star-rating";

export default {
  emits: ["trigger-msg-box"],
  name: "client-my-profile",
  mixins: [getUserAvatar],
  components: { StarRating },
  data() {},
  methods: {
    setBreadcrumbs: function (urls) {
      this.$emit("child-breadcrumbs-urls", urls);
    },
    triggerMsgBox: function (showIt, message) {
      this.$emit("trigger-msg-box", showIt, message);
    },
    ratings() {
      return this.loggedUser.rating ? this.loggedUser.rating : 0;
    },
  },
  computed: {
    ...mapGetters([types.LOGGED_USER, types.IS_LOGGED_IN, "nrOfNewMessages"]),
  },
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
