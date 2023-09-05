export interface userModel {
  username: string;
  fullname?: string;
  email?: string;
  role?: string;
  signature?: any;
  active?: boolean;
}

export interface dsoModel {
  sign: string;
  dso: string;
  split: string;
  i20File: any;
}

export interface i20Model {
  i20Type: string;
  dsoName: string;
  i20File: any;
  issmFile: any;
  slateFile: any;
  toSlate: string;
  prog: string;
}

export interface signModel {
  x: number;
  y: number;
  length: number;
  width: number;
  signFile: any;
  action: string;
}

export interface sParams {
  searchParams: Record<string, string> | null | undefined;
}

export interface loginModel {
  username: string;
  password: string;
}

export interface changePwdModel {
  username?: string;
  cPwd?: string;
  nPwd?: string;
  cNPwd?: string;
}

export interface apiModel {
  message: string;
  body?: any;
}

export interface instanceModel {
  name: string;
  username?: string;
  password?: string;
  endpoint?: string;
  toSlate?: string;
}

export interface preProcessorModel {
  vpnUsername: string;
  vpnPassword: string;
  issmUsername: string;
  issmPassword: string;
  excelFile: any;
  instance: string;
}
