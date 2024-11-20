const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: false, // Disable the support file
    specPattern: "cypress/integration/**/*.spec.js",
    baseUrl: "http://localhost:3000",
  },
});
