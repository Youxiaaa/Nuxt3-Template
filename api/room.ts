import Http from '~~/utils/useRequest';

enum apiPath {
  getRoomList = '/api/room/room/getRoomList'
}

export const FETCH_ROOM = {
  getRoomList: (params: any) => Http.get(apiPath.getRoomList, params)
}
