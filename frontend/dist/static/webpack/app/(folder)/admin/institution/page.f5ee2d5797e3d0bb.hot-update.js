"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/(folder)/admin/institution/page",{

/***/ "(app-pages-browser)/./src/app/(folder)/admin/institution/institutionList.tsx":
/*!****************************************************************!*\
  !*** ./src/app/(folder)/admin/institution/institutionList.tsx ***!
  \****************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst InstitutionList = (param)=>{\n    let { ...props } = param;\n    _s();\n    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams)();\n    const filteredList = props.institutionList.filter((item)=>{\n        var _item_institutionName;\n        return ((_item_institutionName = item.institutionName) === null || _item_institutionName === void 0 ? void 0 : _item_institutionName.toLowerCase().includes(props.search.toLowerCase())) || props.filter === item.institutionName;\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react__WEBPACK_IMPORTED_MODULE_3__.Fragment, {\n        children: filteredList.length > 0 ? filteredList.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                className: \"universityItem \" + \"\".concat(searchParams.get(\"institution\") === item.institutionName ? \"bg-indigo-300\" : \"bg-indigo-100\"),\n                href: \"/admin/institution/?institution=\" + item.institutionName,\n                children: item.institutionName\n            }, item.email, false, {\n                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionList.tsx\",\n                lineNumber: 20,\n                columnNumber: 11\n            }, undefined)) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n            className: \"text-sm tracking-wide text-slate-700\",\n            children: \"No Institutions found!\"\n        }, void 0, false, {\n            fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionList.tsx\",\n            lineNumber: 36,\n            columnNumber: 9\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionList.tsx\",\n        lineNumber: 17,\n        columnNumber: 5\n    }, undefined);\n};\n_s(InstitutionList, \"a+DZx9DY26Zf8FVy1bxe3vp9l1w=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams\n    ];\n});\n_c = InstitutionList;\n/* harmony default export */ __webpack_exports__[\"default\"] = (InstitutionList);\nvar _c;\n$RefreshReg$(_c, \"InstitutionList\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvKGZvbGRlcikvYWRtaW4vaW5zdGl0dXRpb24vaW5zdGl0dXRpb25MaXN0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRTZCO0FBQ3FCO0FBQ25CO0FBRS9CLE1BQU1HLGtCQUFrQjtRQUFDLEVBQUUsR0FBR0MsT0FBTzs7SUFDbkMsTUFBTUMsZUFBZUosZ0VBQWVBO0lBQ3BDLE1BQU1LLGVBQWVGLE1BQU1HLGVBQWUsQ0FBQ0MsTUFBTSxDQUMvQyxDQUFDQztZQUNDQTtlQUFBQSxFQUFBQSx3QkFBQUEsS0FBS0MsZUFBZSxjQUFwQkQsNENBQUFBLHNCQUNJRSxXQUFXLEdBQ1pDLFFBQVEsQ0FBQ1IsTUFBTVMsTUFBTSxDQUFDRixXQUFXLFFBQ3BDUCxNQUFNSSxNQUFNLEtBQUtDLEtBQUtDLGVBQWU7O0lBRXpDLHFCQUNFLDhEQUFDUiwyQ0FBYztrQkFDWkksYUFBYVMsTUFBTSxHQUFHLElBQ3JCVCxhQUFhVSxHQUFHLENBQUMsQ0FBQ1AscUJBQ2hCLDhEQUFDVCxrREFBSUE7Z0JBRUhpQixXQUNFLG9CQUNBLEdBSUMsT0FIQ1osYUFBYWEsR0FBRyxDQUFDLG1CQUFtQlQsS0FBS0MsZUFBZSxHQUNwRCxrQkFDQTtnQkFHUlMsTUFBTSxxQ0FBcUNWLEtBQUtDLGVBQWU7MEJBRTlERCxLQUFLQyxlQUFlO2VBWGhCRCxLQUFLVyxLQUFLOzs7OzJDQWVuQiw4REFBQ0M7WUFBRUosV0FBVTtzQkFBdUM7Ozs7Ozs7Ozs7O0FBTTVEO0dBbkNNZDs7UUFDaUJGLDREQUFlQTs7O0tBRGhDRTtBQXFDTiwrREFBZUEsZUFBZUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwLyhmb2xkZXIpL2FkbWluL2luc3RpdHV0aW9uL2luc3RpdHV0aW9uTGlzdC50c3g/MjJjNCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcclxuaW1wb3J0IHsgaW5zdGl0dXRpb25Nb2RlbCB9IGZyb20gXCJAL2NvbXBvbmVudHMvdXRpbHMvbW9kZWxzXCI7XHJcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcclxuaW1wb3J0IHsgdXNlU2VhcmNoUGFyYW1zIH0gZnJvbSBcIm5leHQvbmF2aWdhdGlvblwiO1xyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmNvbnN0IEluc3RpdHV0aW9uTGlzdCA9ICh7IC4uLnByb3BzIH0pID0+IHtcclxuICBjb25zdCBzZWFyY2hQYXJhbXMgPSB1c2VTZWFyY2hQYXJhbXMoKTtcclxuICBjb25zdCBmaWx0ZXJlZExpc3QgPSBwcm9wcy5pbnN0aXR1dGlvbkxpc3QuZmlsdGVyKFxyXG4gICAgKGl0ZW06IGluc3RpdHV0aW9uTW9kZWwpID0+XHJcbiAgICAgIGl0ZW0uaW5zdGl0dXRpb25OYW1lXHJcbiAgICAgICAgPy50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgLmluY2x1ZGVzKHByb3BzLnNlYXJjaC50b0xvd2VyQ2FzZSgpKSB8fFxyXG4gICAgICBwcm9wcy5maWx0ZXIgPT09IGl0ZW0uaW5zdGl0dXRpb25OYW1lXHJcbiAgKTtcclxuICByZXR1cm4gKFxyXG4gICAgPFJlYWN0LkZyYWdtZW50PlxyXG4gICAgICB7ZmlsdGVyZWRMaXN0Lmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgZmlsdGVyZWRMaXN0Lm1hcCgoaXRlbTogaW5zdGl0dXRpb25Nb2RlbCkgPT4gKFxyXG4gICAgICAgICAgPExpbmtcclxuICAgICAgICAgICAga2V5PXtpdGVtLmVtYWlsfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICAgIFwidW5pdmVyc2l0eUl0ZW0gXCIgK1xyXG4gICAgICAgICAgICAgIGAke1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoUGFyYW1zLmdldChcImluc3RpdHV0aW9uXCIpID09PSBpdGVtLmluc3RpdHV0aW9uTmFtZVxyXG4gICAgICAgICAgICAgICAgICA/IFwiYmctaW5kaWdvLTMwMFwiXHJcbiAgICAgICAgICAgICAgICAgIDogXCJiZy1pbmRpZ28tMTAwXCJcclxuICAgICAgICAgICAgICB9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhyZWY9e1wiL2FkbWluL2luc3RpdHV0aW9uLz9pbnN0aXR1dGlvbj1cIiArIGl0ZW0uaW5zdGl0dXRpb25OYW1lfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICB7aXRlbS5pbnN0aXR1dGlvbk5hbWV9XHJcbiAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgKSlcclxuICAgICAgKSA6IChcclxuICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRyYWNraW5nLXdpZGUgdGV4dC1zbGF0ZS03MDBcIj5cclxuICAgICAgICAgIE5vIEluc3RpdHV0aW9ucyBmb3VuZCFcclxuICAgICAgICA8L3A+XHJcbiAgICAgICl9XHJcbiAgICA8L1JlYWN0LkZyYWdtZW50PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbnN0aXR1dGlvbkxpc3Q7XHJcbiJdLCJuYW1lcyI6WyJMaW5rIiwidXNlU2VhcmNoUGFyYW1zIiwiUmVhY3QiLCJJbnN0aXR1dGlvbkxpc3QiLCJwcm9wcyIsInNlYXJjaFBhcmFtcyIsImZpbHRlcmVkTGlzdCIsImluc3RpdHV0aW9uTGlzdCIsImZpbHRlciIsIml0ZW0iLCJpbnN0aXR1dGlvbk5hbWUiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwic2VhcmNoIiwiRnJhZ21lbnQiLCJsZW5ndGgiLCJtYXAiLCJjbGFzc05hbWUiLCJnZXQiLCJocmVmIiwiZW1haWwiLCJwIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/(folder)/admin/institution/institutionList.tsx\n"));

/***/ })

});