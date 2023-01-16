export interface ApiResType {
  code?: string;
  message?: string;
  result?: any;
  success?: boolean;
  // [propName: string]: any;
}

export interface AbortApiType {
  uuid: string;
  cancel: AbortController;
  [propName: string]: any;
}

export interface ApiMethodType {
  method: string;
  body?: object;
  params?: object;
}
