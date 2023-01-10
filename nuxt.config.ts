export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_BASE_API || 'http://110.42.184.111'
    }
  },
  typescript: {
    typeCheck: true
  },
  css: [
    '@unocss/reset/tailwind.css'
  ],
  modules: [
    '@unocss/nuxt',
  ],
})
