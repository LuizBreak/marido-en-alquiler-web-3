<template>
  <head>
    <link href="filepond.css" rel="stylesheet" />
  </head>
  <file-pond
    class="file-uploader file-uploader-grid"
    name="fileUploader"
    ref="pond"
    label-idle="Arrastrar tu
  archivo aqui..."
    v-bind:allow-multiple="false"
    accepted-file-types="image/jpeg, image/png, image/jpg"
    v-bind:files="myFiles"
    v-on:addfile="handleFilePondAddFile"
  />
  <!-- stylePanelLayout="integrated"
    stylePanelAspectRatio="1:1" -->
  <!-- v-on:init="handleFilePondInit" -->
  <!-- this propperty connect to the backend upload api??? -->
  <!-- server="/api" -->
</template>

<script>
// Article Reference: https://dev.to/pqina/how-to-upload-files-with-vue-and-filepond-1m02
// To Implement: aws s3 upload: https://pqina.nl/filepond/docs/api/server/#advanced

// Import Vue FilePond
import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// import { s3Svc } from "../../services/s3.services.js";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  emits: ["pass-selected-files"],
  name: "image-uploader",
  components: {
    FilePond,
  },
  data: function () {
    return {
      myFiles: [],
    };
  },
  methods: {
    handleFilePondInit: function () {
      console.log("FilePond has initialized");
      this.$refs.pond.getFiles();
      // FilePond instance methods are available on `this.$refs.pond`
    },
    onUploadImage(event) {
      // console.log("FilePond has uploaded an image", event);
      // no need pf s3Svc since parents is actually handling the upload instead
      // s3Svc.uploadFile(this.myFiles);
      // this.myFiles.push(event.target.files[0]);
      this.$emit("pass-selected-files", event);
    },
    handleFilePondAddFile: function (error, file) {
      // https://github.com/pqina/vue-filepond/issues/12
      // console.log("add file", error, file.file);
      this.$emit("pass-selected-files", file.file);
    },
  },
};
</script>
