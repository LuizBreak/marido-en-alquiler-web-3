import Modal from "bootstrap/js/dist/modal";

function cleanupModalArtifacts() {
  document
    .querySelectorAll(".modal-backdrop")
    .forEach((backdrop) => backdrop.remove());
  document.body.classList.remove("modal-open");
  document.body.style.removeProperty("padding-right");
}

export function showdModal(modalId) {
  const modalElement = document.querySelector(modalId);

  if (!modalElement) {
    return;
  }

  cleanupModalArtifacts();
  Modal.getOrCreateInstance(modalElement).show();
}
