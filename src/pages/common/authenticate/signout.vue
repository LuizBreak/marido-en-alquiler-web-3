<template>
  <base-dialog :show="isLoading" title="Cerrando Sesión..." fixed>
    <base-spinner></base-spinner>
  </base-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Signout",
  components: {},
  data() {
    return {
      isLoading: true,
      urls: [
        { url: "/", caption: "Inicio", isActive: false, aria: "" },
        {
          url: "/signout",
          caption: "Signout",
          isActive: true,
          aria: "page",
        },
      ],
    };
  },
  methods: {
    async logout() {
      this.logIt(
        this?.loggedUser?.id,
        "logout for: " + this?.loggedUser?.email || "",
        this.$options.name,
        this?.user?.signInUserSession?.idToken?.jwtToken,
        true
      );
      await this.$store.dispatch("logout");
      this.isLoading = false;
      this.$router.replace("/");
    },
    timeout(ms) {
      // Making SetTimeout accept promises
      // Article reference: https://stackoverflow.com/questions/33289726/combination-of-async-function-await-settimeout
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async sleep(fn, ...args) {
      await this.timeout(3000);
      return fn(...args);
    },
  },
  computed: {
    ...mapGetters(["loggedUser", "user"]),
  },
  async created() {},
  async mounted() {
    this.isLoading = true;
    this.sleep(this.logout);
  },
};
</script>

<style scoped></style>
