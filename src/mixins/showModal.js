import Modal from "bootstrap/js/dist/modal";
import { cleanupModalArtifacts } from "../services/modal-state";

export function showdModal(modalId) {
  const modalElement = document.querySelector(modalId);

  if (!modalElement) {
    return;
  }

  cleanupModalArtifacts();
  Modal.getOrCreateInstance(modalElement).show();
}
