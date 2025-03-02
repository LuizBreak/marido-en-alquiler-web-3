<template>
  <!-- Breadcrumb-->
  <nav class="pt-2 mt-5 mx-5" aria-label="Breadcrumb">
    <ol class="breadcrumb">
      <li
        class="breadcrumb-item"
        v-bind:class="{ active: item.isActive }"
        v-for="item in links"
        :key="item.caption"
        v-bind:aria-current="item.aria"
      >
        <a v-show="!item.isActive" v-bind:href="item.url">
          <i class="fas fa-home mx-2" v-if="item.caption == 'Inicio'"></i>
          <span v-show="!item.isActive">{{ item.caption }}</span></a
        >
        <span v-show="item.isActive">{{ item.caption }}</span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: "Breadcrumb",
  props: ["links"],
  data() {
    return {};
  },
  components: {},
};
</script>
