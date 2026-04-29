import Modal from "bootstrap/js/dist/modal";

function cleanupModalArtifacts() {
  document
    .querySelectorAll(".modal-backdrop")
    .forEach((backdrop) => backdrop.remove());
  document.body.classList.remove("modal-open");
  document.body.style.removeProperty("padding-right");
}

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
        return Promise.resolve();
      }

      const modalInstance = Modal.getOrCreateInstance(modalElement);
      moveFocusOutsideModal(modalElement);

      return new Promise((resolve) => {
        let resolved = false;
        const finish = () => {
          if (resolved) {
            return;
          }
          resolved = true;
          moveFocusOutsideModal(modalElement);
          cleanupModalArtifacts();
          resolve();
        };

        modalElement.addEventListener("hidden.bs.modal", finish, { once: true });
        modalInstance.hide();

        setTimeout(finish, 250);
      });
    },
  },
};
