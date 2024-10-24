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
  instance: string;
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
  type: string;
  username?: string;
  password?: string;
  endpoint?: string;
  instanceprocessor: string;
}

export interface preProcessorModel {
  vpnUsername: string;
  vpnPassword: string;
  issmUsername: string;
  issmPassword: string;
  excelFile: any;
  instance: string;
  vpn: boolean;
}

export interface logModel {
  processedDate: string;
  processedBy: string;
  processedMsg: any;
  result: string;
  processor: string;
  errorMessage: string;
}

export interface institutionModel {
  institutionName: string;
  adminFullName: string;
  email: string;
  crm: string;
  adminDisplayName: string;
  adminContact: string;
}

export interface preProcessorLogModel {
  message: string;
  status: string;
  studentId: string;
}
