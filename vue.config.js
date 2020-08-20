const path = require("path");
const isCSR = process.env.RENDER_MODE === "csr";
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  outputDir: "build/csr",
  pluginOptions: {
    faas: {
      sourceDir: "src/apis", // 函数目录
      ignoreWildcardFunctions: [isCSR ? "render" : ""], // 忽略渲染函数
    },
  },
  productionSourceMap: true,
  configureWebpack: {
    entry: `./web/entry-client.js`,
    resolve: {
      extensions: [".vue", ".js"],
      alias: {
        "@": path.resolve(__dirname, "./web"),
      },
    },
    devServer: {
      hot: isProd ? false : true,
    },
  },
};
