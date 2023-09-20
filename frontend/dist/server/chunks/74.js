exports.id = 74;
exports.ids = [74];
exports.modules = {

/***/ 7086:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 31232, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 52987, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 56926, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 50831, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 44282, 23))

/***/ }),

/***/ 76222:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 50954, 23))

/***/ }),

/***/ 95905:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 10345));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 46479));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 9629))

/***/ }),

/***/ 9629:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MyContextProvider: () => (/* binding */ MyContextProvider),
/* harmony export */   useContextDispatch: () => (/* binding */ useContextDispatch),
/* harmony export */   useMyContext: () => (/* binding */ useMyContext)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* __next_internal_client_entry_do_not_use__ MyContextProvider,useMyContext,useContextDispatch auto */ 

const MyContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
const MyDispatchContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
function MyContextProvider({ children }) {
    const now = new Date();
    const [data, dispatch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useReducer)(MyReducer, initialData);
    const getLocalData = async ()=>{
        const ifData = localStorage.getItem("data");
        if (ifData) {
            // console.log("GET", JSON.parse(ifData));
            const data = JSON.parse(ifData);
            if (now.getTime() > data.expiry) {
                localStorage.clear();
                fetch("/api/logout");
            } else {
                dispatch({
                    data: data.value,
                    type: "firstRender"
                });
            }
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getLocalData();
    }, []);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (data !== initialData) {
            const ttl = 60 * 60 * 1000;
            const item = {
                value: data,
                expiry: now.getTime() + ttl
            };
            localStorage.setItem("data", JSON.stringify(item));
        }
    }, [
        data
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MyContext.Provider, {
        value: data,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(MyDispatchContext.Provider, {
            value: dispatch,
            children: children
        })
    });
}
function useMyContext() {
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(MyContext);
}
function useContextDispatch() {
    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(MyDispatchContext);
}
function MyReducer(data, action) {
    switch(action.type){
        case "firstRender":
            {
                return action.data;
            }
        case "login":
            {
                return {
                    ...data,
                    loggedIn: true,
                    username: action.action.username,
                    fullname: action.action.fullname,
                    role: action.action.role,
                    institutionname: action.action.institutionname
                };
            }
        case "logout":
            {
                localStorage.removeItem("data");
                return {
                    ...initialData
                };
            }
        case "slateInput":
            {
                return {
                    ...data,
                    toSlate: action.data
                };
            }
        case "dsoSign":
            {
                return {
                    ...data,
                    dsoSign: action.data
                };
            }
        case "userUpdate":
            {
                console.log(action.data);
                return {
                    ...data,
                    fullname: action.action.fullname,
                    username: action.action.username
                };
            }
        case "preProcessUpdate":
            {
                console.log("Pre-process Context", action.action);
                return {
                    ...data,
                    preProcessStatus: action.action
                };
            }
        case "preProcessMaxCount":
            {
                console.log("Pre-processMaxCount Context", action.action);
                return {
                    ...data,
                    preProcessMaxCount: action.action
                };
            }
        case "postProcessUpdate":
            {
                console.log("Post-process Context", action.action);
                return {
                    ...data,
                    postProcessStatus: action.action
                };
            }
        case "preProcessorState":
            {
                // console.log("Pre-process Context", action.action);
                return {
                    ...data,
                    preProcessorState: action.action
                };
            }
        case "postProcessorState":
            {
                // console.log("Post-process Context", action.action);
                return {
                    ...data,
                    postProcessorState: action.action
                };
            }
        default:
            {
                throw Error("Unknown action: " + action.type);
            }
    }
}
const initialData = {
    username: "",
    fullname: "",
    role: "",
    loggedIn: false,
    toSlate: "n",
    dsoSign: false,
    preProcessStatus: 0,
    postProcessStatus: 0,
    preProcessMaxCount: 0,
    preProcessorState: {},
    postProcessorState: {}
};


/***/ }),

/***/ 46479:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Socket)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(77369);
/* harmony import */ var _myContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9629);
/* __next_internal_client_entry_do_not_use__ default auto */ 


function Socket() {
    const socket = (0,socket_io_client__WEBPACK_IMPORTED_MODULE_1__.io)("ws://127.0.0.1:8081");
    const dispatch = (0,_myContext__WEBPACK_IMPORTED_MODULE_2__.useContextDispatch)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        function onConnect() {
            socket.connect();
        }
        function onDisconnect() {
            socket.disconnect();
        }
        function onPostProcessUpdate(value) {
            console.log("PostProcess Update", value);
            dispatch({
                type: "postProcessUpdate",
                action: value
            });
        }
        function onPreProcessUpdate(value) {
            console.log("PreProcess Update", value);
            dispatch({
                type: "preProcessUpdate",
                action: value
            });
        }
        function onPreProcessMaxCount(value) {
            console.log("PreProcess Max Count", value);
            dispatch({
                type: "preProcessMaxCount",
                action: value
            });
        }
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("rom", onPostProcessUpdate);
        socket.on("preProcessor", onPreProcessUpdate);
        socket.on("preProcessorMaxCount", onPreProcessMaxCount);
        return ()=>{
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("rom", onPostProcessUpdate);
            socket.off("preProcessor", onPreProcessUpdate);
            socket.off("preProcessor", onPreProcessMaxCount);
        };
    }, [
        socket,
        dispatch
    ]);
    return null;
}


/***/ }),

/***/ 7134:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/next/font/google/target.css?{"path":"src\\app\\layout.tsx","import":"Poppins","arguments":[{"weight":["100","200","300","400","500","600","700","800","900"],"style":["italic","normal"],"subsets":["latin"]}],"variableName":"font"}
var target_path_src_app_layout_tsx_import_Poppins_arguments_weight_100_200_300_400_500_600_700_800_900_style_italic_normal_subsets_latin_variableName_font_ = __webpack_require__(76855);
var target_path_src_app_layout_tsx_import_Poppins_arguments_weight_100_200_300_400_500_600_700_800_900_style_italic_normal_subsets_latin_variableName_font_default = /*#__PURE__*/__webpack_require__.n(target_path_src_app_layout_tsx_import_Poppins_arguments_weight_100_200_300_400_500_600_700_800_900_style_italic_normal_subsets_latin_variableName_font_);
// EXTERNAL MODULE: ./src/app/globals.css
var globals = __webpack_require__(5023);
;// CONCATENATED MODULE: ./src/components/footer.tsx

const Footer = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("footer", {});
};
/* harmony default export */ const footer = (Footer);

// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(61363);
;// CONCATENATED MODULE: ./src/components/myContext.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`D:\Projects\Clone\i20processor\frontend\src\components\myContext.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;

const e0 = proxy["MyContextProvider"];

const e1 = proxy["useMyContext"];

const e2 = proxy["useContextDispatch"];

// EXTERNAL MODULE: ./node_modules/react-hot-toast/dist/index.mjs
var dist = __webpack_require__(86014);
;// CONCATENATED MODULE: ./src/components/utils/websockets.tsx

const websockets_proxy = (0,module_proxy.createProxy)(String.raw`D:\Projects\Clone\i20processor\frontend\src\components\utils\websockets.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: websockets_esModule, $$typeof: websockets_$$typeof } = websockets_proxy;
const websockets_default_ = websockets_proxy.default;


/* harmony default export */ const websockets = (websockets_default_);
;// CONCATENATED MODULE: ./src/app/layout.tsx







const metadata = {
    title: "I-20 Processor",
    description: "One stop shop for all I-20 needs"
};
function RootLayout({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(e0, {
        children: /*#__PURE__*/ jsx_runtime_.jsx("html", {
            lang: "en",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("body", {
                className: (target_path_src_app_layout_tsx_import_Poppins_arguments_weight_100_200_300_400_500_600_700_800_900_style_italic_normal_subsets_latin_variableName_font_default()).className,
                children: [
                    children,
                    /*#__PURE__*/ jsx_runtime_.jsx(footer, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(dist/* Toaster */.x7, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(websockets, {})
                ]
            })
        })
    });
}


/***/ }),

/***/ 18275:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25124);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);


const NotFound = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
        className: "bg-indigo-200 h-screen text-center     py-16",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
            className: "bg-white rounded-2xl w-2/3 mx-auto flex flex-col items-center justify-center p-8 gap-2",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h1", {
                    className: "text-8xl font-black tracking-tight text-slate-700",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "text-red-600 block",
                            children: "404"
                        }),
                        "Page Not Found!"
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    className: "text-sm text-slate-600 underline py-2",
                    children: "We are sorry, but the page you requested was not found"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "py-2",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                            className: "mr-2 button",
                            href: "/",
                            children: "Home"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                            className: "ml-2 button",
                            href: "/support",
                            children: "Support"
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotFound);


/***/ }),

/***/ 97026:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80085);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/svg+xml","sizes":"any"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "icon.svg")

    return [{
      ...imageData,
      url: imageUrl + "?2c4e33d1da913a68",
    }]
  });

/***/ }),

/***/ 5023:
/***/ (() => {



/***/ })

};
;