import { invalidateSession } from "./session-state";

export function installSessionListeners(store, browser) {
  const expire = payload => {
    if (store.getters.isAuthenticated || store.getters.token) {
      return store.dispatch("autoLogout", payload);
    }
  };
  const changed = event => {
    if ((event.key === null || event.key === "access_token") &&
        (event.key === null || event.newValue === null || browser.localStorage.getItem("access_token") !== store.getters.token)) {
      // Another tab owns the shared Cognito/storage change. Clear only this tab.
      if (!store.getters.isAuthenticated && !store.getters.token) {
        // Also cancel an initial cached-session restore that has not committed yet.
        invalidateSession();
        return;
      }
      expire({ localOnly: true });
    }
  };
  const resumed = () => {
    const token = browser.localStorage.getItem("access_token");
    if (token !== store.getters.token) return expire({ localOnly: true });
    const expiration = Number(browser.localStorage.getItem("expirationDate"));
    if (!Number.isFinite(expiration) || expiration <= Date.now()) expire();
  };
  const rejected = () => expire();
  browser.addEventListener("mea:session-expired", rejected);
  browser.addEventListener("storage", changed);
  browser.addEventListener("focus", resumed);
  browser.document.addEventListener("visibilitychange", resumed);
  return () => {
    browser.removeEventListener("mea:session-expired", rejected);
    browser.removeEventListener("storage", changed);
    browser.removeEventListener("focus", resumed);
    browser.document.removeEventListener("visibilitychange", resumed);
  };
}
