import Modal from "bootstrap/js/dist/modal";

function cleanupModalArtifacts() {
  document
    .querySelectorAll(".modal-backdrop")
    .forEach((backdrop) => backdrop.remove());
  document.body.classList.remove("modal-open");
  document.body.style.removeProperty("padding-right");
}

export default {
  methods: {
    dismissModal(modalId) {
      const modalElement = document.querySelector(modalId);

      if (!modalElement) {
        return Promise.resolve();
      }

      const modalInstance = Modal.getOrCreateInstance(modalElement);
      const activeElement = document.activeElement;

      if (activeElement && modalElement.contains(activeElement)) {
        activeElement.blur();
      }

      return new Promise((resolve) => {
        let resolved = false;
        const finish = () => {
          if (resolved) {
            return;
          }
          resolved = true;
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
