exports.id = 469;
exports.ids = [469];
exports.modules = {

/***/ 72361:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 3678))

/***/ }),

/***/ 3678:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Layout)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./src/assets/myIcons.tsx
var myIcons = __webpack_require__(97751);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(11440);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(57114);
// EXTERNAL MODULE: ./src/components/myContext.tsx
var myContext = __webpack_require__(9629);
// EXTERNAL MODULE: ./node_modules/react-hot-toast/dist/index.mjs + 1 modules
var dist = __webpack_require__(10345);
;// CONCATENATED MODULE: ./src/components/navBar.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 









const NavBar = ()=>{
    const path = (0,navigation.usePathname)();
    const dispatch = (0,myContext.useContextDispatch)();
    const userData = (0,myContext.useMyContext)();
    const router = (0,navigation.useRouter)();
    async function logoutUser() {
        dispatch({
            type: "logout"
        });
        await fetch("/api/logout");
        dist.toast.success("Logout Successful!");
        router.push("/login");
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
        className: "py-12 px-10 flex flex-col h-screen items-center font-semibold text-gray-600 justify-between tracking-wider top-0",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "pt-3",
                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/",
                    className: "font-extrabold text-3xl text-indigo-700 ",
                    children: "I-20 Processor"
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex gap-4 justify-between flex-col",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                        href: "/",
                        className: `navLink ${path === "/" ? "activeNavLink" : ""}`,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(myIcons/* HomeIcon */.tv, {}),
                            "Home"
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                        className: `navLink ${path.includes("/i20") ? "activeNavLink" : ""}`,
                        href: "/i20",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(myIcons/* I20Icon */.B4, {}),
                            "I20"
                        ]
                    }),
                    userData.role === "ADMIN" && /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                        className: `navLink ${path.includes("/admin") ? "activeNavLink" : ""}`,
                        href: "/admin",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(myIcons/* AdminIcon */.L, {}),
                            "Admin"
                        ]
                    }),
                    userData.role !== "USER" && /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                        className: `navLink ${path === "/dso" ? "activeNavLink" : ""}`,
                        href: "/dso",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(myIcons/* DsoIcon */.SU, {}),
                            " DSO"
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                        href: "/logs",
                        className: `navLink ${path === "/logs" ? "activeNavLink" : ""}`,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(myIcons/* LogsIcon */.I$, {}),
                            "Logs"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                        href: "/support",
                        className: "navLink text-slate-500 font-normal",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(myIcons/* SupportIcon */.CE, {}),
                            " Support"
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                        className: "font-normal text-slate-500 bg-indigo-50",
                        onClick: ()=>logoutUser(),
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(myIcons/* LogoutIcon */.R0, {}),
                            "Logout"
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const navBar = (NavBar);

;// CONCATENATED MODULE: ./src/components/utils/getTokens.ts
function getToken(request) {
    const headers = new Headers();
    const token = request.cookies.get("authorization")?.value;
    const institutionid = request.cookies.get("institutionid")?.value;
    const username = request.cookies.get("username")?.value;
    if (token) headers.append("authorization", token);
    if (institutionid) headers.append("institutionid", institutionid);
    if (username) headers.append("username", username);
    headers.append("Access-Control-Allow-Origin", "*");
    return headers;
}
function getGreeting() {
    const hours = Number(new Date().getHours());
    if (hours < 12) return "Good Morning";
    else if (hours < 16) return "Good Afternoon";
    return "Good Evening";
}

;// CONCATENATED MODULE: ./src/components/header.tsx





const Header = ()=>{
    const userData = (0,myContext.useMyContext)();
    const greeting = getGreeting();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: "w-[95%] mx-auto flex justify-between items-center py-12",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h1", {
                        className: "text-3xl font-bold tracking-tight text-slate-800",
                        children: [
                            greeting,
                            ", ",
                            userData.fullname
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                        className: "font-semibold text-lg text-slate-600",
                        children: [
                            "Welcome to ",
                            userData.institutionname,
                            " I-20 Processor.."
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                className: "bg-white rounded-lg tracking-wider py-2 px-4 font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition duration-150 flex items-center gap-2",
                href: "/profile",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(myIcons/* ProfileIcon */.m2, {}),
                    "Profile"
                ]
            })
        ]
    });
};
/* harmony default export */ const header = (Header);

// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
;// CONCATENATED MODULE: ./src/app/(folder)/layout.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 



function Layout({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx(react_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "grid grid-cols-6",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(navBar, {}),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                    className: "col-span-5 bg-indigo-200 rounded-l-3xl my-3",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(header, {}),
                        children
                    ]
                })
            ]
        })
    });
}


/***/ }),

/***/ 95636:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61363);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`D:\Projects\Clone\i20processor\frontend\src\app\(folder)\layout.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ })

};
;