const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { UniversalFederationPlugin } = require('@module-federation/node');
const { DefinePlugin } = require('webpack');
const { dependencies } = require('./package.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const tsconfig = 'tsconfig.json';
const isProd = true;

const app1URL = 'http://localhost:5501';

/**
 * @type {import('webpack').Configuration}
 **/
module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: './src/server/index.ts',
  target: false,
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    uniqueName: '@mono/core',
    publicPath: 'auto',
    clean: true,
  },
  devtool: isProd ? undefined : 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
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
      name: 'core',
      filename: 'remoteEntry.js',
      isServer: true,
      library: { type: 'commonjs-module' },
      remotes: {
        app1: `app1@${app1URL}/server/remoteEntry.js`,
      },
      shared: {
        vue: {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['vue'],
          strictVersion: true,
        },
        '@mono/foo': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['@mono/foo'],
          strictVersion: true,
        },
        '@mono/bar': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['@mono/bar'],
          strictVersion: true,
        },
      },
    }),
  ],
};
