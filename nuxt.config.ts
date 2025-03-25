// nuxt.config.js
export default defineNuxtConfig({
  css: ["vuetify/styles", "@mdi/font/css/materialdesignicons.css"],

  build: {
    transpile: ["vuetify"],
  },

  ssr: true,

  modules: [],

  app: {
    head: {
      title: "Product Management",
      titleTemplate: "%s - Product Management App",
    },
  },

  compatibilityDate: "2025-03-24",

  runtimeConfig: {
    AWS_REGION: process.env.AWS_REGION || "local",
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
