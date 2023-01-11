/**
 * api 取消請求
 * @param { String } uuid api ID
 * 判斷陣中有相同的 UUID 就執行取相請求方法
 * API 回傳時 清除掉陣列中已結束 API
 */

// 紀錄請求中 API
let RequestPending = <any>[]

class abortController {

  public removeRequestPending(uuid: string) {
    RequestPending.forEach((item: any, index: number, arr: any) => {
      if (item.uuid === uuid) {
        item.cancel.abort()
        arr.splice(index, 1)
      }
    })
  }

  public cancelAllPending() {
    RequestPending.forEach((item: any) => {
      item.cancel.abort()
    })
    RequestPending = []
  }

  public clearRequestPending(uuid: string) {
    RequestPending = RequestPending.filter((item: any) => item.uuid !== uuid)
  }

  public addRequestPending(item: any) {
    RequestPending.push(item)
  }

}

export const AbortApi = new abortController()