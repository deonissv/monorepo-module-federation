const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { DefinePlugin } = require('webpack');
const { dependencies } = require('./package.json');
const { UniversalFederationPlugin } = require('@module-federation/node');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const tsconfig = 'tsconfig.json';
const isProd = true;

/**
 * @type {import('webpack').Configuration}
 **/
module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    uniqueName: '@mono/app1',
    clean: true,
    publicPath: 'auto',
  },
  devtool: isProd ? undefined : 'source-map',
  resolve: {
    extensions: ['.vue', '.tsx', '.ts', '.js'],
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
        loader: 'vue-loader',
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    }),
    new UniversalFederationPlugin({
      remoteType: 'script',
      name: 'app1',
      filename: 'remoteEntry.js',
      library: { type: 'commonjs-module' },
      isServer: true,
      exposes: {
        './App': './src/app/App',
      },
      shared: {
        vue: {
          import: false,
          singleton: true,
          requiredVersion: dependencies['vue'],
          strictVersion: true,
        },
        '@mono/foo': {
          singleton: true,
          requiredVersion: dependencies['@mono/foo'],
          strictVersion: true,
        },
        '@mono/bar': {
          singleton: true,
          requiredVersion: dependencies['@mono/bar'],
          strictVersion: true,
        },
      },
    }),
  ],
};
