import { instanceModel } from "./models";
export const addUserIV = {
  username: "",
  fullName: "",
  email: "",
  role: "USER",
};

export const userInfoIV = {
  username: "",
  fullName: "",
  email: "",
  role: "",
  signature: "",
};

export const dsoIV = {
  sig: "",
  dso: "",
  split: "",
  i20File: "",
};

export const i20IV = {
  i20Type: "initI20",
  dsoName: "",
  i20File: "",
  issmFile: "",
  slateFile: "",
  toSlate: "n",
  prog: "ug",
};

export const addSignIV = {
  x: 80,
  y: 180,
  length: 160,
  width: 60,
  signFile: "",
  action: "",
};

export const loginIV = {
  username: "",
  password: "",
};

export const forgotPwdIV = {
  username: "",
};

export const changePwdIV = {
  cPwd: "",
  nPwd: "",
  cNPwd: "",
};

export const updateUserIV = {
  username: "",
  fullname: "",
  email: "",
};

export const instanceIV = {
  name: "",
  username: "",
  password: "",
  endpoint: "",
  toSlate: "n",
};
