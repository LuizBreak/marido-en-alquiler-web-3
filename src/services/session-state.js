// A response started by an older sign-in must never restore a logged-out user.
let version = 0;
export function sessionVersion() { return version; }
export function invalidateSession() { return ++version; }
export function requireCurrentSession(expected) {
  if (expected !== version) {
    const error = new Error("La sesión cambió. Inicia sesión de nuevo.");
    error.code = "SESSION_CHANGED";
    throw error;
  }
}
