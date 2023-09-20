"use strict";
exports.id = 771;
exports.ids = [771];
exports.modules = {

/***/ 11771:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IK: () => (/* binding */ userSchema),
/* harmony export */   JI: () => (/* binding */ i20Schema),
/* harmony export */   Ju: () => (/* binding */ forgotPwdSchema),
/* harmony export */   OC: () => (/* binding */ instanceSchema),
/* harmony export */   Qh: () => (/* binding */ changePwdSchema),
/* harmony export */   dm: () => (/* binding */ loginSchema),
/* harmony export */   eF: () => (/* binding */ addUserSchema),
/* harmony export */   nf: () => (/* binding */ addSignSchema),
/* harmony export */   uz: () => (/* binding */ preProcessorSchema)
/* harmony export */ });
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(50298);

const userSchema = yup__WEBPACK_IMPORTED_MODULE_0__/* .object */ .Ry({
    username: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().max(20, "You may only enter upto 20 characters").required("Please enter a username"),
    fullname: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().max(50, "You may only enter upto 50 characters").required("Please enter fullname"),
    email: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().email().max(50, "You may only enter upto 50 characters").required("Please enter a valid email address")
});
const i20Schema = yup__WEBPACK_IMPORTED_MODULE_0__/* .object */ .Ry({
    dsoName: yup__WEBPACK_IMPORTED_MODULE_0__/* .mixed */ .nK().required("Please select a DSO"),
    i20File: yup__WEBPACK_IMPORTED_MODULE_0__/* .mixed */ .nK().required("Please select a I20 file"),
    issmFile: yup__WEBPACK_IMPORTED_MODULE_0__/* .mixed */ .nK().required("Please select a issm file"),
    slateFile: yup__WEBPACK_IMPORTED_MODULE_0__/* .mixed */ .nK().required("Please select a slate file")
});
const addUserSchema = yup__WEBPACK_IMPORTED_MODULE_0__/* .object */ .Ry({
    username: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().max(20, "You may only enter upto 20 characters").required("Please enter a Username"),
    fullname: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().max(50, "You may only enter upto 50 characters").required("Please enter a Full name"),
    email: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().email().required("Please enter a email address").max(50, "You may only enter upto 50 characters")
});
const addSignSchema = yup__WEBPACK_IMPORTED_MODULE_0__/* .object */ .Ry({
    x: yup__WEBPACK_IMPORTED_MODULE_0__/* .number */ .Rx()// .max(10, "You may only enter upto 10 digits")
    .required("Please enter x-coordinates"),
    y: yup__WEBPACK_IMPORTED_MODULE_0__/* .number */ .Rx()// .max(10, "You may only enter upto 10 digits")
    .required("Please enter y-coordinates"),
    length: yup__WEBPACK_IMPORTED_MODULE_0__/* .number */ .Rx()// .max(100, "You may only enter upto 10 digits")
    .required("Please enter length"),
    width: yup__WEBPACK_IMPORTED_MODULE_0__/* .number */ .Rx()// .max(10, "You may only enter upto 10 digits")
    .required("Please enter width"),
    signFile: yup__WEBPACK_IMPORTED_MODULE_0__/* .mixed */ .nK().required("Please attach a signature"),
    action: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().required("Please select an action")
});
const loginSchema = yup__WEBPACK_IMPORTED_MODULE_0__/* .object */ .Ry({
    username: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().required("Please provide the username"),
    password: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().required("Please provide the password")
});
const forgotPwdSchema = yup__WEBPACK_IMPORTED_MODULE_0__/* .object */ .Ry({
    username: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().required("Please provide username")
});
const changePwdSchema = yup__WEBPACK_IMPORTED_MODULE_0__/* .object */ .Ry({
    cPwd: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().max(50, "You may only enter upto 50 characters").required("Please provide current password"),
    nPwd: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().max(50, "You may only enter upto 50 characters").required("Please provide new password"),
    cNPwd: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().label("nPwd").oneOf([
        yup__WEBPACK_IMPORTED_MODULE_0__/* .ref */ .iH("nPwd"),
        ""
    ], "Passwords must match").max(50, "You may only enter upto 50 characters").required("Please provide confirm new password")
});
const instanceSchema = yup__WEBPACK_IMPORTED_MODULE_0__/* .object */ .Ry({
    type: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().max(20, "You may only enter upto 20 characters").required("Please enter a Instance name"),
    username: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().max(20, "You may only enter upto 20 characters").required("Please enter a Username"),
    password: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().max(50, "You may only enter upto 50 characters").required("Please enter a Password"),
    endpoint: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().required("Please enter a endpoint address")
});
const preProcessorSchema = yup__WEBPACK_IMPORTED_MODULE_0__/* .object */ .Ry({
    vpnUsername: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().max(20, "You may only enter upto 20 characters").required("Please enter a VPN username"),
    vpnPassword: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().max(50, "You may only enter upto 50 characters").required("Please enter VPN Password"),
    issmUsername: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().max(20, "You may only enter upto 20 characters").required("Please enter ISSM Username"),
    issmPassword: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().max(50, "You may only enter upto 50 characters").required("Please enter ISSM Password"),
    excelFile: yup__WEBPACK_IMPORTED_MODULE_0__/* .mixed */ .nK().required("Please attach the Excel file"),
    instance: yup__WEBPACK_IMPORTED_MODULE_0__/* .string */ .Z_().required("Please select an Instance")
});


/***/ })

};
;