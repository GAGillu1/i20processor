"use strict";
(() => {
var exports = {};
exports.id = 333;
exports.ids = [333];
exports.modules = {

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 12432:
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

// NAMESPACE OBJECT: ./src/app/api/logs/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  GET: () => (GET)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(42394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(69692);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ./src/components/utils/getTokens.ts
var getTokens = __webpack_require__(30211);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(89335);
;// CONCATENATED MODULE: ./src/app/api/logs/route.ts


// -----------------------
// GET - LOGS
const basePath = process.env.BASE_PATH;
const logsApi = process.env.LOGS;
async function GET(request) {
    try {
        const res = await fetch(basePath + logsApi, {
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

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Flogs%2Froute&name=app%2Fapi%2Flogs%2Froute&pagePath=private-next-app-dir%2Fapi%2Flogs%2Froute.ts&appDir=D%3A%5CProjects%5CClone%5Ci20processor%5Cfrontend%5Csrc%5Capp&appPaths=%2Fapi%2Flogs%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/api/logs/route","pathname":"/api/logs","filename":"route","bundlePath":"app/api/logs/route"},"resolvedPagePath":"D:\\Projects\\Clone\\i20processor\\frontend\\src\\app\\api\\logs\\route.ts","nextConfigOutput":""}
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

    const originalPathname = "/api/logs/route"

    

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


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [697,501,335], () => (__webpack_exec__(12432)));
module.exports = __webpack_exports__;

})();