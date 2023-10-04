"use strict";
(() => {
var exports = {};
exports.id = 5740;
exports.ids = [5740];
exports.modules = {

/***/ 22037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 96609:
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

// NAMESPACE OBJECT: ./src/app/api/login/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  POST: () => (POST),
  PUT: () => (PUT)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(42394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(69692);
var module_default = /*#__PURE__*/__webpack_require__.n(app_route_module);
// EXTERNAL MODULE: ./node_modules/next/headers.js
var next_headers = __webpack_require__(40063);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(89335);
;// CONCATENATED MODULE: ./src/app/api/login/route.ts


const basePath = process.env.BASE_PATH;
const forgotApi = process.env.FORGOT;
const loginApi = process.env.LOGIN;
async function POST(request) {
    const cookieStore = (0,next_headers.cookies)();
    const headers = new Headers(request.headers);
    try {
        const res = await fetch(basePath + loginApi, {
            method: "POST",
            headers: headers
        });
        const data = await res.json();
        if (res.ok) {
            res.headers.forEach((e, k)=>{
                console.log("headers", k, e);
                if (k === "username" || k === "authorization" || k === "institutionid" || k === "role") cookieStore.set(k, e, {
                    httpOnly: true,
                    expires: Date.now() + 60 * 60 * 1000
                });
            });
        }
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
// PUT - FORGOT PASSWORD
async function PUT(request) {
    try {
        const body = await request.formData();
        const res = await fetch(basePath + forgotApi, {
            method: "PUT",
            body: body
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

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Flogin%2Froute&name=app%2Fapi%2Flogin%2Froute&pagePath=private-next-app-dir%2Fapi%2Flogin%2Froute.ts&appDir=D%3A%5CProjects%5CClone%5Ci20processor%5Cfrontend%5Csrc%5Capp&appPaths=%2Fapi%2Flogin%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

    

    

    

    const options = {"definition":{"kind":"APP_ROUTE","page":"/api/login/route","pathname":"/api/login","filename":"route","bundlePath":"app/api/login/route"},"resolvedPagePath":"D:\\Projects\\Clone\\i20processor\\frontend\\src\\app\\api\\login\\route.ts","nextConfigOutput":""}
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

    const originalPathname = "/api/login/route"

    

/***/ }),

/***/ 40063:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = __webpack_require__(74937);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [2697,5501,9335], () => (__webpack_exec__(96609)));
module.exports = __webpack_exports__;

})();