/**
 * api封裝
 * @param { String } url api網址
 * @param { Object } methodAndOptions 請求方法以及參數 body || params
 * @param { Object } needLoading 是否需要開啟Loading
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
    const token = useCookie('authorization')
    const headersInit: HeadersInit = {
      authorization: `Bearer ${token.value || ''}`
    }

    return await new Promise((resolve, reject) => {
      useFetch(reqUrl, {
        // 請求攔截
        onRequest ({ options }) {
          Object.assign(options, { ...methodAndOptions, key: apiUUID, initialCache: false })
          AbortApi.removeRequestPending(apiUUID)

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
        async onResponse ({ request, response, options }) {
          AbortApi.clearRequestPending(apiUUID)
          LoadingStore().FN_REMOVE_LOADING(apiUUID)

          const { status, _data } = response
          if (status !== 200 && status !== 201) {
            if (_data.message.includes('jwt expired')) {
              const isValid = await http.handleRefreshToken()

              if (isValid) {
                const data = await http.handleRegetApi(request, options, needLoading)
                resolve(data)
              } else {
                reject(_data.message)
              }
            } else {
              http.handleErrorMessage(status, _data.message)
              reject(_data.message)
            }
          } else {
            resolve(_data)
          }
        }
      }) as any
    })
  }

  // 重新取得API
  private static async handleRegetApi (request: any, options: any, needLoading = true): Promise<any> {
    const { LoadingStore } = useStore()
    const apiUUID: string = hash(JSON.stringify(request) + JSON.stringify(options))

    //! 將這些移除，否則會無限迴圈
    options.key = apiUUID
    options.onRequest = null
    options.onRequestError = null
    options.onResponse = null
    options.onResponseError = null

    if (needLoading) { LoadingStore().FN_ADD_LOADING(apiUUID) }

    const abortInstance = new AbortController()
    options.signal = abortInstance.signal

    const requestItem: AbortApiType = {
      uuid: apiUUID,
      cancel: abortInstance
    }
    AbortApi.addRequestPending(requestItem)

    const token = useCookie('authorization')
    const headersInit: HeadersInit = {
      authorization: `Bearer ${token.value || ''}`
    }
    // eslint-disable-next-line no-async-promise-executor
    return await new Promise(async (resolve, reject) => {
      const { data } = await useFetch(request, {
        ...options,
        headers: headersInit
      }) as any

      AbortApi.clearRequestPending(apiUUID)
      LoadingStore().FN_REMOVE_LOADING(apiUUID)

      if (data._value) {
        resolve(data._value)
      } else {
        reject(data)
      }
    })
  }

  // RefreshToken
  private static async handleRefreshToken (): Promise<boolean> {
    const { AuthStore } = useStore()
    const { $swal } = useNuxtApp()
    // 取得環境變數 BaseURL
    const runtimeConfig = useRuntimeConfig()
    const { apiBase } = runtimeConfig.public
    const reqUrl = `${apiBase}`

    // 設定要 POST 的 refresh_token
    const tokenInit = {
      refreshToken: useCookie('refreshToken')
    } as object

    // 設定 access_token
    const token = useCookie('authorization')
    const headersInit: HeadersInit = {
      authorization: `Bearer ${token.value || ''}`
    }
    // eslint-disable-next-line no-async-promise-executor
    return await new Promise(async (resolve) => {
      const { data } = await useFetch(`${reqUrl}/user/refreshToken`, {
        method: 'post',
        body: tokenInit,
        headers: headersInit
      }) as any

      const res = data._value

      if (!res?.accessToken || !res?.refreshToken) {
        $swal.fire({
          icon: 'error',
          html: '請重新登入',
          timer: 1500,
          showConfirmButton: false
        })
        AuthStore().FN_REMOVE_TOKEN()

        const accessToken = useCookie('authorization')
        const refreshToken = useCookie('refreshToken')
        accessToken.value = null
        refreshToken.value = null

        const router = useRouter()
        router.push('/login')
        resolve(false)
      } else {
        const accessToken = useCookie('authorization')
        const refreshToken = useCookie('refreshToken')
        accessToken.value = res.accessToken
        refreshToken.value = res.refreshToken
        resolve(true)
      }
    })
  }

  // 錯誤處理
  private static handleErrorMessage (status: number, message: string) {
    const { AuthStore } = useStore()
    const { $swal } = useNuxtApp()
    switch (status) {
      case 401: {
        $swal.fire({
          icon: 'error',
          html: `${status} ${message}`,
          timer: 1500,
          showConfirmButton: false
        })
        AuthStore().FN_REMOVE_TOKEN()
        break
      }
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
    return await http.fetch(url, { method: 'get', params }, needLoading)
  }

  public async post (url: string, body?: QueryFormType, needLoading?: boolean): Promise<ApiResType> {
    return await http.fetch(url, { method: 'post', body }, needLoading)
  }

  public async put (url: string, body?: QueryFormType, needLoading?: boolean): Promise<ApiResType> {
    return await http.fetch(url, { method: 'put', body }, needLoading)
  }

  public async delete (url: string, params?: QueryFormType, needLoading?: boolean): Promise<ApiResType> {
    return await http.fetch(url, { method: 'delete', params }, needLoading)
  }
}
