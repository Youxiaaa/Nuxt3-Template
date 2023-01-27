// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtRouteMiddleware((to, from) => {
  const token: any = useCookie('authorization')

  if (!token._value) {
    if (to.path !== '/login') { return navigateTo('/login') }
  } else if (to.path === '/login') { return navigateTo('/') }
})
