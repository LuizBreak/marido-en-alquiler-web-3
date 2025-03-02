import store from "../store/index";

export class Contractor {
  constructor(contractorInfo) {
    this.SetProperties(contractorInfo);
  }

  // "[ Properties ]"
  data = {};

  // [ Public & Private Methods ]
  SetProperties(contractorInfo) {
    if (Object.keys(contractorInfo).length > 0) {
      this.data = { ...contractorInfo };
    }
  }
  validate(contractorInfo) {
    if (Object.keys(contractorInfo).length > 0) {
      return true;
    } else {
      throw new Error("Invalid contractor informaiton provided.");
    }
  }
  async add(contractorInfo) {
    this.SetProperties(contractorInfo);
    if (this.validate(this.data)) {
      this.data.updatedAt = new Date();
      await store
        .dispatch("contractors/createContractor", this.data, {
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
  async update(contractorInfo) {
    this.SetProperties(contractorInfo);
    if (this.validate(this.data)) {
      this.data.updatedAt = new Date();
      await store
        .dispatch("contractors/updateContractor", this.data, {
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
      .dispatch("contractors/deleteContractor", { id: id }, { root: true })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
  getAll() {
    try {
      this.$store.dispatch("contractors/fetchContractors", {});
    } catch (e) {
      console.error(e);
    }
  }
  getById(id) {
    try {
      this.$store.dispatch("contractors/fetchContractor", { id: id });
    } catch (e) {
      console.error(e);
    }
  }
  hasContractors() {
    return store.getters["contractors/hasContractors"];
  }
  theContractor() {
    return store.getters["contractors/contractor"];
  }
  allContractors() {
    return store.getters["contractors/contractors"];
  }
  #toJson() {
    return {
      // TODO: Finalize toJason
      id: this.data.id,
      updatedAt: this.data.updatedAt,
    };
  }
}
