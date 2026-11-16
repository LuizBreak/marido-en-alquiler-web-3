const resourceKeys = {
  projects: "projectId",
  quotes: "quoteId",
  messages: "messageId",
  reviews: "reviewId",
  paymethods: "payMethodId",
  milestones: "milestoneId",
  favorites: "Id",
};

export function resourceId(resource, entity) {
  const key = resourceKeys[resource.toLowerCase()] || "id";
  const id = entity[key] ?? entity.id;
  if (id === undefined || id === null || id === "" || id === "undefined" || id === "null") {
    throw new Error(`Missing ${key} for ${resource}.`);
  }
  return encodeURIComponent(id);
}
