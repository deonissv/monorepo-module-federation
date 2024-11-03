const path = require('path');
const isProd = true;

/**
 * @type {import('webpack').Configuration}
 **/
module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {},
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 5500,
  },
};
