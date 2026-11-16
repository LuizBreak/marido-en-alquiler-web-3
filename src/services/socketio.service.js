// Historical class name retained for callers; this uses native WebSocket.
export class SocketioService {
  constructor(loggedUserId) {
    this.loggedUserId = loggedUserId;
    this.socket = null;
    this.options = null;
    this.listeners = [];
    this.pulseTimer = null;
    this.reconnectTimer = null;
    this.generation = 0;
    this.stopped = true;
  }
  connect(options) {
    return new Promise((resolve, reject) => {
      const socket = new WebSocket(options.url);
      const generation = this.generation;
      this.socket = socket;
      let opened = false;
      socket.onopen = () => {
        if (this.stopped || generation !== this.generation) { socket.close(1000); reject(new Error("Connection cancelled.")); return; }
        opened = true;
        this.reconnectInterval = options.reconnectInterval || 1000;
        for (const [name, callback, option] of this.listeners) socket.addEventListener(name, callback, option);
        this.clearPulse();
        this.pulseTimer = setInterval(() => this.pulse(), options.pulseInterval || 60000);
        this.sendMessage({ action: "setName", id: this.loggedUserId });
        resolve(socket);
      };
      socket.onerror = () => {
        if (!opened) reject(new Error("WebSocket connection failed."));
        socket.close();
      };
      socket.onclose = event => {
        if (generation !== this.generation) return;
        this.clearPulse();
        if (!opened) reject(new Error("WebSocket closed before opening."));
        if (!this.stopped && event.code !== 1000) this.scheduleReconnect();
      };
    });
  }
  async setupSocketConnection(options) {
    this.disconnect();
    this.stopped = false;
    this.options = options;
    this.loggedUserId = options.loggedUserId ?? this.loggedUserId;
    this.reconnectInterval = options.reconnectInterval || 1000;
    return this.connect(options);
  }
  scheduleReconnect() {
    if (this.stopped || this.reconnectTimer !== null) return;
    const delay = this.reconnectInterval;
    this.reconnectInterval = Math.min(delay * 2, this.options.maxReconnectInterval || 30000);
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      if (!this.stopped) this.connect(this.options).catch(() => this.scheduleReconnect());
    }, delay);
  }
  sendMessage(payload) {
    if (!this.socket || this.socket.readyState !== 1) return false;
    this.socket.send(JSON.stringify(payload));
    return true;
  }
  addEventListener(name, callback, option = false) {
    if (!this.listeners.some(entry => entry[0] === name && entry[1] === callback && entry[2] === option)) {
      this.listeners.push([name, callback, option]);
      if (this.socket) this.socket.addEventListener(name, callback, option);
    }
  }
  clearPulse() {
    if (this.pulseTimer !== null) clearInterval(this.pulseTimer);
    this.pulseTimer = null;
  }
  disconnect() {
    this.stopped = true;
    this.generation++;
    this.clearPulse();
    if (this.reconnectTimer !== null) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = null;
    if (this.socket) {
      for (const [name, callback, option] of this.listeners) this.socket.removeEventListener(name, callback, option);
      this.socket.close(1000);
    }
    this.socket = null;
  }
  pulse() {
    return this.sendMessage({ action: "keepItAlive", to: this.loggedUserId, message: "keepItAlive" });
  }
  reconnect() { this.scheduleReconnect(); }
}
