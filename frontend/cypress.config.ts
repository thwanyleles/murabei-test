import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    specPattern: "cypress/e2e/**/*.spec.{js,ts}",
    baseUrl: "http://localhost:3000",
  },
});