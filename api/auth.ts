import http from './request'

enum apiPath {
  register = '/user/register',
  login = '/user/login',
}

export default new class extends http {
  login (body: any, needLoading = true) {
    return this.post(apiPath.login, body, needLoading)
  }
}
