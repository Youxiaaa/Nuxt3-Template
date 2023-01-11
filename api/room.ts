import { http } from './request';

enum apiPath {
  getRoomList = '/api/room/room/getRoomList'
}

export const FETCH_ROOM = {
  getRoomList: (params: any) => http.get(apiPath.getRoomList, params)
}
