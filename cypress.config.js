const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  viewportHeight: 768,
  viewportWidth: 1366,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json'
  },
  env: {
    username: 'testing01@email.com',
    password: 'Fleek@2016'
  },
  projectId: "7pkh52",
  retries: 1,
  numTestsKeptInMemory: 0,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'https://qa.int.batchdialer.com'
  },
});
