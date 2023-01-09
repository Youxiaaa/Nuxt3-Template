import Http from '~~/composables/useRequest';

enum apiPath {
  getRoomList = '/api/room/room/getRoomList'
}

export const FETCH_ROOM = {
  getRoomList: (data: any) => Http.get(apiPath.getRoomList, data)
}
