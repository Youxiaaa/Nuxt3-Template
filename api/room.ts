import http from './request'

enum apiPath {
  get = '/api/room/room/getRoomList'
}

export default new class extends http {
  getRoomList (params: any, needLoading = true) {
    return this.get(apiPath.get, params, needLoading)
  }
}
