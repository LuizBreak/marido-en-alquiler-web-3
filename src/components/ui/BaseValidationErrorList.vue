<template>
  <div
    class="input-errors text-danger"
    v-for="error of errors"
    :key="error.$uid"
  >
    <div class="error-msg">{{ error.$message }}</div>
  </div>
</template>

<script>
export default {
  props: ["errors"],
  name: "error-list",
};
</script>

<style scoped></style>
