const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const babel = require("@babel/core");

// Load a source module without booting the browser, Cognito, or network clients.
module.exports = function loadModule(file, mocks = {}) {
  const filename = path.resolve(__dirname, "..", file);
  const code = babel.transformSync(fs.readFileSync(filename, "utf8"), {
    filename, babelrc: false, configFile: false,
    plugins: ["@babel/plugin-transform-modules-commonjs"],
  }).code;
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports, console, setTimeout, clearTimeout,
    require(name) {
      if (Object.prototype.hasOwnProperty.call(mocks, name)) return mocks[name];
      throw new Error(`Unexpected import in isolated test: ${name}`);
    },
  }, { filename });
  return module.exports;
};
