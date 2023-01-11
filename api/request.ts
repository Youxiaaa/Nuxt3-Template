import { hash } from 'ohash'
import { AbortApi } from '~~/utils/abortController'

/**
 * api封裝
 * @param { String } url api網址
 * @param { Object } methodAndOptions 請求方法以及參數 body || params
 * @param { Object } options useFtech第二個參數
 */

class Http {
  private static async fetch (url: string, methodAndOptions?: any, needLoading?: boolean): Promise<any> {
    const { LoadingStore } = useStore()

    // 取得環境變數 BaseURL
    const runtimeConfig = useRuntimeConfig()
    const { apiBase } = runtimeConfig.public
    const reqUrl = `${apiBase}${url}` as string

    const apiUUID = hash(JSON.stringify(methodAndOptions) + url) as never

    return await useFetch(reqUrl, {
      onRequest({ request, options }) {
        AbortApi.removeRequestPending(apiUUID)

        Object.assign(options, methodAndOptions)
  
        const token = useCookie('token') || ''
        const headersInit: HeadersInit = {
          authorization: `Bearer ${token.value}`
        };
        options.headers = headersInit

        if (needLoading) LoadingStore().FN_ADD_LOADING(apiUUID)

        const abortInstance = new AbortController()
        options.signal = abortInstance.signal

        const requestItem = {
          uuid: apiUUID,
          cancel: abortInstance
        }
        AbortApi.addRequestPending(requestItem)
      },
      onResponse({ request, response, options }) {
        AbortApi.clearRequestPending(apiUUID)
        LoadingStore().FN_REMOVE_LOADING(apiUUID)
        return response._data
      },
    })
  }

  public async get(url: string, params?: any, needLoading?: boolean): Promise<any> {
    const { data } = await Http.fetch(url, { method: 'get', params }, needLoading)
    return data._value
  }

  public async post(url: string, body?: any, needLoading?: boolean): Promise<any> {
    const { data } = await Http.fetch(url, { method: 'post', body }, needLoading)
    return data._value
  }

  public async put(url: string, body?: any, needLoading?: boolean): Promise<any> {
    const { data } = await Http.fetch(url, { method: 'put', body }, needLoading)
    return data._value
  }

  public async delete(url: string, params?: any, needLoading?: boolean): Promise<any> {
    const { data } = await Http.fetch(url, { method: 'delete', params }, needLoading)
    return data._value
  }
}

export const http = new Http()
