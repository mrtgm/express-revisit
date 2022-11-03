// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // vite: {
  //   server: {
  //     proxy: {
  //       "/api": {
  //         target: "http://localhost:3000",
  //         changeOrigin: true,
  //         secure: true,
  //         rewrite: (path) => path.replace(/^\/api/, ""),
  //       },
  //     },
  //   },
  // },
  vue: {
    config: {
      productionTip: true,
      devtools: true,
    },
  },
  runtimeConfig: {
    public: {
      // https://v3.nuxtjs.org/docs/directory-structure/nuxt.config#runtimeconfig
      baseUrl: process.env.BASE_URL || "http://localhost:3000",
    },
  },
});
