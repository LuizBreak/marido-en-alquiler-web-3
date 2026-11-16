const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const babel = require("@babel/core");

// Load a source module without booting the browser, Cognito, or network clients.
module.exports = function loadModule(file, mocks = {}, globals = {}) {
  const filename = path.resolve(__dirname, "..", file);
  let source = fs.readFileSync(filename, "utf8");
  if (file.endsWith(".vue")) source = source.match(/<script>([\s\S]*?)<\/script>/)[1];
  const code = babel.transformSync(source, {
    filename, babelrc: false, configFile: false,
    plugins: ["@babel/plugin-transform-modules-commonjs"],
  }).code;
  const module = { exports: {} };
  vm.runInNewContext(code, {
    module, exports: module.exports, console, setTimeout, clearTimeout,
    ...globals,
    require(name) {
      if (Object.prototype.hasOwnProperty.call(mocks, name)) return mocks[name];
      throw new Error(`Unexpected import in isolated test: ${name}`);
    },
  }, { filename });
  return module.exports;
};
