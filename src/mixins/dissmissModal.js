global.jQuery = require("jquery");
var $ = global.jQuery;

export default {
  methods: {
    dismissModal(modalId) {
      $(modalId).modal("hide");
    },
  },
};
