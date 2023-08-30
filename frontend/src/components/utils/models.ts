export interface userModel {
  username: string;
  fullname?: string;
  email?: string;
  role?: string;
  signature?: any;
}

export interface dsoModel {
  sig: string;
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
