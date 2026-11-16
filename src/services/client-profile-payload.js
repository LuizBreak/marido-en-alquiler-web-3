// The deployed API writes every supplied property with UPDATE ... SET ?.
// Keep database timestamps, counters, ratings and account attributes out of it.
export function clientProfilePayload(client, operation) {
  const fields = ["firstName", "lastName", "email", "phone", "address", "comments", "facebook", "instagram", "linkedin", "avatar"];
  if (operation === "create") fields.push("id");
  const payload = {};
  for (const key of fields) {
    if (client[key] !== undefined) payload[key] = client[key];
  }
  return payload;
}
