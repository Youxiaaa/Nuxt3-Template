export interface ApiResType {
  readonly code?: string;
  readonly message?: string;
  readonly result?: any;
  readonly success?: boolean;
  // [propName: string]: any;
}

export interface AbortApiType {
  readonly uuid: string;
  readonly cancel: AbortController;
}

export interface ApiMethodType {
  readonly method: string;
  readonly body?: object;
  readonly params?: object;
}
