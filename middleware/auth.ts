// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtRouteMiddleware((to, from) => {
  const { AuthStore } = useStore()

  if (!AuthStore().TOKEN_GETTER) {
    if (to.path !== '/login') { return navigateTo('/login') }
  } else if (to.path === '/login') { return navigateTo('/') }
})
