import { createRouter, createWebHistory } from "vue-router";

// Article Reference: Usage of Mixing in a js file - https://stackoverflow.com/questions/62328056/using-vuejs-mixins-in-js-file
// import modalSvc from "./mixins/showModal";
import { showdModal } from "./mixins/showModal";

// lading routes
import Home from "./pages/common/landing/landing.vue";
import Booking from "./pages/clients/booking.vue";
import ContactUs from "./pages/common/help/contactus.vue";
import HowToClients from "./pages/common/howTo/howItWorks.client.vue";
import HowToContractor from "./pages/common/howTo/howItWorks.contractor.vue";
import HowToFerreteria from "./pages/common/howTo/howItWorks.ferreteria.vue";
import PageNotFound from "./pages/common/pageNotFound.vue";

// contractors routes
import ContractorProfile from "./pages/contractors/profile.vue";
import ContractorInfo from "./pages/contractors/profile-info.vue";

// clients routes
import ClientProfile from "./pages/clients/profile.vue";
import ClientInfo from "./pages/clients/profile-info.vue";
import Security from "./pages/clients/profile-security.vue";
import Projects from "./pages/clients/myProjects.vue";
import Favorities from "./pages/clients/myfavorites.vue";
import Messages from "./pages/common/chat/ChatApp.vue";
import Reviews from "./pages/clients/myReviews.vue";
import ClientNotifications from "./pages/clients/myNotifications.vue";
import ContractorNotifications from "./pages/contractors/myNotifications.vue";
import Help from "./pages/common/help/help.vue";
import Signout from "./pages/common/authenticate/signout.vue";
import ContractorSearch from "./pages/clients/contractorSearch.vue";
import ProjectSearch from "./pages/contractors/projectSearch.vue";
import NewProject from "./pages/clients/addProject.vue";
import Login from "./pages/common/authenticate/signin.vue";
import PrivacyPolicy from "./pages/common/legal/privacyPolicy.vue";
import TermsOfUse from "./pages/common/legal/termsOfUse.vue";
import ForgotPwd from "./pages/common/authenticate/forgotPwd.vue";
import PayMethods from "./pages/common/payMethod/registerPayMethod.vue";
import Aprendamas from "./pages/common/guides/aprendamas.vue";
import Comenta from "./pages/common/guides/comenta.vue";
import Helper from "./pages/common/chat/ChatApp.vue";

import store from "./store/index.js";

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes: [
    { path: "/", component: Home, meta: { requiresAuth: false } },

    // Another way of declaring the route
    {
      path: "/testpad",
      name: "TestPage",
      component: () => import("./pages/_testPages/vTestPad.carousel.vue"),
    },

    // general routes
    { path: "/booking", component: Booking },
    { path: "/contactus", component: ContactUs },
    { path: "/comoclientes", component: HowToClients },
    { path: "/comocontratistas", component: HowToContractor },
    { path: "/comoferreterias", component: HowToFerreteria },

    { path: "/ayuda", component: Help },
    {
      path: "/busqueda",
      name: "busqueda",
      component: ContractorSearch,
      meta: { requiresAuth: false },
    },
    { path: "/projectlist", component: ProjectSearch },
    { path: "/login", component: Login },
    { path: "/privacidad", component: PrivacyPolicy },
    { path: "/terminos", component: TermsOfUse },
    { path: "/olvide", component: ForgotPwd },
    { path: "/helper", component: Helper },
    { path: "/comenta", component: Comenta },
    { path: "/aprendamas", component: Aprendamas },
    { path: "/notfound", component: PageNotFound },
    { path: "/signout", component: Signout },

    // clients routes
    {
      path: "/perfil",
      component: ClientProfile,
      props: true,
      meta: { requiresAuth: true },
      children: [
        { path: "", component: ClientInfo, meta: { requiresAuth: true } },
        { path: "info", component: ClientInfo, meta: { requiresAuth: true } },
        { path: "seguridad", component: Security },
        { path: "proyectos", component: Projects },
        { path: "favoritos", component: Favorities },
        { path: "mensajes", component: Messages },
        { path: "reviews", component: Reviews },
        { path: "notificaciones", component: ClientNotifications },

        { path: "formas-pago", component: PayMethods },
      ],
    },
    { path: "/nuevoproyecto", component: NewProject },

    // contrators routes
    {
      path: "/profile",
      component: ContractorProfile,
      props: true,
      meta: { requiredAuth: true },
      children: [
        { path: "", component: ContractorInfo, meta: { requiredAuth: true } },
        {
          path: "info",
          component: ContractorInfo,
          meta: { requiredAuth: true },
        },
        { path: "notificaciones", component: ContractorNotifications },
      ],
    },
    { path: "/:notFound(.*)", component: PageNotFound },
  ],
  scrollBehavior() {
    document.getElementById("app").scrollIntoView({ behavior: "smooth" });
  },
});

router.beforeEach(function (to, from, next) {
  // console.log("to.meta.requiresAuth", to.meta.requiresAuth);
  // console.log("isAuthenticated", store.getters.isAuthenticated);
  // console.log("from", from.name);

  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    showdModal("#signin-modal");
    next(false);
  } else {
    next();
  }
  // } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
  //   next("/comoclientes");
  // } else {
  //   next();
  // }
});

export default router;
