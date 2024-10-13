const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const { DefinePlugin } = require("webpack");
const { FederatedTypesPlugin } = require("@module-federation/typescript");
const federationConfig = require("./federation.config");

const tsconfig = "tsconfig.json";

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    uniqueName: "@mono/core",
    publicPath: "auto",
    clean: true,
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 5500,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      fs: false,
      path: false,
    },
    plugins: [new TsconfigPathsPlugin({ configFile: tsconfig })],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: "body",
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false",
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
    }),
    new ModuleFederationPlugin({
      ...federationConfig,
    }),
    new FederatedTypesPlugin({
      federationConfig: federationConfig,
      compiler: "vue-tsc",
    }),
  ],
};
