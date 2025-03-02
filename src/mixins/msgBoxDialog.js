export default {
  methods: {
    triggerMsgBox: function (showIt, message) {
      // console.log("mixin.msgbox issued");
      this.$store.dispatch("triggerMsgBox", {
        showIt,
        message,
      });
    },
  },
};
