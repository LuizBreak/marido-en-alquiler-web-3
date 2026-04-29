<template>
  <Login />

  <!-- Navbar-->
  <header
    class="navbar navbar-expand-lg navbar-light bg-light fixed-top"
    data-scroll-header=""
  >
    <div class="container">
      <router-link class="navbar-brand me-1 me-xl-1" to="/">
        <img
          class="d-block mr-3 pr-3"
          src="../../assets/img/gallery/marido-logo-no-bg.png"
          width="70"
          alt="Marido-en-alquiler"
      /></router-link>
      <h3 class="text-primary">Marido</h3>
      <h3>-en-alquiler</h3>

      <!-- Country switcher-->
      <div class="dropdown border-end-md" data-bs-toggle="select">
        <button
          class="btn btn-link dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          <img
            class="flag mx-1"
            src="../../assets/img/flags/do.svg"
            alt="Flag"
          />
          <!-- <span class="dropdown-toggle-label">DR</span> -->
        </button>

        <ul class="dropdown-menu">
          <li>
            <router-link to="/" class="dropdown-item">
              <img
                class="flag mx-1"
                src="../../assets/img/flags/do.svg"
                alt="Flag"
              />
              <span class="dropdown-item-label">Rep. Dominicana</span>
            </router-link>
          </li>
          <li>
            <router-link to="/" class="dropdown-item">
              <img
                class="flag mx-1"
                width="20"
                src="../../assets/img/flags/co.svg"
                alt="Flag"
              />
              <span class="dropdown-item-label"> Colombia</span>
            </router-link>
          </li>
          <li>
            <router-link to="/" class="dropdown-item">
              <img
                class="flag mx-1"
                width="20"
                src="../../assets/img/flags/mx.svg"
                alt="Flag"
              />
              <span class="dropdown-item-label"> Mexico</span>
            </router-link>
          </li>
        </ul>
      </div>
      <button
        class="navbar-toggler ms-auto"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- User Avatar Menu -->
      <div
        class="dropdown d-none d-lg-block order-lg-3 my-n2 me-3"
        v-if="signedIn"
      >
        <a
          class="d-block py-2"
          :href="isClient ? '/perfil/info' : '/profile/info'"
        >
          <img
            class="rounded-circle"
            :src="userAvatar"
            width="40"
            alt="user"
            v-if="signedIn"
            @error="onImgError()"
          />
        </a>

        <div class="dropdown-menu dropdown-menu-end" v-if="signedIn">
          <div
            class="d-flex align-items-start border-bottom px-3 py-1 mb-2"
            style="width: 16rem"
          >
            <img
              class="rounded-circle"
              :src="userAvatar"
              width="48"
              alt="avatar"
              v-if="signedIn"
              @error="onImgError()"
            />
            <div class="ps-2">
              <h6 class="fs-base mb-0">
                {{ loggedUser.firstName }} {{ loggedUser.lastName }}
              </h6>
              <star-rating
                v-bind:star-size="17"
                v-bind:show-rating="false"
                :rating="ratings()"
                :read-only="true"
              />
              <div v-if="false" key="" class="fs-xs py-2">
                {{ loggedUser.phone }}
                <br />
                {{ loggedUser.email }}
              </div>
            </div>
          </div>
          <router-link
            class="dropdown-item"
            :to="isClient ? '/perfil/info' : '/profile/info'"
          >
            <i class="fi-user opacity-60 me-2"></i>Información Personal
          </router-link>
          <router-link class="dropdown-item" to="/perfil/seguridad">
            <i class="fi-lock opacity-60 me-2"></i>Contraseña &amp; Seguridad
          </router-link>
          <router-link class="dropdown-item" to="/perfil/proyectos">
            <i class="fi-home opacity-60 me-2"></i>Mis Proyectos
          </router-link>
          <router-link class="dropdown-item" to="/perfil/mensajes">
            <i class="fi-chat-left opacity-60 me-2"></i>Mis Mensajes
            <span
              v-if="nrOfNewMessages !== 0"
              class="d-inline-block badge fw-bold bg-primary border-end pe-2 me-2 mx-3"
              >{{ nrOfNewMessages }}</span
            >
          </router-link>
          <router-link
            class="dropdown-item"
            to="/perfil/favoritos"
            v-if="!isContractor"
          >
            <i class="fi-heart opacity-60 me-2"></i>Mis Favoritos
          </router-link>
          <router-link class="dropdown-item" to="/perfil/reviews">
            <i class="fi-star opacity-60 me-2"></i>Mis Comentarios
          </router-link>
          <router-link class="dropdown-item" to="/perfil/formas-pago">
            <i class="fi-credit-card opacity-60 me-2"></i>Formas de Pago
          </router-link>
          <router-link
            class="dropdown-item"
            :to="
              isClient ? '/perfil/notificaciones' : '/profile/notificaciones'
            "
          >
            <i class="fi-bell opacity-60 me-2"></i>Notificaciones
          </router-link>

          <div class="dropdown-divider"></div>
          <router-link class="dropdown-item" to="/ayuda">
            <i class="fi-bell opacity-60 me-2"></i>Ayuda
          </router-link>
          <router-link class="dropdown-item" to="/signout">
            <i class="fi-logout opacity-60 me-2"></i>Cerrar Sesión
          </router-link>
        </div>
      </div>

      <!-- Ingresar -->
      <a
        class="btn btn-sm text-primary d-none d-lg-block order-lg-3"
        href="#signin-modal"
        data-bs-toggle="modal"
        v-if="!signedIn"
      >
        <i class="fi-user me-2"></i>Ingresar
      </a>

      <!-- Vistor Default  ¿Eres Contratistas? -->
      <router-link
        class="btn btn-outline-info btn-sm ms-2 order-lg-3"
        to="#signup-modal"
        data-bs-toggle="modal"
        data-bs-dismiss="modal"
        v-if="!isContractor && !isClient"
      >
        <span class="d-none d-sm-inline">¿Eres Contratistas?</span
        ><i class="fas fa-arrow-right ms-2" />
      </router-link>
      <!-- <i class="fas fa-search ms-2"></i> -->
      <!-- Buscar Contratistas: Logged as Client-->
      <router-link
        class="btn btn-primary btn-sm ms-2 order-lg-3"
        to="/busqueda"
        v-if="isClient"
      >
        <span class="d-none d-sm-inline">Buscar Contratistas</span>
        <i class="fas fa-search ms-2"></i>
      </router-link>

      <!-- Seleccionar  Proyecto: Logged as Contractor -->
      <router-link
        class="btn btn-primary btn-sm ms-2 order-lg-3"
        to="/projectlist"
        v-if="isContractor"
      >
        <span class="d-none d-sm-inline">Seleccionar Proyecto</span>
        <i class="fas fa-search ms-2"></i>
      </router-link>

      <div class="navbar-collapse order-lg-2 collapse" id="navbarNav" style="">
        <ul class="navbar-nav navbar-nav-scroll" style="max-height: 35rem">
          <!-- spacer -->
          <!-- <div style="width: 20%; background-color: green"></div> -->
          <!-- <div
            style="width:80%; background-color: background-color:red"
          ></div> -->

          <!-- ¿Cómo funciona? -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ¿Cómo funciona?
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/comoclientes">
                  <a>Para los Clientes</a>
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/comocontratistas">
                  <a>Para los Contratistas</a>
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/comoferreterias">
                  <a>Para las Ferreterias</a>
                </router-link>
              </li>
            </ul>
          </li>

          <!-- Acerca de -->
          <li class="nav-item">
            <a class="nav-link" href="/#acercade">Acerca de</a>
          </li>

          <!-- Servicios -->
          <li class="nav-item">
            <a class="nav-link" href="/#services">Servicios</a>
          </li>
          <!-- Ayuda -->
          <li class="nav-item">
            <router-link class="nav-link" to="/contactus">¿Ayuda?</router-link>
          </li>
          <li class="nav-item d-lg-none" v-if="!signedIn">
            <a class="nav-link" href="#signin-modal" data-bs-toggle="modal"
              ><i class="fi-user me-2"></i>Sign in</a
            >
          </li>
          <li class="nav-item d-lg-none" v-if="signedIn">
            <a class="nav-link" href="/signout" data-bs-toggle="modal"
              ><i class="fi-user me-2"></i>Cerrar Sesión</a
            >
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

import * as types from "../../utils/types.js";
import Login from "../../pages/common/authenticate/signin.vue";

import getUserAvatar from "../../mixins/getUserAvatar";
import StarRating from "vue-star-rating";
import { Message } from "../../services/message.service.js";

export default {
  name: "Navbar",
  mixins: [getUserAvatar],
  components: {
    Login,
    StarRating,
  },
  methods: {
    ratings() {
      return this.loggedUser.rating ? this.loggedUser.rating : 0;
    },
  },
  computed: {
    ...mapGetters([
      types.LOGGED_USER,
      types.IS_LOGGED_IN,
      "IsClient",
      "isContractor",
      "nrOfNewMessages",
    ]),
    localUserAvatarDeprecated() {
      try {
        return require("../../assets/img/gallery/" + this.loggedUser.imgPath);
      } catch (error) {
        // fallback image
        return require("../../assets/img/gallery/avatar.png");
      }
    },
    _userAvatarDepricated() {
      // ***  just a different approach ***

      // Search of a specific jpeg criterias
      // var images = require.context(
      //   "../../assets/img/gallery/",
      //   false,
      //   /\.jpeg$/
      // );

      // search for all files
      var images = require.context(
        "../../assets/img/gallery/",
        false,
        /^\.\/.*$/
      );
      return images("./" + this.loggedUser.imgPath);
    },
    isClient() {
      // console.log("isClient?", this.$store.getters.loggedUser.userType);
      return this.$store.getters.loggedUser.userType === "client"
        ? true
        : false;
    },
    hasNewMessages() {
      if (this.signedIn) {
        console.log("nav.created", this.loggedUser.id);
        const messagingSvc = new Message();
        messagingSvc.getNrOfNewMessages(this.loggedUser.id);
        return true;
      }
      return false;
    },
  },
  mounted() {},
  created() {},
};
</script>

<style scoped>
.nav-item {
  position: relative;
}
.nav-item:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  border-bottom: 3px solid #f95c19;
  transition: 0.4s;
}
.nav-item:hover:after {
  width: 100%;
}
.flag {
  /* max-width: 100%; */
  height: 15px;
  border-radius: 20%;
  /* vertical-align: middle; */
}
.hero {
  height: 100px;
}
</style>
