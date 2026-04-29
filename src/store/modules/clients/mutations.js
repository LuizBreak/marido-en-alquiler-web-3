export default {
  SET_CLIENTS(state, clients) {
    state.clients = [];
    for (const x of JSON.parse(clients)) {
      state.favorites.push(x);
    }
  },
  SET_CLIENT(state, client) {
    state.client = JSON.parse(client);
  },
  ADD_NEW_CLIENT(state, client) {
    state.clients.push(client);
  },
  DELETE_CLIENT(state, client) {
    let index = state.clients.indexOf(client);
    if (index > -1) {
      state.clients.splice(index, 1);
    }
    state.client = {};
  },
  UPDATE_CLIENT(state, client) {
    state.clients[client.id] = client;
    state.client = client;
  },
  RESET_CLIENT(state) {
    state.client = {};
  },
};
