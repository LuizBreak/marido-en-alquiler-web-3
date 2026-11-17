<template>
  <main class="container py-5" style="max-width:900px">
    <h1 class="h3">Revisar oferta</h1>
    <div v-if="!authenticated" class="card card-body mt-4">
      <p>Inicia sesión con la cuenta que publicó el proyecto para revisar esta oferta.</p>
      <button class="btn btn-primary align-self-start" type="button" @click="signin">Iniciar sesión</button>
    </div>
    <p v-else-if="loading" role="status">Cargando oferta...</p>
    <div v-else-if="error" class="alert alert-warning mt-4" role="alert"><p>{{ error }}</p><button class="btn btn-outline-primary btn-sm" type="button" @click="load">Intentar de nuevo</button></div>
    <template v-else-if="project && quote">
      <h2 class="h4 mt-4">{{ project.title }}</h2>
      <p class="text-break">{{ project.description }}</p>
      <ProjectOffers :key="quote.quoteId" :project="project" :initial-quote="quote" @project-updated="project = $event" />
      <router-link to="/perfil/proyectos">Ver todos mis proyectos</router-link>
    </template>
  </main>
</template>
<script>
import ProjectOffers from '../../components/ui/ProjectOffers.vue';
import { apiSvc } from '../../services/api.service';
import { showdModal } from '../../mixins/showModal';
import { offerPath } from '../../services/signin-destination';

export default {
  components: { ProjectOffers },
  data() { return { project: null, quote: null, loading: false, error: '', request: 0 }; },
  computed: {
    authenticated() { return this.$store.getters.isAuthenticated; },
    identity() { return `${this.authenticated}:${this.$store.getters.userId}:${this.$route.params.quoteId}`; },
  },
  watch: { identity: { immediate: true, handler() { this.load(); } } },
  beforeUnmount() { this.request++; },
  methods: {
    signin() { showdModal('#signin-modal'); },
    async load() {
      const request = ++this.request;
      this.project = null; this.quote = null; this.error = ''; this.loading = false;
      if (!this.authenticated) return;
      if (!offerPath('/oferta/' + this.$route.params.quoteId)) { this.error = 'El enlace de la oferta no es válido.'; return; }
      this.loading = true;
      try {
        const response = await apiSvc.getById('quotes', this.$route.params.quoteId);
        const quote = response.data.data;
        const result = await apiSvc.getById('projects', quote.projectId);
        const project = result.data.data;
        if (!this.$store.getters.isClient || String(project.clientId) !== String(this.$store.getters.userId)) throw { response: { status: 403 } };
        if (request !== this.request) return;
        this.project = project; this.quote = quote;
      } catch (error) {
        if (request !== this.request) return;
        this.error = [403, 404].includes(error.response?.status)
          ? 'Esta oferta no está disponible para tu cuenta. Revisa que hayas iniciado sesión con la cuenta del proyecto.'
          : 'No se pudo cargar la oferta. Inténtalo de nuevo más tarde.';
      } finally { if (request === this.request) this.loading = false; }
    },
  },
};
</script>
