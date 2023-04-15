import http from './request'

enum apiPath {
  get = '/todos/get',
  post = '/todos/add',
}

export const FETCH_TODOS = new class extends http {
  getTodos (params: any = {}, needLoading = true) {
    return this.get(apiPath.get, params, needLoading)
  }

  addTodo (body: any, needLoading = true) {
    return this.post(apiPath.post, body, needLoading)
  }

  removeTodo (id: string, params: any = {}, needLoading = true) {
    return this.delete(`/todos/delete/${id}`, params, needLoading)
  }

  updateTodo (body: any, needLoading = true) {
    return this.put('/todos/update', body, needLoading)
  }
}
