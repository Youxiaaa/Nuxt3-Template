/**
 * api 取消請求
 * @param { String } uuid api ID
 * 判斷陣中有相同的 UUID 就執行取相請求方法
 * API 回傳時 清除掉陣列中已結束 API
 */

import { AbortApiType } from '~~/types'

class abortController {
  // 紀錄請求中 API
  private static RequestPending: AbortApiType[] = []

  public removeRequestPending (uuid: string) {
    abortController.RequestPending.forEach((item: AbortApiType, index: number, arr: AbortApiType[]) => {
      if (item.uuid === uuid) {
        item.cancel.abort()
        arr.splice(index, 1)
      }
    })
  }

  public cancelAllPending () {
    abortController.RequestPending.forEach((item: AbortApiType) => {
      item.cancel.abort()
    })
    abortController.RequestPending = []
  }

  public clearRequestPending (uuid: string) {
    abortController.RequestPending = abortController.RequestPending.filter((item: AbortApiType) => item.uuid !== uuid)
  }

  public addRequestPending (item: AbortApiType) {
    abortController.RequestPending.push(item)
  }
}

// eslint-disable-next-line new-cap
export const AbortApi = new abortController()
