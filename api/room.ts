import Http from '~~/composables/useRequest';

export const FETCH_ROOM = {
  getRoomList: (data: any) => Http.get('/api/room/room/getRoomList', data)
}
