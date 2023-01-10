import { hash } from 'ohash'

/**
 * api封裝
 * @param { String } url api網址
 * @param { Object } options useFtech第二個參數
 */

// const token = useCookie('token') || '';

// const fetch = (url: string, options?: any): Promise<any> => {
//   // const reqUrl = VITE_API_HOST + url // 你的接口地址
//   const reqUrl = 'http://110.42.184.111' + url

//   options.headers = options.headers || {}

//   // if (token.value) options.headers.authorization = `Bearer ${token.value}`

//   // 不设置key，始终拿到的都是第一个请求的值，参数一样则不会进行第二次请求
//   const key = hash(JSON.stringify(options) + url)

//   return new Promise((resolve, reject) => {
//     useFetch(reqUrl, { ...options, key })
//       .then(({ data, error }) => {
//         if (error.value) {
//           reject(error.value)
//           return
//         }
//         const value = data.value as any
//         if (!value) {
//           // 这里处理错你自定义的错误，例如code !== 1
//           throw createError({
//             statusCode: 500,
//             statusMessage: reqUrl,
//             message: '錯誤',
//           })
//           return
//         }
//         resolve(value)
//       })
//       .catch((err: any) => {
//         console.log(err)
//         reject(err)
//       })
//   })
// }

const fetch = async (url: string, methodAndOptions?: any): Promise<any> => {
  const reqUrl = 'http://110.42.184.111' + url

  const key = hash(JSON.stringify(methodAndOptions) + url)

  return await useFetch(reqUrl, {
    onRequest({ request, options }) {
      Object.assign(options, methodAndOptions)

      const token = useCookie('token') || ''

      const headersInit: HeadersInit = {
        authorization: `Bearer ${token.value || '123'}`
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