const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./src/index.js",
    // Runtime code for hot module replacement
    hot: "webpack/hot/dev-server.js",
    // Dev server client for web socket transport, hot and live reload logic
    client: "webpack-dev-server/client/index.js?hot=true&live-reload=true",
  },
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    // Dev server client for web socket transport, hot and live reload logic
    hot: false,
    client: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Hot Module Replacement",
      filename: "./src/index.html",
    }),
    // Plugin for hot module replacement
    new webpack.HotModuleReplacementPlugin(),
    new ModuleFederationPlugin({
      name: "auth",
      exposes: {
        "./": "./src",
      },
      filename: "remoteEntry.js",
    }),
    ,
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
