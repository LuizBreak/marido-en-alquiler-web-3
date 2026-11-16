import ScrollBarHelper from "bootstrap/js/dist/util/scrollbar";

export function cleanupModalArtifacts() {
  // Closing one overlay must not unlock the page underneath another overlay.
  if (document.querySelector(".modal.show, .offcanvas.show, .offcanvas.showing")) return false;

  new ScrollBarHelper().reset();
  // Older duplicate Bootstrap instances could save "hidden" as the prior value.
  if (document.body.style.overflow === "hidden") {
    document.body.style.removeProperty("overflow");
  }
  document.body.classList.remove("modal-open");
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => backdrop.remove());
  return true;
}
