import { AbortApi } from '~~/utils'
import { LoadingStore, AuthStore } from '~/stores'

export default defineNuxtRouteMiddleware(() => {
  LoadingStore().FN_REMOVE_ALL_LOADING
  AbortApi.cancelAllPending()

  AuthStore().FN_GET_USER_INFO()
})
