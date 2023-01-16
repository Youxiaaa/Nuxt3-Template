/**
 * api封裝
 * @param { String } url api網址
 * @param { Object } methodAndOptions 請求方法以及參數 body || params
 * @param { Object } options useFtech第二個參數
 */

import { hash } from 'ohash'
import { AbortApi } from '~~/utils/abortController'
import { ApiResType, AbortApiType, QueryFormType, ApiMethodType } from '~~/types'

export default class http {
  private static async fetch (url: string, methodAndOptions?: ApiMethodType, needLoading?: boolean): Promise<any> {
    const { LoadingStore } = useStore()

    // 取得環境變數 BaseURL
    const runtimeConfig = useRuntimeConfig()
    const { apiBase } = runtimeConfig.public
    const reqUrl = `${apiBase}${url}`

    const apiUUID: string = hash(JSON.stringify(methodAndOptions) + url)

    return await useFetch(reqUrl, {
      onRequest ({ options }) {
        AbortApi.removeRequestPending(apiUUID)

        Object.assign(options, methodAndOptions)

        const token = useCookie('access_token')
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
      onResponse ({ response }) {
        AbortApi.clearRequestPending(apiUUID)
        LoadingStore().FN_REMOVE_LOADING(apiUUID)
        return response._data
      }
    })
  }

  public async get (url: string, params?: QueryFormType, needLoading?: boolean): Promise<ApiResType> {
    const { data } = await http.fetch(url, { method: 'get', params }, needLoading)
    return data._value
  }

  public async post (url: string, body?: QueryFormType, needLoading?: boolean): Promise<ApiResType> {
    const { data } = await http.fetch(url, { method: 'post', body }, needLoading)
    return data._value
  }

  public async put (url: string, body?: QueryFormType, needLoading?: boolean): Promise<ApiResType> {
    const { data } = await http.fetch(url, { method: 'put', body }, needLoading)
    return data._value
  }

  public async delete (url: string, params?: QueryFormType, needLoading?: boolean): Promise<ApiResType> {
    const { data } = await http.fetch(url, { method: 'delete', params }, needLoading)
    return data._value
  }
}
