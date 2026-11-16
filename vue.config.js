const publicEnvironment = require("./scripts/public-environment.cjs");

module.exports = {
  parallel: false,
  configureWebpack: { devtool: "source-map" },
  chainWebpack(config) {
    config.plugin("define").tap(args => {
      args[0]["process.env"] = publicEnvironment(args[0]["process.env"] || {});
      return args;
    });
  },
};
