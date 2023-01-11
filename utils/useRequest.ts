import { hash } from 'ohash'

/**
 * api封裝
 * @param { String } url api網址
 * @param { Object } options useFtech第二個參數
 */

const fetch = async (url: string, methodAndOptions?: any): Promise<any> => {
  const runtimeConfig = useRuntimeConfig()
  const { apiBase } = runtimeConfig.public
  const reqUrl = `${apiBase}${url}` as string

  const key = hash(JSON.stringify(methodAndOptions) + url)

  return await useFetch(reqUrl, {
    onRequest({ request, options }) {
      Object.assign(options, methodAndOptions)

      const token = useCookie('token') || ''

      const headersInit: HeadersInit = {
        authorization: `Bearer ${token.value || ''}`
      };
      options.headers = headersInit
    },
    onResponse({ request, response, options }) {
      return response._data
    },
  })
}

export default new class Http {
  async get(url: string, params?: any): Promise<any> {
    const { data } = await fetch(url, { method: 'get', params })
    return data._value
  }

  async post (url: string, body?: any): Promise<any> {
    const { data } = await fetch(url, { method: 'post', body })
    return data._value
  }

  async put (url: string, body?: any): Promise<any> {
    const { data } = await fetch(url, { method: 'put', body })
    return data._value
  }

  async delete (url: string, params?: any): Promise<any> {
    const { data } = await fetch(url, { method: 'delete', params })
    return data._value
  }
}