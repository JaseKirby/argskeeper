const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
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
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new ExtractTextPlugin("style.css"),
    new HtmlWebpackPlugin({
      template: "src/index.template.html"
    })
  ]
}
