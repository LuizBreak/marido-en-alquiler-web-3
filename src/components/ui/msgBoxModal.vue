<template>
  <!-- =============================================== -->
  <!--    MsgBox (Modal)                               -->
  <!-- =============================================== -->

  <!-- Article Reference: https://www.htmlgoodies.com/javascript/customizing-bootstrap-modals/ -->

  <div class="container">
    <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              v-on:click="HideDialog()"
              data-dismiss="modal"
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
              v-on:click="HideDialog()"
              data-dismiss="modal"
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
import store from "../../store/index.js";

// Loading jquery into the app
global.jQuery = require("jquery");
var $ = global.jQuery;

window.$ = document.addEventListener("DOMContentLoaded", function () {
  $("#myModal").on("show.bs.modal", function () {
    // hide it after 3 seconds
    let myModalTimeout = setTimeout(function () {
      $("#myModal").modal("hide");
      store.dispatch("resetShowIt", {
        showIt: false,
      });
    }, 3000);
    "ModalTimeout", myModalTimeout;
  });
});

export default {
  name: "msg-box-modal",
  data() {
    return {};
  },
  props: {},
  methods: {
    HideDialog() {
      $("#myModal").modal("hide");
    },
    showDialog() {
      $("#myModal").modal("show");
    },
  },
  computed: {
    showIt() {
      return this.$store.getters.showIt;
    },
    modalMessage() {
      return this.$store.getters.modalMessage;
    },
  },
  watch: {
    showIt() {
      if (this.showIt) {
        this.showDialog();
      } else {
        this.HideDialog();
      }
    },
  },
};
</script>
