import { AbortApi } from '~~/utils/abortController'

enum errMsg {
  'notFound' = '找不到資源'
}

export default defineNuxtRouteMiddleware(() => {
  const { LoadingStore } = useStore()
  LoadingStore().FN_REMOVE_ALL_LOADING

  AbortApi.cancelAllPending()
})
