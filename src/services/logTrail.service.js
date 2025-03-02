import store from "../store/index";

export class LogTrail {
  constructor(who, what, where, sessionId, postOnWall) {
    this.who = who || "";
    this.what = what || "";
    this.whereWasIt = where || "";
    this.sessionId = sessionId || "";
    this.postOnWall = postOnWall || "";
  }

  add() {
    const ds = {
      who: this.who,
      what: this.what,
      whereWasIt: this.whereWasIt,
      sessionId: this.sessionId,
      postOnWall: this.postOnWall,
    };
    store
      .dispatch("logTrail/createLogTrail", ds, { root: true })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}
