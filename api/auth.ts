import http from './request'

enum apiPath {
  register = '/user/register',
  login = '/user/login',
  refresh = '/user/refreshToken'
}

export default new class extends http {
  login (body: any, needLoading = true) {
    return this.post(apiPath.login, body, needLoading)
  }

  refresh (body: any, needLoading = false) {
    return this.post(apiPath.refresh, body, needLoading)
  }
}
