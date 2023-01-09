// import { _AsyncData } from 'nuxt3/dist/app/composables/asyncData'

let baseUrl = 'http://110.42.184.111'

const token = useCookie('token') || '';

const fetch = (url: string, options?: any): Promise<any> => {
  const reqUrl = baseUrl + url

  options.headers = options.headers || {}
  options.headers.authorization = `Bearer ${token.value}`

  return new Promise((resolve, reject) => {
    useFetch(reqUrl, { ...options, Request }).then(({ data, error }: any) => {
      if (error.value) {
        reject(error.value)
        return
      }
      if (!data.value) {
      } else if (data.value.code !== '000000') {
        reject(data.value.msg)
      } else {
        resolve(data.value)
      }
    }).catch((err: any) => {
      reject(err)
    })
  })
}

export default new class Http {
  get(url: string, params?: any): Promise<any> {
    return fetch(url, { method: 'get', params })
  }
  post(url: string, params?: any): Promise<any> {
    return fetch(url, { method: 'post', params })
  }
  put(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'put', body })
  }
  delete(url: string, body?: any): Promise<any> {
    return fetch(url, { method: 'delete', body })
  }
}