import * as Yup from "yup";

export const userSchema = Yup.object({
  username: Yup.string()
    .max(20, "You may only enter upto 20 characters")
    .required("Please enter a username"),
  fullname: Yup.string()
    .max(50, "You may only enter upto 50 characters")
    .required("Please enter fullname"),
  email: Yup.string()
    .email()
    .max(50, "You may only enter upto 50 characters")
    .required("Please enter a valid email address"),
});

export const i20Schema = Yup.object({
  dsoName: Yup.mixed().required("Please select a DSO"),
  i20File: Yup.mixed().required("Please select a I20 file"),
  issmFile: Yup.mixed().required("Please select a issm file"),
  slateFile: Yup.mixed().required("Please select a slate file"),
  // prog: Yup.mixed().required("Please select a Program"),
});

export const addUserSchema = Yup.object({
  username: Yup.string()
    .max(20, "You may only enter upto 20 characters")
    .required("Please enter a Username"),
  fullname: Yup.string()
    .max(50, "You may only enter upto 50 characters")
    .required("Please enter a Full name"),
  email: Yup.string()
    .email()
    .required("Please enter a email address")
    .max(50, "You may only enter upto 50 characters"),
});

export const addSignSchema = Yup.object({
  x: Yup.number()
    // .max(10, "You may only enter upto 10 digits")
    .required("Please enter x-coordinates"),
  y: Yup.number()
    // .max(10, "You may only enter upto 10 digits")
    .required("Please enter y-coordinates"),
  length: Yup.number()
    // .max(100, "You may only enter upto 10 digits")
    .required("Please enter length"),
  width: Yup.number()
    // .max(10, "You may only enter upto 10 digits")
    .required("Please enter width"),
  signFile: Yup.mixed().required("Please attach a signature"),
  action: Yup.string().required("Please select an action"),
});

export const loginSchema = Yup.object({
  username: Yup.string().required("Please provide the username"),
  password: Yup.string().required("Please provide the password"),
});

export const forgotPwdSchema = Yup.object({
  username: Yup.string().required("Please provide username"),
});

export const changePwdSchema = Yup.object({
  cPwd: Yup.string()
    .max(50, "You may only enter upto 50 characters")
    .required("Please provide current password"),
  nPwd: Yup.string()
    .max(50, "You may only enter upto 50 characters")
    .required("Please provide new password"),
  cNPwd: Yup.string()
    .label("nPwd")
    .oneOf([Yup.ref("nPwd"), ""], "Passwords must match")
    .max(50, "You may only enter upto 50 characters")
    .required("Please provide confirm new password"),
});

export const instanceSchema = Yup.object({
  name: Yup.string()
    .max(20, "You may only enter upto 20 characters")
    .required("Please enter a Instance name"),
  username: Yup.string()
    .max(20, "You may only enter upto 20 characters")
    .required("Please enter a Username"),
  password: Yup.string()
    .max(50, "You may only enter upto 50 characters")
    .required("Please enter a Password"),
  endpoint: Yup.string()
    .required("Please enter a endpoint address")
    .max(100, "You may only enter upto 100 characters"),
});

export const preProcessorSchema = Yup.object({
  vpnUsername: Yup.string()
    .max(20, "You may only enter upto 20 characters")
    .required("Please enter a VPN username"),
  vpnPassword: Yup.string()
    .max(50, "You may only enter upto 50 characters")
    .required("Please enter VPN Password"),
  issmUsername: Yup.string()
    .max(20, "You may only enter upto 20 characters")
    .required("Please enter ISSM Username"),
  issmPassword: Yup.string()
    .max(50, "You may only enter upto 50 characters")
    .required("Please enter ISSM Password"),
  excelFile: Yup.object().required("Please attach the Excel file"),
  instance: Yup.string().required("Please select an Instance"),
});
