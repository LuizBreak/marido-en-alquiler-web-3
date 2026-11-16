const test = require("node:test");
const assert = require("node:assert/strict");
const publicEnvironment = require("../scripts/public-environment.cjs");
test("browser build retains public configuration while excluding secrets and unknown variables", () => {
  const values = publicEnvironment({
    NODE_ENV: "production", VUE_APP_IMAGE_BUCKET: "images", VUE_APP_GOOGLE_APP_ID: "public-client-id",
    VUE_APP_GOOGLE_SECRETE: "private", VUE_APP_CLIENT_SECRET: "private",
    VUE_APP_PASSWORD: "private", VUE_APP_UNKNOWN_TOKEN: "private",
  });
  assert.deepEqual(values, { NODE_ENV: "production", VUE_APP_IMAGE_BUCKET: "images", VUE_APP_GOOGLE_APP_ID: "public-client-id" });
});
