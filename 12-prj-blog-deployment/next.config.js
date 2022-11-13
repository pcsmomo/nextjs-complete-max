const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        MONGODB_USERNAME: "",
        MONGODB_PASSWORD: "",
        MONGODB_CLUSTERNAME: "",
        MONGODB_DATABASE: "my-site-dev",
      },
    };
  }

  return {
    env: {
      MONGODB_USERNAME: "",
      MONGODB_PASSWORD: "",
      MONGODB_CLUSTERNAME: "",
      MONGODB_DATABASE: "my-site",
    },
  };
};
