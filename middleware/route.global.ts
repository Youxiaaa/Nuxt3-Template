import { AbortApi } from '~~/utils/abortController'

export default defineNuxtRouteMiddleware(() => {
  const { LoadingStore } = useStore()
  LoadingStore().FN_REMOVE_ALL_LOADING

  AbortApi.cancelAllPending()
})
