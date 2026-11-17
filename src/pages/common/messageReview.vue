<template>
  <main class="container py-5" style="max-width:900px">
    <h1 class="h3">Revisar mensaje</h1>
    <div v-if="!authenticated" class="card card-body mt-4">
      <p>Inicia sesión con la cuenta que recibió el mensaje para consultar sus detalles.</p>
      <button type="button" class="btn btn-primary align-self-start" @click="signin">Iniciar sesión</button>
    </div>
    <p v-else-if="loading" role="status">Cargando mensaje...</p>
    <div v-else-if="error" class="alert alert-warning mt-4" role="alert"><p>{{ error }}</p><button type="button" class="btn btn-outline-primary btn-sm" @click="load">Intentar de nuevo</button></div>
    <article v-else-if="message" class="card card-body mt-4" :data-message-id="message.messageId">
      <h2 class="h4">{{ message.subject || 'Mensaje recibido' }}</h2>
      <p class="text-break" style="white-space:pre-wrap">{{ message.messageBody }}</p>
      <router-link :to="messagesPath" class="btn btn-primary align-self-start">Responder en mis mensajes</router-link>
    </article>
  </main>
</template>
<script>
import { apiSvc } from '../../services/api.service';
import { showdModal } from '../../mixins/showModal';
import { messagePath } from '../../services/signin-destination';

export default {
  data() { return { message: null, loading: false, error: '', request: 0 }; },
  computed: {
    authenticated() { return this.$store.getters.isAuthenticated; },
    identity() { return `${this.authenticated}:${this.$store.getters.userId}:${this.$route.params.messageId}`; },
    messagesPath() { return this.$store.getters.isClient ? '/perfil/mensajes' : '/profile/mensajes'; },
  },
  watch: { identity: { immediate: true, handler() { this.load(); } } },
  beforeUnmount() { this.request++; },
  methods: {
    signin() { showdModal('#signin-modal'); },
    async load() {
      const request = ++this.request;
      this.message = null; this.error = ''; this.loading = false;
      if (!this.authenticated) return;
      if (!messagePath('/mensaje/' + this.$route.params.messageId)) { this.error = 'El enlace del mensaje no es válido.'; return; }
      this.loading = true;
      try {
        const response = await apiSvc.getById('messages', this.$route.params.messageId);
        const message = response.data.data;
        const viewer = String(this.$store.getters.userId);
        if (![String(message.fromId), String(message.toId)].includes(viewer)) throw { response: { status: 403 } };
        if (request !== this.request) return;
        this.message = message;
      } catch (error) {
        if (request !== this.request) return;
        this.error = [403, 404].includes(error.response?.status)
          ? 'Este mensaje no está disponible para tu cuenta. Revisa con qué cuenta iniciaste sesión.'
          : 'No se pudo cargar el mensaje. Inténtalo de nuevo más tarde.';
      } finally { if (request === this.request) this.loading = false; }
    },
  },
};
</script>
