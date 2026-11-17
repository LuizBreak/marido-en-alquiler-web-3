import { sessionVersion, requireCurrentSession } from "./session-state";

export function installSessionInterceptors(client, storage, onExpired) {
  client.interceptors.request.use(config => {
    config.sessionVersion = sessionVersion();
    const token = storage.getItem("access_token");
    config.headers = config.headers || {};
    if (token) {
      const expiration = storage.getItem("expirationDate");
      if (expiration !== null && (!Number.isFinite(Number(expiration)) || Number(expiration) <= Date.now())) {
        onExpired();
        const error = new Error("Tu sesión ha expirado. Inicia sesión de nuevo.");
        error.code = "SESSION_EXPIRED";
        throw error;
      }
      config.headers.Authorization = `Bearer ${token}`;
      config.authenticatedSession = true;
    } else {
      delete config.headers.Authorization;
      delete config.headers.authorization;
    }
    return config;
  });
  client.interceptors.response.use(response => {
    requireCurrentSession(response.config.sessionVersion);
    return response;
  }, error => {
    const config = error.config;
    if (config) {
      requireCurrentSession(config.sessionVersion);
      if (config.authenticatedSession && error.response?.status === 401) onExpired();
    }
    return Promise.reject(error);
  });
}
