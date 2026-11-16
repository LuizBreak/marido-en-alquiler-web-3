// Keep the deployed legacy API usable until the companion backend is released.
export function usesLegacyApi() {
  return process.env.VUE_APP_API_CONTRACT !== "v2";
}

export function createdAccountId(data) {
  let account = data;
  while (Array.isArray(account)) account = account[0];
  const id = account?.id ?? account?.Id ?? account?.LAST_INSERT_ID;
  if (id == null || !/^[1-9]\d*$/.test(String(id))) {
    throw new Error("The account was not assigned an ID.");
  }
  return id;
}
