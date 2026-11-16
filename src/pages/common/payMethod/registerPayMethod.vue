<template>
  <section class="card card-body">
    <h2>Formas de Pago</h2>
    <p role="status">Los pagos en línea todavía no están disponibles. No ingrese datos de tarjetas.</p>
    <p v-if="error" role="alert">{{ error }}</p>
    <ul v-if="methods.length" class="list-group">
      <li v-for="method in methods" :key="method.payMethodId" class="list-group-item d-flex justify-content-between align-items-center">
        <span>Tarjeta terminada en {{ method.last4 }}</span>
        <button type="button" class="btn btn-outline-danger" :disabled="busy" @click="remove(method)">Eliminar</button>
      </li>
    </ul>
  </section>
</template>
<script>
import { apiSvc } from "../../../services/api.service";
export default {
  name: "register-pay-method",
  emits: ["child-breadcrumbs-urls"],
  data() { return { methods: [], busy: false, error: "" }; },
  async created() {
    this.$emit("child-breadcrumbs-urls", [{ url: "/", caption: "Inicio", isActive: false }, { url: "/formas-pago", caption: "Formas de Pago", isActive: true, aria: "page" }]);
    try {
      const response = await apiSvc.get(`paymethods/clients/${this.$store.getters.userId}`);
      this.methods = response.data.data || [];
    } catch (_) { this.error = "No se pudo cargar la lista. Inténtelo de nuevo."; }
  },
  methods: {
    async remove(method) {
      this.busy = true; this.error = "";
      try { await apiSvc.delete("paymethods", method); this.methods = this.methods.filter(item => item.payMethodId !== method.payMethodId); }
      catch (_) { this.error = "No se pudo eliminar la tarjeta. Inténtelo de nuevo."; }
      finally { this.busy = false; }
    },
  },
};
</script>
