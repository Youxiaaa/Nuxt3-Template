import { AbortApi } from '~~/utils'

export default defineNuxtRouteMiddleware(() => {
  const { LoadingStore } = useStore()
  LoadingStore().FN_REMOVE_ALL_LOADING

  AbortApi.cancelAllPending()
})
