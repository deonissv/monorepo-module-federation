const app1URL = "http://localhost:5501";

const federationConfig = {
  name: "core",
  filename: "remoteEntry.js",
  remotes: {
    app1: `app1@${app1URL}/remoteEntry.js`,
  },
};

module.exports = federationConfig;
