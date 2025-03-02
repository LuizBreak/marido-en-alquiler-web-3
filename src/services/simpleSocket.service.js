import store from "../store/index";
var activeUser = 0;

export var socket = new WebSocket(process.env.VUE_APP_WEB_SOCKET);

// eslint-disable-next-line no-unused-vars
socket.onopen = function (e) {
  const rightNow = new Date().toLocaleTimeString();
  activeUser = store.getters.loggedUser.id;
  // console.log("getter", store.getters.loggedUser.id);

  console.log(
    "[open] Connection established at " +
      rightNow +
      " to: " +
      process.env.VUE_APP_WEB_SOCKET +
      " for user: " +
      activeUser
  );
  // pulse websocket every 30 seconds
  // setInterval(function () {
  //   pulse();
  // }, 30000);
};
// function pulse() {
//   const payload = {
//     to: activeUser,
//     message: "keepItAlive from " + activeUser,
//   };
//   socket.send(
//     JSON.stringify({
//       action: "keepItAlive",
//       ...payload,
//     })
//   );
// }

socket.onmessage = function (event) {
  console.log(`[message] Data received from server: ${event.data} `);
};

socket.onclose = function (event) {
  console.log("onclose.enter");
  const rightNow = new Date().toLocaleTimeString();
  if (event.wasClean) {
    alert(
      `[close] Connection closed cleanly at ` +
        rightNow +
        `, code=${event.code} reason=${event.reason}`
    );
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    console.log("[close] Connection died");
  }

  // TODO: implement proper reconnection logict
  //       pulse() does the job for now
  return start(process.env.VUE_APP_WEB_SOCKET);
};

socket.onerror = function (error) {
  console.log(`[error] ${error.message}`);
};

/*
 * Article Reference: https://stackoverflow.com/questions/3780511/reconnection-of-client-when-server-reboots-in-websocket
 */
// eslint-disable-next-line no-unused-vars
function start(websocketServerLocation) {
  // alert("websocket.start -> reconnecting");
  console.log("websocket.start -> reconnecting");

  // eslint-disable-next-line no-const-assign
  socket = new WebSocket(websocketServerLocation);
  // TODO: How to have acces to my Vue?
  // Vue.config.globalProperties.$vueSocketIo
  // this.$socket = socket;

  // ws.onmessage = function(evt) { alert('message received'); };
  socket.onclose = function () {
    // Try to reconnect in 5 seconds
    setTimeout(function () {
      start(websocketServerLocation);
    }, 5000);
  };
  return socket;
}
