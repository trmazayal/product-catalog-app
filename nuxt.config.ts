// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  app: {
    head: {
      title: 'Product Catalog',
      meta: [{ charset: 'utf-8' }],
    },
  },
  runtimeConfig: {
    public: {
      baseUrl:"",
    }
  },
})
