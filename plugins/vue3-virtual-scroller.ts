import VueVirtualScroller from 'vue3-virtual-scroller'
// import 'vue3-virtual-scroller/dist/vue-virtual-scroller.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueVirtualScroller)
})
