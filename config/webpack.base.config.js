const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const {
  VueLoaderPlugin
} = require("vue-loader");

const NODE_ENV = process.env.NODE_ENV || "development";
const isProd = NODE_ENV === "production";

module.exports = {
  mode: NODE_ENV,
  devtool: isProd ? false : "#cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, "../build/ssr"),
    publicPath: "/staticssr/",
    filename: "[name].[chunkhash].js",
  },
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      "@": path.resolve(__dirname, "../web"),
      public: path.resolve(__dirname, "../public"),
      components: path.resolve(__dirname, "../web/components"),
    },
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [{
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          }
        },
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name].[ext]?[hash]",
        },
      },
      {
        test: /\.scss?$/,
        oneOf: [{
          use: [
            "vue-style-loader",
            {
              loader: "css-loader",
              options: {
                minimize: isProd,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [
                  require("autoprefixer")({
                    overrideBrowserslist: [
                      "last 3 versions",
                      "iOS >= 8",
                      "Android >= 4",
                    ],
                  }),
                ],
              },
            },
            "sass-loader",
          ],
        }, ],
      },
    ],
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? "warning" : false,
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "common.[chunkhash].css",
    }),
    ...(isProd ? [] : [new FriendlyErrorsPlugin()]),
  ],
};