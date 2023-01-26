export default defineNuxtConfig({
  app: {
    head: {
      title: process.env.NUXT_APP_TITLE || 'Nuxt3-Template',
      meta: [],
      link: [],
      script: []
    },
    pageTransition: { name: 'fade', mode: 'out-in' },
    layoutTransition: { name: 'fade', mode: 'out-in' }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_BASE_API || 'https://api.ryanyou.com'
    }
  },
  typescript: {
    typeCheck: true
  },
  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  modules: [
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt'
  ],
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/pro-solid-svg-icons',
      '@fortawesome/pro-regular-svg-icons',
      '@fortawesome/vue-fontawesome'
    ]
  }
})
