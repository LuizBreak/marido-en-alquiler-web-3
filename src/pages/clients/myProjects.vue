<template>
  <div class="col-lg-8 col-md-7 mb-5">
    <base-dialog :show="isLoading" title="Cargando..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>

    <div class="d-flex align-items-center justify-content-between mb-4 pb-2">
      <h2 class="h2 mb-0">
        <i class="fi-home expand text-primary" aria-hidden="true"></i>
        Mis Proyectos
      </h2>
    </div>

    <div v-if="hasProjects && !isLoading">
      <div v-for="project in projects" :key="project.projectId">
      <ProjectTile
        :id="project.projectId"
        :contractorId="project.contractorId"
        :title="project.title"
        :description="project.description"
        :status="project.status"
        :tileImage="project.avatar"
        :startDate="project.startDate"
        :services="project.services"
        :ShowProvideReview="true"
      />
      <ProjectOffers v-if="isClient" :project="project" />
      </div>
    </div>

    <h3 v-else-if="!isLoading">No hay proyectos registrados.</h3>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "../../utils/types.js";
import ProjectTile from "../../components/ui/BaseProjectTile.vue";
import ProjectOffers from "../../components/ui/ProjectOffers.vue";

export default {
  name: "Proyectos",
  components: {
    ProjectTile,
    ProjectOffers,
  },
  data() {
    return {
      isLoading: false,
      urls: [
        { url: "/", caption: "Inicio", isActive: false, aria: "" },
        {
          url: this.isClient ? "/perfil" : "/profile",
          caption: "Cuenta",
          isActive: false,
          aria: "",
        },
        {
          url: this.isClient ? "/perfil/proyectos" : "/profile/proyectos",
          caption: "Mis Proyectos",
          isActive: true,
          aria: "page",
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      types.LOGGED_USER,
      types.IS_LOGGED_IN,
      "isClient",
      "isContractor",
      "user",
    ]),
    hasProjects() {
      return this.$store.getters["projects/hasProjects"];
    },
    projects() {
      return this.$store.getters["projects/projects"];
    },
    userId() {
      return this.$store.getters["userId"];
    },
  },
  methods: {
    async refreshProjectList() {
      this.isLoading = true;

      try {
        await this.$store.dispatch("projects/getMyProjects");
      } catch (error) {
        console.log("Error refreshing project list", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  async created() {
    this.$emit("child-breadcrumbs-urls", this.urls);
    await this.refreshProjectList();
  },
};
</script>

<style scoped></style>
