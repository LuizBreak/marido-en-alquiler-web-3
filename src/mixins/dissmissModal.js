import Modal from "bootstrap/js/dist/modal";
import { cleanupModalArtifacts } from "../services/modal-state";

function moveFocusOutsideModal(modalElement) {
  const activeElement = document.activeElement;

  if (!activeElement || !modalElement.contains(activeElement)) {
    return;
  }

  if (typeof activeElement.blur === "function") {
    activeElement.blur();
  }

  const appRoot = document.getElementById("app");
  if (appRoot) {
    appRoot.setAttribute("tabindex", "-1");
    appRoot.focus({ preventScroll: true });
  }
}

export default {
  methods: {
    dismissModal(modalId) {
      const modalElement = document.querySelector(modalId);

      if (!modalElement) {
        cleanupModalArtifacts();
        return Promise.resolve();
      }

      const modalInstance = Modal.getOrCreateInstance(modalElement);
      moveFocusOutsideModal(modalElement);

      if (!modalElement.classList.contains("show") && modalElement.style.display !== "block") {
        cleanupModalArtifacts();
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        let resolved = false;
        const finish = () => {
          if (resolved) {
            return;
          }
          resolved = true;
          modalElement.removeEventListener("shown.bs.modal", hide);
          moveFocusOutsideModal(modalElement);
          cleanupModalArtifacts();
          resolve();
        };

        const hide = () => modalInstance.hide();
        modalElement.addEventListener("hidden.bs.modal", finish, { once: true });
        // Bootstrap ignores hide() during its opening transition; retry on shown.
        modalElement.addEventListener("shown.bs.modal", hide, { once: true });
        hide();
      });
    },
  },
};
