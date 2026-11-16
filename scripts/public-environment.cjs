// Vue CLI otherwise embeds every VUE_APP_* variable, including in dependencies.
// Only explicitly reviewed public configuration may enter the browser bundle.
const publicKeys = new Set([
  "NODE_ENV", "BASE_URL", "VUE_APP_ENV", "VUE_APP_API_MODE", "VUE_APP_API_CONTRACT",
  "VUE_APP_BASE_URL", "VUE_APP_DEV_BASE_URL",
  "VUE_APP_EMAIL_INBOX", "VUE_APP_WEB_SOCKET", "VUE_APP_SYS_LOG_LEVEL",
  "VUE_APP_AWS_REGION", "VUE_APP_IMAGE_BUCKET", "VUE_APP_FACEBOOK_APP_ID",
  "VUE_APP_FACEBOOK_APP_AWS_ID", "VUE_APP_GOOGLE_APP_ID", "VUE_APP_CLIENT_ID",
]);
module.exports = values => Object.fromEntries(Object.entries(values).filter(([key]) => publicKeys.has(key)));
