const path = require("node:path");
const { spawn } = require("node:child_process");
const service = path.join(path.dirname(require.resolve("@vue/cli-service/package.json")), "bin/vue-cli-service.js");
const child = spawn(process.execPath, [service, "serve", "--host", "127.0.0.1", "--port", "8080"], {
  env: { ...process.env, VUE_APP_ENV: "production", VUE_APP_API_CONTRACT: "v2" },
  stdio: "inherit",
});
child.on("exit", code => { process.exitCode = code || 0; });
