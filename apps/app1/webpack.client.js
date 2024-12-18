const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const { DefinePlugin } = require('webpack');
const { dependencies } = require('./package.json');
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
    path: path.resolve(__dirname, 'dist/client'),
    uniqueName: '@mono/app1',
    clean: true,
    publicPath: 'auto',
  },
  devtool: isProd ? undefined : 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 5501,
  },
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
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body',
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    }),
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
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
