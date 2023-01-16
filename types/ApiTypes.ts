export interface ApiResType {
  readonly code: number;
  readonly message: number;
  readonly result: any;
  readonly success: boolean;
  readonly [propName: string]: any;
}

export interface AbortApiType {
  readonly uuid: string;
  readonly cancel: AbortController;
}
