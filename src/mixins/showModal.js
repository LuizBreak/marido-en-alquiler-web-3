global.jQuery = require("jquery");
var $ = global.jQuery;

export function showdModal(modalId) {
  $(modalId).modal("show");
}
