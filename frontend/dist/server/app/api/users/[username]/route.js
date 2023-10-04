"use strict";
(() => {
var exports = {};
exports.id = 5749;
exports.ids = [5749];
exports.modules = {

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 15051:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./src/app/api/users/[username]/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  DELETE: () => (DELETE),
  GET: () => (GET),
  POST: () => (POST),
  PUT: () => (PUT)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(42394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(69692);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(89335);
// EXTERNAL MODULE: ./src/components/utils/getTokens.ts
var getTokens = __webpack_require__(30211);
;// CONCATENATED MODULE: ./src/app/api/users/[username]/route.ts


// -----------------------
// GET - USER INFO
const basePath = process.env.BASE_PATH;
const usersApi = process.env.USERS;
const addSignApi = process.env.ADD_SIGN;
async function GET(request, { params }) {
    try {
        const usr = "/" + params.username;
        const res = await fetch(basePath + usersApi + usr, {
            headers: (0,getTokens/* getToken */.L)(request)
        });
        const data = await res.json();
        console.log("user details", data);
        return next_response/* default */.Z.json(data, {
            status: res.status
        });
    } catch (err) {
        return next_response/* default */.Z.json({
            message: "Something went wrong!"
        }, {
            status: 500
        });
    }
}
// -----------------------
// PUT - UPDATE USER
async function PUT(request, { params }) {
    try {
        const usr = "/" + params.username;
        const body = await request.formData();
        const res = await fetch(basePath + usersApi + usr, {
            method: "PUT",
            body: body,
            headers: (0,getTokens/* getToken */.L)(request)
        });
        const data = await res.json();
        return next_response/* default */.Z.json(data, {
            status: res.status
        });
    } catch (err) {
        return next_response/* default */.Z.json({
            message: "Something went wrong!"
        }, {
            status: 500
        });
    }
}
// -----------------------
// POST - ADD SIGN
async function POST(request, { params }) {
    if (basePath && addSignApi) try {
        const usr = "/" + params.username;
        const body = await request.formData();
        const res = await fetch(basePath + addSignApi + usr, {
            method: "POST",
            body: body,
            headers: (0,getTokens/* getToken */.L)(request)
        });
        if (res.ok) return res;
        const data = await res.json();
        // console.log("userInfo", data);
        return next_response/* default */.Z.json(data, {
            status: res.status
        });
    } catch (err) {
        return next_response/* default */.Z.json({
            message: "Something went wrong!"
        }, {
            status: 500
        });
    }
}
// -----------------------
// DELETE - TOGGLE USER ACTIVE
async function DELETE(request, { params }) {
    try {
        const usr = params.username;
        console.log("user", usr);
        const res = await fetch("http://127.0.0.1:8081/users/" + usr, {
            method: "DELETE",
            headers: (0,getTokens/* getToken */.L)(request)
        });
        if (res.ok) return res;
        const data = await res.json();
        console.log("res", data);
        return next_response/* default */.Z.json(data, {
            status: res.status
        });
    } catch (err) {
        return next_response/* default */.Z.json({
            message: "Something went wrong!"
        }, {
            status: 500
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fusers%2F%5Busername%5D%2Froute&name=app%2Fapi%2Fusers%2F%5Busername%5D%2Froute&pagePath=private-next-app-dir%2Fapi%2Fusers%2F%5Busername%5D%2Froute.ts&appDir=D%3A%5CProjects%5CClone%5Ci20processor%5Cfrontend%5Csrc%5Capp&appPaths=%2Fapi%2Fusers%2F%5Busername%5D%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/api/users/[username]/route","pathname":"/api/users/[username]","filename":"route","bundlePath":"app/api/users/[username]/route"},"resolvedPagePath":"D:\\Projects\\Clone\\i20processor\\frontend\\src\\app\\api\\users\\[username]\\route.ts","nextConfigOutput":""}
    const routeModule = new (module_default())({
      ...options,
      userland: route_namespaceObject,
    })

    // Pull out the exports that we need to expose from the module. This should
    // be eliminated when we've moved the other routes to the new format. These
    // are used to hook into the route.
    const {
      requestAsyncStorage,
      staticGenerationAsyncStorage,
      serverHooks,
      headerHooks,
      staticGenerationBailout
    } = routeModule

    const originalPathname = "/api/users/[username]/route"

    

/***/ }),

/***/ 30211:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L: () => (/* binding */ getToken)
/* harmony export */ });
/* unused harmony export getGreeting */
function getToken(request) {
    const headers = new Headers();
    const token = request.cookies.get("authorization")?.value;
    const institutionid = request.cookies.get("institutionid")?.value;
    const username = request.cookies.get("username")?.value;
    const role = request.cookies.get("role")?.value;
    if (token) headers.append("authorization", token);
    if (institutionid) headers.append("institutionid", institutionid);
    if (username) headers.append("username", username);
    if (role) headers.append("role", role);
    headers.append("Access-Control-Allow-Origin", "*");
    return headers;
}
function getGreeting() {
    const hours = Number(new Date().getHours());
    if (hours < 12) return "Good Morning";
    else if (hours < 16) return "Good Afternoon";
    return "Good Evening";
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [2697,5501,9335], () => (__webpack_exec__(15051)));
module.exports = __webpack_exports__;

})();