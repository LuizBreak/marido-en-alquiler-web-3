<template>
  <base-dialog :show="isLoading" title="Cerrando Sesión..." fixed>
    <base-spinner></base-spinner>
  </base-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  emits: ["child-breadcrumbs-urls"],
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
  },
  computed: {
    ...mapGetters(["loggedUser", "user"]),
  },
  async created() {},
  async mounted() {
    this.$emit("child-breadcrumbs-urls", this.urls);
    this.isLoading = true;
    await this.logout();
  },
};
</script>

<style scoped></style>
