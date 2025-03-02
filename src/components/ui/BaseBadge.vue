<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ["type", "title"],
  computed: {
    text() {
      return this.title;
    },
  },
};
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
  margin-bottom: 0.2rem;
}

.pintura {
  background-color: #3d008d;
  color: white;
}

.plomeria {
  background-color: #71008d;
  color: white;
}

.remodelacion {
  background-color: #f33ecc;
  color: white;
}
.eletricidad {
  background-color: #f69515;
  color: white;
}
.aire {
  background-color: #1d6623;
  color: white;
}
</style>
