import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  alias: {
    "@vue/devtools-api": "@vue/devtools-api",
  },
  css: ["~/assets/css/tailwind.css"],
  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
    transpile: ["@heroicons/vue", "@headlessui/vue"],
  },
});
