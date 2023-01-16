export interface ApiResType {
  readonly code: number;
  readonly message: number;
  result: any;
  readonly success: boolean;
  readonly [propName: string]: any;
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
