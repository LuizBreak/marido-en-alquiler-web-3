import store from "../store/index";

export class Client {
  constructor(clientInfo) {
    this.SetProperties(clientInfo);
  }

  // "[ Properties ]"
  data = {};

  // [ Public & Private Methods ]
  SetProperties(clientInfo) {
    if (Object.keys(clientInfo).length > 0) {
      this.data = { ...clientInfo };
    }
  }
  validate(clientInfo) {
    if (Object.keys(clientInfo).length > 0) {
      return true;
    } else {
      throw new Error("Invalid client informaiton provided.");
    }
  }
  async add(clientInfo) {
    this.SetProperties(clientInfo);
    if (this.validate(this.data)) {
      this.data.updatedAt = new Date();
      await store
        .dispatch("clients/createClient", this.data, {
          root: true,
        })
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    }
  }
  async update(clientInfo) {
    this.SetProperties(clientInfo);
    if (this.validate(this.data)) {
      this.data.updatedAt = new Date();
      await store
        .dispatch("clients/updateClient", this.data, {
          root: true,
        })
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    }
  }
  async delete(id) {
    await store
      .dispatch("clients/deleteClient", { id: id }, { root: true })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
  getAll() {
    try {
      this.$store.dispatch("clients/fetchClients", {});
    } catch (e) {
      console.error(e);
    }
  }
  getById(id) {
    try {
      this.$store.dispatch("clients/fetchClient", { id: id });
    } catch (e) {
      console.error(e);
    }
  }
  hasClients() {
    return store.getters["clients/hasClients"];
  }
  theClient() {
    return store.getters["clients/client"];
  }
  allClients() {
    return store.getters["clients/clients"];
  }
  #toJson() {
    return {
      // TODO: Finalize toJason
      id: this.data.id,
      updatedAt: this.data.updatedAt,
    };
  }
}
