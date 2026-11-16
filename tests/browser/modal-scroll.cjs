// Run against an isolated Chrome/Edge instance with --remote-debugging-port=9223
// and the running local FE. HTTPS requests are blocked; no AWS writes occur.
const assert = require("node:assert/strict");

async function main() {
  const pages = await (await fetch("http://127.0.0.1:9223/json/list")).json();
  const socket = new WebSocket(pages.find(page => page.type === "page").webSocketDebuggerUrl);
  await new Promise(resolve => { socket.onopen = resolve; });
  let id = 0;
  const pending = new Map();
  socket.onmessage = event => {
    const message = JSON.parse(event.data);
    if (!message.id) return;
    const request = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) request.reject(message.error);
    else request.resolve(message.result);
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const key = ++id;
    pending.set(key, { resolve, reject });
    socket.send(JSON.stringify({ id: key, method, params }));
  });
  const evaluate = async expression => {
    const result = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result?.value;
  };
  const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
  const state = () => evaluate(`({
    overflow: document.body.style.overflow,
    backdrops: document.querySelectorAll('.modal-backdrop').length,
    shown: document.querySelectorAll('.modal.show').length,
    modalOpen: document.body.classList.contains('modal-open')
  })`);
  async function assertUnlocked(label) {
    await pause(700);
    assert.deepEqual(await state(), { overflow: "", backdrops: 0, shown: 0, modalOpen: false }, label);
    const scrolled = await evaluate("window.scrollTo(0, 400); window.scrollY");
    assert.ok(scrolled > 0, `${label}: page must scroll`);
    await evaluate("window.scrollTo(0, 0)");
    console.log(`${label}: body unlocked, no backdrops, page scrolls`);
  }
  try {
    await send("Network.enable");
    await send("Network.setBlockedURLs", { urls: ["https://*"] });
    await send("Page.navigate", { url: "http://127.0.0.1:8080/" });
    let mounted = false;
    for (let attempt = 0; attempt < 100; attempt++) {
      mounted = await evaluate('!!document.querySelector("#signin-modal")');
      if (mounted) break;
      await pause(400);
    }
    assert.ok(mounted, "Local Vue application did not mount");
    const openSignin = () => evaluate(`document.querySelector('[href="#signin-modal"][data-bs-toggle="modal"]').click()`);
    const dismiss = () => evaluate('document.getElementById("app").__vue_app__._instance.proxy.dismissModal("#signin-modal").then(() => true)');

    await openSignin(); await pause(700);
    assert.equal((await state()).backdrops, 1, "Opening one dialog must create one backdrop");
    await dismiss(); await assertUnlocked("Sign-in close");

    await openSignin(); await pause(180); await dismiss();
    await assertUnlocked("Close during opening transition");

    await evaluate('document.getElementById("app").__vue_app__.config.globalProperties.$store.dispatch("triggerMsgBox", { showIt: true, message: "Scroll regression check" })');
    await pause(700);
    assert.equal((await state()).backdrops, 1);
    await evaluate('document.querySelector("#myModal button").click()');
    await assertUnlocked("Save-message close");
  } finally {
    socket.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
