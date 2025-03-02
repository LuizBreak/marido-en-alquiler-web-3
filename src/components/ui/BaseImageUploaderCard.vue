<template>
  <div>
    <section class="card card-body border-0 shadow-sm p-4 mb-4" id="photos">
      <h2 class="h4 mb-4">
        <i class="fi-image text-primary fs-5 mt-n1 me-2"></i>Fotos
      </h2>
      <div class="alert alert-info mb-4" role="alert">
        <div class="d-flex">
          <i class="fi-alert-circle me-2 me-sm-3"></i>
          <p class="fs-sm mb-1">
            El tamaño máximo de la foto es de 8 MB. Formatos: jpeg, jpg, png.
            Pon primero la imagen principal.<br />
          </p>
        </div>
      </div>
      <img-uploader @pass-selected-files="onEmitFileSelected" />
    </section>
  </div>
</template>

<script>
import imgUploader from "./imageUpload.vue";

export default {
  emits: ["pass-selected-files"],
  name: "base-image-uploader",
  props: [],
  components: { imgUploader },
  data() {
    return {};
  },
  methods: {
    onEmitFileSelected(file) {
      this.$emit("pass-selected-files", file);
    },
  },
  computed: {},
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
