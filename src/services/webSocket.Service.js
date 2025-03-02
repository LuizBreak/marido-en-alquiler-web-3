let webSocketsService = {};

webSocketsService.install = function (Vue, options) {
  console.log("webSocketsService.install.Enter");
  let socket = new WebSocket(options.url);
  let reconnectInterval = options.reconnectInterval || 1000;

  Vue.prototype.$webSocketsConnect = () => {
    socket = new WebSocket(options.url);

    socket.onopen = () => {
      // Restart reconnect interval
      reconnectInterval = options.reconnectInterval || 1000;
    };

    socket.onmessage = (event) => {
      // New message from the backend - use JSON.parse(event.data)
      handleNotification(event);
    };

    socket.onclose = (event) => {
      if (event) {
        // Event.code 1000 is our normal close event
        if (event.code !== 1000) {
          let maxReconnectInterval = options.maxReconnectInterval || 3000;
          setTimeout(() => {
            if (reconnectInterval < maxReconnectInterval) {
              // Reconnect interval can't be > x seconds
              reconnectInterval += 1000;
            }
            Vue.prototype.$webSocketsConnect();
          }, reconnectInterval);
        }
      }
    };

    socket.onerror = (error) => {
      console.log(error);
      socket.close();
    };
  };

  Vue.prototype.$webSocketsDisconnect = () => {
    // Our custom disconnect event
    socket.close();
  };

  Vue.prototype.$webSocketsSend = (data) => {
    // Send data to the backend - use JSON.stringify(data)
    socket.send(JSON.stringify(data));
  };

  /*
    Here we write our custom functions to not make a mess in one function
  */
  function handleNotification(params) {
    console.log(params);
    options.store.dispatch("notifications/setNotifications", params.data);
  }
};

export default webSocketsService;
