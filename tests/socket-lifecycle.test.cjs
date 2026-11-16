const test = require("node:test");
const assert = require("node:assert/strict");
const load = require("./load-module.cjs");
test("socket reconnect restores listeners and disconnect clears all timers", async () => {
  const sockets = [], intervals = new Map(), timeouts = new Map();
  let id = 0;
  class Socket {
    constructor(url, protocols) { this.readyState = 0; this.protocols = protocols; this.listeners = []; this.sent = []; sockets.push(this); }
    addEventListener(name, callback) { this.listeners.push([name, callback]); }
    removeEventListener(name, callback) { this.listeners = this.listeners.filter(x => x[0] !== name || x[1] !== callback); }
    send(payload) { this.sent.push(payload); }
    close(code = 1006) { this.readyState = 3; if (this.onclose) this.onclose({ code }); }
    open() { this.readyState = 1; this.onopen(); }
  }
  const { SocketioService } = load("src/services/socketio.service.js", {}, {
    WebSocket: Socket,
    setInterval: fn => { intervals.set(++id, fn); return id; },
    clearInterval: key => intervals.delete(key),
    setTimeout: fn => { timeouts.set(++id, fn); return id; },
    clearTimeout: key => timeouts.delete(key),
  });
  const service = new SocketioService(4);
  const connecting = service.setupSocketConnection({ url: "ws://test.invalid", getToken: async () => 'first.token.signature' });
  await new Promise(setImmediate);
  sockets[0].open(); await connecting;
  assert.deepEqual(Array.from(sockets[0].protocols), ['marido-chat', 'auth.first.token.signature']);
  assert.equal(sockets[0].sent.length, 0);
  const listener = () => {};
  service.addEventListener("message", listener);
  sockets[0].close();
  assert.equal(intervals.size, 0); assert.equal(timeouts.size, 1);
  const timer = timeouts.entries().next().value; timeouts.delete(timer[0]); timer[1]();
  await new Promise(setImmediate);
  sockets[1].open(); await Promise.resolve();
  assert.equal(sockets[1].listeners.length, 1); assert.equal(intervals.size, 1);
  service.disconnect();
  assert.equal(intervals.size, 0); assert.equal(timeouts.size, 0);
  assert.equal(sockets[1].listeners.length, 0); assert.equal(service.sendMessage({}), false);
});
