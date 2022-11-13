import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,

  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json",
  },

  env: {
    userName: "artem.bondar16@gmail.com",
    password: "CypressTest1",
    apiUrl: "https://api.realworld.io/api",
  },
  retries: {
    runMode: 1,
    openMode: 0,
  },

  e2e: {
    baseUrl: "http://localhost:4200",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    excludeSpecPattern: ["**/1-getting-started/*", "**/2-advanced-examples/*"],
  },
});
