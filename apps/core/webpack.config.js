const path = require("path");
const isProd = true;

module.exports = {
  mode: isProd ? "production" : "development",
  entry: {},
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 5500,
  },
};
