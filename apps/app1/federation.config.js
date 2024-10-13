const federationConfig = {
  name: "app1",
  filename: "remoteEntry.js",
  exposes: {
    "./App": "./src/app/App",
  },
};

module.exports = federationConfig;
