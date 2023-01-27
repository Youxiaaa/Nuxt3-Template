/**
 * api封裝
 * @param { String } url api網址
 * @param { Object } methodAndOptions 請求方法以及參數 body || params
 * @param { Object } options useFtech第二個參數
 */

import { hash } from 'ohash'
import { AbortApi } from '~~/utils'
import { ApiResType, AbortApiType, QueryFormType, ApiMethodType } from '~~/types'

export default class http {
  private static async fetch (url: string, methodAndOptions: ApiMethodType, needLoading?: boolean): Promise<any> {
    const { LoadingStore } = useStore()

    // 取得環境變數 BaseURL
    const runtimeConfig = useRuntimeConfig()
    const { apiBase } = runtimeConfig.public
    const reqUrl = `${apiBase}${url}`

    const apiUUID: string = hash(JSON.stringify(methodAndOptions) + url)

    return await useFetch(reqUrl, {
      // 請求攔截
      onRequest ({ options }) {
        AbortApi.removeRequestPending(apiUUID)

        Object.assign(options, methodAndOptions)

        const token = useCookie('authorization')
        const headersInit: HeadersInit = {
          authorization: `Bearer ${token.value || ''}`
        }
        options.headers = headersInit

        if (needLoading) { LoadingStore().FN_ADD_LOADING(apiUUID) }

        const abortInstance = new AbortController()
        options.signal = abortInstance.signal

        const requestItem: AbortApiType = {
          uuid: apiUUID,
          cancel: abortInstance
        }
        AbortApi.addRequestPending(requestItem)
      },
      // 請求錯誤攔截
      onRequestError ({ error }) {
        AbortApi.clearRequestPending(apiUUID)
        LoadingStore().FN_REMOVE_LOADING(apiUUID)

        console.error(error)
      },
      // 回應攔截
      onResponse ({ response }) {
        AbortApi.clearRequestPending(apiUUID)
        LoadingStore().FN_REMOVE_LOADING(apiUUID)
        return response._data
      },
      // 回應錯誤攔截
      onResponseError ({ response }) {
        AbortApi.clearRequestPending(apiUUID)
        LoadingStore().FN_REMOVE_LOADING(apiUUID)

        const { status, _data } = response
        http.handleError(status, _data.message)
      }
    })
  }

  // 錯誤處理
  private static handleError (status: number, message: string) {
    const { AuthStore } = useStore()
    const { $swal } = useNuxtApp()
    switch (status) {
      case 401:
        $swal.fire({
          icon: 'error',
          html: `${status} ${message}`,
          timer: 1500,
          showConfirmButton: false
        })
        AuthStore().FN_REMOVE_TOKEN()
        break
      case 404:
        $swal.fire({
          icon: 'error',
          html: `${status} ${message}`,
          timer: 1500,
          showConfirmButton: false
        })
        break
      case 500:
        $swal.fire({
          icon: 'error',
          html: `${status} ${message}`,
          timer: 1500,
          showConfirmButton: false
        })
        break
      default:
        $swal.fire({
          icon: 'error',
          html: `${status} ${message}`,
          timer: 1500,
          showConfirmButton: false
        })
        break
    }
  }

  public async get (url: string, params?: QueryFormType, needLoading?: boolean): Promise<ApiResType> {
    const { data } = await http.fetch(url, { method: 'get', params }, needLoading)
    if (!data._value) { return { error: true } }
    return data._value
  }

  public async post (url: string, body?: QueryFormType, needLoading?: boolean): Promise<ApiResType> {
    const { data } = await http.fetch(url, { method: 'post', body }, needLoading)
    if (!data._value) { return { error: true } }
    return data._value
  }

  public async put (url: string, body?: QueryFormType, needLoading?: boolean): Promise<ApiResType> {
    const { data } = await http.fetch(url, { method: 'put', body }, needLoading)
    if (!data._value) { return { error: true } }
    return data._value
  }

  public async delete (url: string, params?: QueryFormType, needLoading?: boolean): Promise<ApiResType> {
    const { data } = await http.fetch(url, { method: 'delete', params }, needLoading)
    if (!data._value) { return { error: true } }
    return data._value
  }
}
