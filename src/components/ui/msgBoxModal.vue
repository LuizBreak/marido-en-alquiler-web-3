<template>
  <!-- =============================================== -->
  <!--    MsgBox (Modal)                               -->
  <!-- =============================================== -->

  <div class="container">
    <div
      class="modal fade"
      id="myModal"
      ref="modal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              @click="hideDialog"
              aria-label="Close"
            >
              <i class="fas fa-times"></i>
            </button>
            <h2 class="modal-title title text-danger" style="font-size: 20px">
              Marido-en-alquiler
            </h2>
          </div>
          <div class="modal-body">
            <p id="modalContent">{{ modalMessage }}</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="hideDialog"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";

export default {
  name: "msg-box-modal",
  data() {
    return {
      autoHideTimeout: null,
      modalInstance: null,
    };
  },
  computed: {
    showIt() {
      return this.$store.getters.showIt;
    },
    modalMessage() {
      return this.$store.getters.modalMessage;
    },
  },
  methods: {
    clearAutoHideTimeout() {
      if (this.autoHideTimeout) {
        clearTimeout(this.autoHideTimeout);
        this.autoHideTimeout = null;
      }
    },
    scheduleAutoHide() {
      this.clearAutoHideTimeout();
      this.autoHideTimeout = setTimeout(() => {
        this.hideDialog();
      }, 3000);
    },
    resetShowIt() {
      if (this.$store.getters.showIt) {
        this.$store.dispatch("resetShowIt");
      }
    },
    hideDialog() {
      this.clearAutoHideTimeout();
      this.modalInstance?.hide();
      this.resetShowIt();
    },
    showDialog() {
      this.modalInstance?.show();
      this.scheduleAutoHide();
    },
  },
  watch: {
    showIt(value) {
      if (value) {
        this.showDialog();
        return;
      }

      this.clearAutoHideTimeout();
      this.modalInstance?.hide();
    },
  },
  mounted() {
    this.modalInstance = Modal.getOrCreateInstance(this.$refs.modal);
    this.$refs.modal.addEventListener("hidden.bs.modal", this.resetShowIt);
  },
  beforeUnmount() {
    this.clearAutoHideTimeout();
    this.$refs.modal?.removeEventListener("hidden.bs.modal", this.resetShowIt);
    this.modalInstance?.dispose();
  },
};
</script>
