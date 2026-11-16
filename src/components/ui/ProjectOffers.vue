<template>
  <section class="card card-body border-0 shadow-sm mb-4" :data-project-offers="project.projectId">
    <div class="d-flex align-items-center justify-content-between gap-3">
      <h3 class="h5 mb-0">Ofertas recibidas</h3>
      <button type="button" class="btn btn-outline-primary btn-sm" @click="toggle">{{ expanded ? 'Ocultar ofertas' : 'Ver ofertas' }}</button>
    </div>
    <div v-if="expanded" class="mt-3">
      <p v-if="loading" role="status">Cargando ofertas...</p>
      <p v-else-if="!quotes.length">Todavía no has recibido ofertas para este proyecto.</p>
      <article v-for="quote in quotes" :key="quote.quoteId" class="border rounded p-3 mb-3" :data-quote-id="quote.quoteId">
        <div class="d-flex justify-content-between gap-3"><h4 class="h6">{{ contractorName(quote) }}</h4><strong>${{ price(quote.bidPrice) }}</strong></div>
        <p class="text-break">{{ quote.bidDescription }}</p>
        <span v-if="Number(quote.clientConfirmation) === 1" class="badge bg-success">Oferta aceptada</span>
        <button v-else-if="canAccept" type="button" class="btn btn-primary btn-sm" :disabled="busy || !quote.version" @click="accept(quote)">Aceptar oferta</button>
        <span v-else class="text-muted">Sin seleccionar</span>
      </article>
    </div>
    <button v-if="project.status === 'asignado'" type="button" class="btn btn-outline-primary mt-3 align-self-start" :disabled="busy" @click="complete">Marcar proyecto como completado</button>
    <p v-if="message" class="text-success mt-3 mb-0" role="status">{{ message }}</p>
    <p v-if="error" class="text-danger mt-3 mb-0" role="alert">{{ error }}</p>
  </section>
</template>
<script>
import { apiSvc } from '../../services/api.service';
export default {
  name: 'project-offers',
  props: { project: { type: Object, required: true } },
  data() { return { quotes: [], expanded: false, loading: false, busy: false, error: '', message: '' }; },
  computed: { canAccept() { return this.project.status === 'created' && !Number(this.project.contractorId); } },
  methods: {
    price(value) { return Number(value).toFixed(2); },
    contractorName(quote) { return quote.contractorCompanyName || [quote.contractorFirstName, quote.contractorLastName].filter(Boolean).join(' ') || `Contratista ${quote.contractorId}`; },
    failure(error) { return error.response?.status === 409 ? 'La oferta o el proyecto cambió. Revisa los datos actuales antes de continuar.' : error.response?.status === 403 ? 'No tienes permiso para realizar esta acción.' : 'No se pudo guardar el cambio. Inténtalo de nuevo.'; },
    async load() { this.loading = true; try { this.quotes = await this.$store.dispatch('quotes/getQuotesByProject', { projectId: this.project.projectId }); } finally { this.loading = false; } },
    async toggle() { this.expanded = !this.expanded; if (this.expanded) { this.error = ''; try { await this.load(); } catch (error) { this.error = this.failure(error); } } },
    async accept(quote) {
      if (this.busy || !window.confirm(`¿Aceptar la oferta de ${this.contractorName(quote)} por $${this.price(quote.bidPrice)}?`)) return;
      this.busy = true; this.error = ''; this.message = '';
      try { await this.$store.dispatch('quotes/acceptQuote', quote); await this.load(); this.message = 'Oferta aceptada. El contratista fue asignado al proyecto.'; }
      catch (error) { this.error = this.failure(error); if (error.response?.status === 409) { try { await this.load(); const response = await apiSvc.getById('projects', this.project.projectId); this.$store.commit('projects/SET_PROJECT', response.data.data); } catch (_) { /* Retain the original conflict message. */ } } }
      finally { this.busy = false; }
    },
    async complete() {
      if (this.busy || !window.confirm('¿Marcar este proyecto como completado?')) return;
      this.busy = true; this.error = ''; this.message = '';
      try { const response = await apiSvc.update('projects', this.project, { status: 'completado' }); this.$store.commit('projects/SET_PROJECT', response.data.data); this.message = 'Proyecto completado. Ya puedes compartir tu experiencia.'; }
      catch (error) { this.error = this.failure(error); }
      finally { this.busy = false; }
    },
  },
};
</script>
