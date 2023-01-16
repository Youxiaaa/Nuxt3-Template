import { http } from './request'

enum apiPath {
  get = '/api/room/room/getRoomList'
}

export const FETCH_ROOM = {
  getRoomList: (params: any, needLoading = true) => http.get(apiPath.get, params, needLoading)
}
