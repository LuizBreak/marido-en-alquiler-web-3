const test = require("node:test");
const assert = require("node:assert/strict");
const load = require("./load-module.cjs");

function setup({ overlay = false, restoredOverflow = "hidden" } = {}) {
  let resets = 0, removedBackdrops = 0, removedClass = false;
  const body = {
    style: { overflow: "hidden", removeProperty(name) { this[name] = ""; } },
    classList: { remove() { removedClass = true; } },
  };
  class ScrollBarHelper { reset() { resets++; body.style.overflow = restoredOverflow; } }
  const { cleanupModalArtifacts } = load("src/services/modal-state.js", {
    "bootstrap/js/dist/util/scrollbar": { default: ScrollBarHelper, __esModule: true },
  }, { document: {
    body, querySelector: () => overlay ? {} : null,
    querySelectorAll: () => [{ remove() { removedBackdrops++; } }],
  } });
  return { cleanupModalArtifacts, body, state: () => ({ resets, removedBackdrops, removedClass }) };
}
test("closing the last dialog clears a stale overflow lock and backdrop", () => {
  const page = setup();
  assert.equal(page.cleanupModalArtifacts(), true);
  assert.equal(page.body.style.overflow, "");
  assert.deepEqual(page.state(), { resets: 1, removedBackdrops: 1, removedClass: true });
});
test("cleanup preserves the lock and backdrop of another open overlay", () => {
  const page = setup({ overlay: true });
  assert.equal(page.cleanupModalArtifacts(), false);
  assert.equal(page.body.style.overflow, "hidden");
  assert.equal(page.state().resets, 0); assert.equal(page.state().removedBackdrops, 0);
});
test("cleanup preserves a legitimate restored overflow setting", () => {
  const page = setup({ restoredOverflow: "scroll" });
  page.cleanupModalArtifacts();
  assert.equal(page.body.style.overflow, "scroll");
});
