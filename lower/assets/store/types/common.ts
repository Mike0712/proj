export enum Action {
  c = "post",
  r = "get",
  u = "put",
  d = "delete",
  all = "ALL",
}

export interface Args<Data> {
  action: Action;
  data?: Data;
}

export interface SetSucRet {
  message: string
}