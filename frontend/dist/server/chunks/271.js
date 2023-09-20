"use strict";
exports.id = 271;
exports.ids = [271];
exports.modules = {

/***/ 33278:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_myIcons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(97751);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(27439);



const ErrorMsg = ({ ...errorProps })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(formik__WEBPACK_IMPORTED_MODULE_2__.ErrorMessage, {
        ...errorProps,
        render: (msg)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: errorProps.className,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "flex gap-2 text-red-700",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_myIcons__WEBPACK_IMPORTED_MODULE_1__/* .ErrorIcon */ .Pz, {
                            className: "w-6 h-6"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: msg
                        })
                    ]
                })
            })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorMsg);


/***/ }),

/***/ 21159:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ getFormData)
/* harmony export */ });
function getFormData(val) {
    let fD = new FormData();
    for (const [key, value] of Object.entries(val)){
        fD.append(key, value);
    }
    return fD;
}


/***/ }),

/***/ 26496:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gw: () => (/* binding */ loginIV),
/* harmony export */   Jv: () => (/* binding */ updateUserIV),
/* harmony export */   U0: () => (/* binding */ i20IV),
/* harmony export */   Us: () => (/* binding */ preProcessorIV),
/* harmony export */   Wj: () => (/* binding */ userInfoIV),
/* harmony export */   Yi: () => (/* binding */ changePwdIV),
/* harmony export */   bi: () => (/* binding */ addUserIV),
/* harmony export */   dr: () => (/* binding */ addSignIV),
/* harmony export */   mI: () => (/* binding */ dsoIV),
/* harmony export */   uv: () => (/* binding */ instanceIV),
/* harmony export */   w4: () => (/* binding */ forgotPwdIV)
/* harmony export */ });
const addUserIV = {
    username: "",
    fullname: "",
    email: "",
    role: "USER"
};
const userInfoIV = {
    username: "",
    fullname: "",
    email: "",
    role: "",
    signature: ""
};
const dsoIV = {
    sign: "",
    dso: "",
    split: "",
    i20File: ""
};
const i20IV = {
    i20Type: "initI20",
    dsoName: "",
    i20File: "",
    issmFile: "",
    slateFile: "",
    toSlate: "n",
    prog: "ug"
};
const addSignIV = {
    x: 80,
    y: 180,
    length: 160,
    width: 60,
    signFile: "",
    action: ""
};
const loginIV = {
    username: "",
    password: ""
};
const forgotPwdIV = {
    username: ""
};
const changePwdIV = {
    cPwd: "",
    nPwd: "",
    cNPwd: ""
};
const updateUserIV = {
    username: "",
    fullname: "",
    email: ""
};
const instanceIV = {
    type: "",
    username: "",
    password: "",
    endpoint: ""
};
const preProcessorIV = {
    vpnUsername: "",
    vpnPassword: "",
    issmUsername: "",
    issmPassword: "",
    excelFile: "",
    instance: ""
};


/***/ }),

/***/ 12619:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IA: () => (/* binding */ MyCheckBox),
/* harmony export */   PI: () => (/* binding */ MyInput),
/* harmony export */   S2: () => (/* binding */ FileInput),
/* harmony export */   ZD: () => (/* binding */ Toggle),
/* harmony export */   vN: () => (/* binding */ DsoCheckBox),
/* harmony export */   xM: () => (/* binding */ MySubmit)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _myContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9629);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _headlessui_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(39949);
/* __next_internal_client_entry_do_not_use__ MyInput,MyCheckBox,DsoCheckBox,FileInput,Toggle,MySubmit auto */ 



// -----------------------
// CUSTOM INPUT
const MyInput = ({ ...props })=>{
    const dispatch = (0,_myContext__WEBPACK_IMPORTED_MODULE_1__.useContextDispatch)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("select", {
        ...props,
        onChange: (e)=>{
            props.form.setFieldValue(props.field.name, e.target.value);
            dispatch({
                type: "slateInput",
                data: e.target.value
            });
        }
    });
};
// -----------------------
// CHECKBOX FOR FORMIK
const MyCheckBox = ({ ...props })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
        type: "checkbox",
        onChange: (e)=>{
            props.form.setFieldValue(props.field.name, e.target.value);
        },
        ...props
    });
};
// -----------------------
// DSO CHECKBOX
const DsoCheckBox = ({ ...props })=>{
    const dispatch = (0,_myContext__WEBPACK_IMPORTED_MODULE_1__.useContextDispatch)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
        type: "checkbox",
        onChange: (e)=>{
            props.form.setFieldValue(props.field.name, e.target.value);
            dispatch({
                type: "dsoSign",
                data: e.target.checked
            });
        },
        ...props
    });
};
// -----------------------
// FILE INPUT FOR FORMIK
const FileInput = ({ ...props })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
        type: "file",
        ...props,
        onChange: (e)=>{
            props.form.setFieldValue(props.field.name, e.currentTarget.files[0]);
        }
    });
};
// -----------------------
// TOGGLE - HEADLESS UI
const Toggle = ({ ...props })=>{
    const [enabled, setEnabled] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(props.active);
    const toggleUser = ()=>{
        setEnabled(!enabled);
        props.form.setFieldValue(props.field.name, !enabled);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center justify-end gap-2",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
                children: enabled ? "Active" : "Inactive"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: `group ${props.disabled ? "opacity-70 group-hover:transition-none" : ""}`,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_headlessui_react__WEBPACK_IMPORTED_MODULE_3__/* .Switch */ .r, {
                    checked: enabled,
                    onChange: ()=>toggleUser(),
                    className: `${enabled ? "bg-green-600 group-hover:bg-green-700" : "bg-red-600 group-hover:bg-red-700"} relative inline-flex h-6 w-12 items-center rounded-full transition duration-150`,
                    disabled: props.disabled,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "sr-only",
                            children: props.name
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: `${enabled ? "translate-x-3" : "-translate-x-3"} inline-block h-4 w-4 transform rounded-full bg-white transition group-hover:scale-125 duration-150`
                        })
                    ]
                })
            })
        ]
    });
};
// -----------------------
// SUBMIT BUTTON
const MySubmit = ({ ...props })=>{
    return !props.hidden && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
        type: "submit",
        disabled: props.loading,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "animate-ping w-2 h-2 bg-indigo-700 rounded-full absolute",
                hidden: !props.loading
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "w-2 h-2 bg-indigo-900 rounded-full",
                hidden: !props.loading
            }),
            !props.loading && props.children,
            props.loading ? `${props.loadingMsg}` : `${props.action}`
        ]
    });
};


/***/ })

};
;