const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const outputPath = "dist/renderer";

module.exports = {
  mode: "development",
  entry: "./src/renderer/renderer.ts",
  output: {
    path: path.resolve(__dirname, outputPath),
    filename: "renderer.js",
    // devtoolModuleFilenameTemplate: "[absolute-resource-path]"
  },
  devtool: "source-map",
  target: "electron-renderer",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.template.html"
    })
  ]
}
