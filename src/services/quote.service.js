import store from "../store/index";

export class Quote {
  constructor(projectId, contractorId, bidPrice, bidDescription, updatedAt) {
    this.projectId = projectId || "";
    this.contractorId = contractorId || "";
    this.bidPrice = bidPrice || "";
    this.bidDescription = bidDescription || "";
    this.updatedAt = updatedAt || "";

    this.agreedPrice = 0;
    this.quoteState = "created";
    this.clientConfirmation = false;
    this.confirmationDate = null;
    this.clientComments = null;
  }
  // "[ Properties ]"
  IsValid = true;

  isNumber(value) {
    return typeof value === "number" && isFinite(value);
  }

  // [ Public & Private Methods ]
  validate() {
    if (this.biddescription === "") {
      this.IsValid = false;
    }
    return this.IsValid;
  }
  add() {
    const ds = {
      projectId: this.projectId,
      contractorId: this.contractorId,
      bidPrice: this.bidPrice,
      bidDescription: this.bidDescription,
      expireYear: this.expireYear,
      updatedAt: this.updatedAt,
      agreedPrice: 0,
      quoteState: "created",
      clientConfirmation: false,
      confirmationDate: null,
      clientComments: null,
    };
    // console.log("svc ds", ds);
    store
      .dispatch("quotes/createQuote", ds, { root: true })
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
    console.log("delgetByIdete.enter " + id);
    throw new Error("Not Implemented");
  }
  async getByProjectId(id) {
    console.log("svc.getByProjectId.enter " + id);
    await store
      .dispatch("quotes/getByProjectId", {
        clientId: id,
      })
      .catch(() => {
        console.log("Error refreshing quote list");
      });
  }
  hasQuotes() {
    return store.getters["quotes/hasQuotes"];
  }
  quotes() {
    return store.getters["quotes/quotes"];
  }
  #toJson() {
    return {
      projectId: this.projectId,
      contractorId: this.contractorId,
      bidPrice: this.bidPrice,
      bidDescription: this.bidDescription,
      expireYear: this.expireYear,
      updatedAt: this.updatedAt,
      agreedPrice: this.agreedPrice,
      quoteState: this.quoteState,
      clientConfirmation: this.clientConfirmation,
      confirmationDate: this.confirmationDate,
      clientComments: this.clientComments,
    };
  }
}
