const path = require('path');
const isProd = true;

/**
 * @type {import('webpack').Configuration}
 **/
module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {},
  devtool: isProd ? undefined : 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 5501,
  },
};
