export default {
  clients(state) {
    return state.clients;
  },
  client(state) {
    return state.client;
  },
  hasClients(state) {
    return state.clients && state.clients.length > 0;
  },
};
