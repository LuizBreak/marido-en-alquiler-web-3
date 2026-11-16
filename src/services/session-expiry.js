export function expirationFromJwt(exp) {
  const expiration = Number(exp) * 1000;
  if (!Number.isFinite(expiration) || expiration <= Date.now()) {
    throw new Error("Your session has expired. Please sign in again.");
  }
  return expiration;
}
