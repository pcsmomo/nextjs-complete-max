const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        MONGODB_USERNAME: "noah",
        MONGODB_PASSWORD: "1234",
        MONGODB_CLUSTERNAME: "noahcluster.pvxa3.mongodb.net",
        MONGODB_DATABASE: "my-site-dev",
      },
    };
  }

  return {
    env: {
      MONGODB_USERNAME: "noah",
      MONGODB_PASSWORD: "1234",
      MONGODB_CLUSTERNAME: "noahcluster.pvxa3.mongodb.net",
      MONGODB_DATABASE: "my-site",
    },
  };
};
