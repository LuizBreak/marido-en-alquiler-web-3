export default {
  methods: {
    SetPwdVisibility(elementId) {
      let x = document.getElementById(elementId);
      // console.log("elementId", x.id);
      // console.log("visibility", x.type);

      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    },
  },
};
