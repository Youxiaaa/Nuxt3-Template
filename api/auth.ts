import http from './request'

enum apiPath {
  login = '/user/login',
  refresh = '/user/refreshToken',
  getUserInfo = '/user/getUserInfo'
}

export const FETCH_AUTH = new class extends http {
  login (body: any, needLoading = true) {
    return this.post(apiPath.login, body, needLoading)
  }

  refresh (body: any, needLoading = false) {
    return this.post(apiPath.refresh, body, needLoading)
  }

  getUserInfo (params?: any, needLoading = true) {
    return this.get(apiPath.getUserInfo, params, needLoading)
  }
}
