// Accept both API versions while the FE and BE are deployed independently.
export function normalizeApiResponse(response) {
  const envelope = response.data;
  if (!envelope || typeof envelope !== "object" || Array.isArray(envelope)) return response;
  const owns = (key) => Object.prototype.hasOwnProperty.call(envelope, key);
  if (!owns("data") && !owns("body") && !owns("message")) return response;
  let data;
  if (owns("data")) {
    data = envelope.data;
  } else if (typeof envelope.body === "string") {
    try {
      data = JSON.parse(envelope.body);
    } catch (_) {
      throw new Error("The API returned invalid JSON data.");
    }
  } else {
    data = envelope.body ?? null;
  }
  response.data = { ...envelope, data, body: JSON.stringify(data) };
  return response;
}
