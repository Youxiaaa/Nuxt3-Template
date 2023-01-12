export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    layoutTransition: { name: 'fade', mode: 'out-in' }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_BASE_API
      // apiBase: process.env.NUXT_BASE_API || 'http://110.42.184.111'
    }
  },
  typescript: {
    typeCheck: true
  },
  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/css/main.css'
  ],
  modules: [
    '@pinia/nuxt',
    '@unocss/nuxt',
  ],
})
