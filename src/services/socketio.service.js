// import store from "../store/index";

// Article Reference: https://deepinder.me/creating-a-real-time-chat-app-with-vue-socket-io-and-nodejs

export class SocketioService {
  websocketServerLocation = null;
  socket = null;
  loggedUserId = null;
  reconnectInterval = 5000;
  maxReconnectInterval = 3000;
  pulseInterval = 120000;
  options;

  constructor(loggedUserId) {
    // console.log("constructor.Enter", loggedUserId);
    this.loggedUserId = loggedUserId;
  }

  async connect(options) {
    // Article Reference: https://stackoverflow.com/questions/42304996/javascript-using-promises-on-websocket
    return new Promise(function (resolve, reject) {
      var socket = new WebSocket(options.url);

      socket.onopen = function () {
        // console.log("onopen.Enter");

        const rightNow = new Date().toLocaleTimeString();
        this.reconnectInterval = options.reconnectInterval || 1000;
        this.websocketServerLocation = options.url;

        console.log(
          "[class-> open] Connection established at " +
            rightNow +
            " to: " +
            process.env.VUE_APP_WEB_SOCKET +
            " for user: " +
            this.activeUser
        );

        socket.onmessage = (event) => {
          // console.log("onmessage.Enter");
          console.log(`[message] Data received from server: ${event.data} `);
          // this.handleNotification(event);
        };

        resolve(socket);
      };

      socket.onerror = function (err) {
        reject(err);
      };
    });
  }
  async setupSocketConnection(options) {
    console.log("setupSocketConnection.Enter");

    await this.connect(options)
      .then((socket) => {
        this.socket = socket;
        this.options = options;
        this.reconnectInterval = options.reconnectInterval || 1000;
        this.pulseInterval = options.pulseInterval;
        this.loggedUserId = options.loggedUserId;

        socket.onclose = (event) => {
          if (event) {
            // Event.code 1000 is our normal close event
            if (event.code !== 1000) {
              let maxReconnectInterval = options.maxReconnectInterval || 3000;
              setTimeout(() => {
                if (this.reconnectInterval < maxReconnectInterval) {
                  // Reconnect interval can't be > x seconds
                  this.reconnectInterval += 1000;
                }
                this.reconnect(process.env.VUE_APP_WEB_SOCKET);
              }, this.reconnectInterval);
            }
          }
        };

        this.socket.onerror = (error) => {
          // console.log("socket.onerror.Enter");
          console.log(`[error] ${error.message}`);
          this.socket.close();
        };

        // pulse websocket every 30 seconds
        var t = this;
        setInterval(function () {
          t.pulse();
        }, this.pulseInterval || 60000);

        // log the user in
        const action = { action: "setName", id: this.loggedUserId };
        this.sendMessage(action);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  async sendMessage(payload) {
    // console.log("sendMessage.Enter", [payload, this.socket.readyState]);
    try {
      await this.socket.send(JSON.stringify(payload));
    } catch (error) {
      console.log(error);
    }
  }

  async addEventListener(eventName, callBack, option) {
    await this.socket.addEventListener(eventName, callBack, option);
  }
  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
  async pulse() {
    console.log("this.pulseInterval", this.pulseInterval);
    const payload = {
      action: "keepItAlive",
      to: this.loggedUserId,
      message: "keepItAlive from " + this.loggedUserId,
    };
    this.sendMessage(payload);
  }
  reconnect(websocketServerLocation) {
    // console.log("reconnect.Enter");

    this.setupSocketConnection(this.options);
    // console.log("new socket", this.socket);

    this.socket.onclose = function () {
      // Try to reconnect in 5 seconds
      setTimeout(function () {
        this.restart(websocketServerLocation);
      }, 5000);
    };
  }
  // Make the function wait until the connection is made...
  waitForSocketConnection(socket, callback) {
    setTimeout(function () {
      if (socket.readyState === 1) {
        console.log("Connection is made");
        if (callback != null) {
          callback();
        }
      } else {
        console.log("wait for connection...");
        this.waitForSocketConnection(socket, callback);
      }
    }, 5); // wait 5 milisecond for the connection...
  }
  handleNotification(params) {
    console.log(params);
    // store.dispatch("notifications/setNotifications", params.data);
  }
  async sendWithConnectionVerificationXXX(payload) {
    // Wait until the state of the socket is not ready and send the message when it is...
    // this.waitForSocketConnection(this.socket, this.sendItNow(payload));
    this.sendItNow(payload);
    // TODO: Implement the queue approach may be a good one
    /// interesting approach: https://stackoverflow.com/questions/13546424/how-to-wait-for-a-websockets-readystate-to-change
    // if (this.socket.readyState !== 1) {
    //   this.queuedMsgs.push(payload);
    // } else {
    //   this.socket.send(payload);
    // }
  }
}
