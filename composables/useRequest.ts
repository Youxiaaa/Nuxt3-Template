import { _AsyncData } from 'nuxt3/dist/app/composables/asyncData'
 
let baseUrl = 'http://110.42.184.111'
// 指定后端返回的基本数据类型
export interface ResponseConfig {
    code: number,
    status: number,
    data: any,
    msg: string
}
export interface ValueConfig {
    value: any,
}
 
const fetch = (url: string, options?: any): Promise<any>  => {
  const reqUrl = baseUrl + url

  options.headers = options.headers || {}
  options.headers.authorization = 'ey9jasdasd12312312313'

  return new Promise((resolve, reject) => {
    useFetch(reqUrl, { ...options, Request }).then(({ data, error }: _AsyncData) => {
      if (error.value) {
        reject(error.value)
        return
      }
      const value = data.value
      if (!value) {
      }else if(value.code == 102){
        alert(value.msg)
      } else {
        resolve(ref(value))
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
  post(url: string, params?: any): Promise<any>  {
    return fetch(url, { method: 'post', params })
  }
  put(url: string, body?: any): Promise<any>  {
    return fetch(url, { method: 'put', body })
  }
  delete(url: string, body?: any): Promise<any>  {
    return fetch(url, { method: 'delete', body })
  }
}