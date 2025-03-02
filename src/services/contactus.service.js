import store from "../store/index";

export class ContactUs {
  constructor(payload) {
    if (payload) {
      this.data.userId = payload.userId || "";
      this.data.firstName = payload.firstName || "";
      this.data.email = payload.email || "";
      this.data.messageType = payload.messageType || "";
      this.data.message = payload.message || "";
      this.data.updatedAt = payload.updatedAt || "";
    }
  }
  // "[ Properties ]"
  IsValid = true;
  data = {};

  // [ Public & Private Methods ]
  validate() {
    if (this.data.email === "" || this.data.message === "") {
      this.IsValid = false;
    }
    return this.IsValid;
  }
  async add() {
    await store
      .dispatch("contactus/addContactus", this.data, { root: true })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
  update() {
    console.log("update.enter ");
    throw new Error("Not Implemented");
  }
  delete(id) {
    console.log("delete.enter " + id);
    throw new Error("Not Implemented");
  }
  getAll() {
    console.log("getAll.enter ");
    throw new Error("Not Implemented");
  }
  getById(id) {
    console.log("getById.enter " + id);
    throw new Error("Not Implemented");
  }
  hasContactUs() {
    return store.getters["contactus/hasContactUs"];
  }
  contactus() {
    return store.getters["contactus/contactus"];
  }
  #toJson() {
    return {
      id: this.data.id,
      userId: this.data.userId,
      firstName: this.data.firstName,
      messageType: this.data.messageType,
      message: this.data.message,
      updatedAt: this.data.updatedAt,
    };
  }
}
