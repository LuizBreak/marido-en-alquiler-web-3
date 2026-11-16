function validId(value) {
  return value !== undefined && value !== null && /^[1-9]\d*$/.test(String(value));
}

export function clientProfileIdentity(accountId, profile = {}) {
  if (!validId(accountId)) {
    const error = new Error("The signed-in client identity is missing.");
    error.code = "CLIENT_ID_MISSING";
    throw error;
  }
  const profileId = profile.id ?? profile.Id ?? profile.clientId;
  if (profileId != null && (!validId(profileId) || String(profileId) !== String(accountId))) {
    const error = new Error("The profile does not match the signed-in client.");
    error.code = "CLIENT_ID_MISMATCH";
    throw error;
  }
  return accountId;
}
