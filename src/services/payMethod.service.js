import store from "../store/index";

// How to access Vuex store from a JS module
// https://forum.vuejs.org/t/how-to-access-vuex-store-from-a-js-module/10124/2

/*
 *   Article Reference: https://medium.com/tech-tajawal/javascript-classes-under-the-hood-6b26d2667677
 */

export class PayMethod {
  constructor(clientId, number, cvc, expireMonth, expireYear, updatedAt) {
    this.clientId.val = clientId || "";
    this.cardNumber.val = number || "";
    this.cvc.val = cvc || "";
    this.expireMonth.val = expireMonth || "";
    this.expireYear.val = expireYear || "";
    this.updatedAt.val = updatedAt || "";
  }
  // "[ Properties ]"
  IsValid = true;
  //   this.cardNumber.isValid && this.cvc.isValid && this.expireDate.isValid;
  payMethodId = {
    val: "",
    isValid: true,
  };
  clientId = {
    val: "",
    isValid: true,
  };
  cardNumber = {
    val: "",
    isValid: true,
  };
  cvc = {
    val: "",
    isValid: true,
  };
  expireMonth = {
    val: "",
    isValid: true,
  };
  expireYear = {
    val: "",
    isValid: true,
  };
  updatedAt = {
    val: "",
    isValid: true,
  };

  isNumber(value) {
    return typeof value === "number" && isFinite(value);
  }
  hasExpired() {
    var today, someday;
    var exMonth = this.expireMonth.val;
    var exYear = this.expireYear.val;
    console.log("month", exMonth);
    console.log("year", exYear);
    // if (!this.isNumber(exMonth) || !this.isNumber(exYear)) {
    //   return true;
    // }
    //}

    today = new Date();
    someday = new Date();
    someday.setFullYear(exYear, exMonth, 1);

    if (someday < today) {
      // alert(
      //   "The expiry date is before today's date. Please select a valid expiry date"
      // );
      return true;
    }
  }
  // [ Public & Private Methods ]
  validate() {
    if (this.cardNumber.val === "") {
      this.cardNumber.isValid = false;
      this.IsValid = false;
    }
    if (this.cvc.val === "") {
      this.cvc.isValid = false;
      this.IsValid = false;
    }
    if (this.expireMonth.val.trim === "" || this.hasExpired()) {
      this.expireMonth.isValid = false;
      this.IsValid = false;
    }
    if (this.expireYear.val.trim === "" || this.hasExpired()) {
      this.expireYear.isValid = false;
      this.IsValid = false;
    }
    return this.IsValid;
  }
  add() {
    const ds = {
      clientId: this.clientId.val,
      cardNumber: this.cardNumber.val,
      cvc: this.cvc.val,
      expireMonth: this.expireMonth.val,
      expireYear: this.expireYear.val,
      updatedAt: this.updatedAt.val,
    };
    // console.log("svc ds", ds);
    store
      .dispatch("payMethods/createPayMethod", ds, { root: true })
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
  async getByClientId(id) {
    console.log("svc.getByClientId.enter " + id);
    await store
      .dispatch("payMethods/getPayMethodsByClient", {
        clientId: id,
      })
      .catch(() => {
        console.log("Error refreshing pay method list");
      });
  }
  hasPayMethods() {
    return store.getters["payMethods/hasPayMethods"];
  }
  payMethods() {
    return store.getters["payMethods/paymethods"];
  }
  #toJson() {
    return {
      clientId: this.clientId.val,
      cardNumber: this.number.val,
      cvc: this.cvc.val,
      expireMonth: this.expireMonth.val,
      expireYear: this.expireYear.val,
      updatedAt: this.updatedAt.val,
    };
  }
}
