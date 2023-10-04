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

/***/ "(app-pages-browser)/./src/app/(folder)/admin/institution/institutionInfo.tsx":
/*!****************************************************************!*\
  !*** ./src/app/(folder)/admin/institution/institutionInfo.tsx ***!
  \****************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! formik */ \"(app-pages-browser)/./node_modules/formik/dist/formik.esm.js\");\n/* harmony import */ var _components_utils_errorMsg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/utils/errorMsg */ \"(app-pages-browser)/./src/components/utils/errorMsg.tsx\");\n/* harmony import */ var _assets_myIcons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/assets/myIcons */ \"(app-pages-browser)/./src/assets/myIcons.tsx\");\n/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-hot-toast */ \"(app-pages-browser)/./node_modules/react-hot-toast/dist/index.mjs\");\n/* harmony import */ var _components_utils_getFormData__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/utils/getFormData */ \"(app-pages-browser)/./src/components/utils/getFormData.ts\");\n/* harmony import */ var _components_utils_valSchemas__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/components/utils/valSchemas */ \"(app-pages-browser)/./src/components/utils/valSchemas.ts\");\n/* harmony import */ var _components_utils_initialValues__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/components/utils/initialValues */ \"(app-pages-browser)/./src/components/utils/initialValues.ts\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\nconst InstitutionInfo = ()=>{\n    _s();\n    const [institutionInfo, setInstitutionInfo] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(_components_utils_initialValues__WEBPACK_IMPORTED_MODULE_9__.institutionIV);\n    const institutionName = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.useSearchParams)().get(\"institution\");\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true);\n    const [editable, setEditable] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        setLoading(true);\n        getInstitutionInfo(institutionName);\n        setEditable(true);\n    }, [\n        institutionName\n    ]);\n    const updateInstitution = async (values)=>{\n        try {\n            console.log(\"Institution Info\", values);\n            const res = await fetch(\"/api/institution/\" + institutionName, {\n                method: \"PUT\",\n                body: (0,_components_utils_getFormData__WEBPACK_IMPORTED_MODULE_7__[\"default\"])(values)\n            });\n            if (!res.ok) throw res;\n            const data = await res.json();\n            console.log(data);\n            react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.success(data.message);\n        } catch (err) {\n            const data = await err.json();\n            react_hot_toast__WEBPACK_IMPORTED_MODULE_6__.toast.error(data.message);\n        }\n    };\n    const getInstitutionInfo = async (institutionName)=>{\n        await fetch(\"/api/institution/\" + institutionName).then((res)=>res.json()).then((institutionInfo)=>{\n            setInstitutionInfo(institutionInfo.data);\n        }).then(()=>{\n            setLoading(false);\n        });\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"text-center font-bold text-xl text-slate-700 py-2\",\n                children: \"Institution Info\"\n            }, void 0, false, {\n                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                lineNumber: 57,\n                columnNumber: 7\n            }, undefined),\n            !loading && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(formik__WEBPACK_IMPORTED_MODULE_3__.Formik, {\n                initialValues: institutionInfo,\n                validationSchema: _components_utils_valSchemas__WEBPACK_IMPORTED_MODULE_8__.institutionSchema,\n                onSubmit: (values)=>updateInstitution(values),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"section\", {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(formik__WEBPACK_IMPORTED_MODULE_3__.Form, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                htmlFor: \"universityName\",\n                                children: \"University Name\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                lineNumber: 68,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(formik__WEBPACK_IMPORTED_MODULE_3__.Field, {\n                                name: \"universityName\",\n                                readOnly: editable\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                lineNumber: 69,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_utils_errorMsg__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                name: \"universityName\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                lineNumber: 70,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                htmlFor: \"adminFullName\",\n                                children: \"Admin Full Name\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                lineNumber: 71,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(formik__WEBPACK_IMPORTED_MODULE_3__.Field, {\n                                name: \"adminFullName\",\n                                readOnly: editable\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                lineNumber: 72,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_utils_errorMsg__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                name: \"adminFullName\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                lineNumber: 73,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                htmlFor: \"email\",\n                                children: \"Email\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                lineNumber: 74,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(formik__WEBPACK_IMPORTED_MODULE_3__.Field, {\n                                name: \"email\",\n                                type: \"email\",\n                                readOnly: editable\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                lineNumber: 75,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_utils_errorMsg__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                name: \"email\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                lineNumber: 76,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                htmlFor: \"crm\",\n                                children: \"CRM\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                lineNumber: 77,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(formik__WEBPACK_IMPORTED_MODULE_3__.Field, {\n                                name: \"crm\",\n                                readOnly: editable\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                lineNumber: 78,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_utils_errorMsg__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                name: \"crm\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                lineNumber: 79,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                htmlFor: \"adminContact\",\n                                children: \"Admin Contact\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                lineNumber: 80,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(formik__WEBPACK_IMPORTED_MODULE_3__.Field, {\n                                name: \"adminContact\",\n                                readOnly: editable\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                lineNumber: 81,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_utils_errorMsg__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                name: \"adminContact\"\n                            }, void 0, false, {\n                                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                lineNumber: 82,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex gap-2 items-center justify-end pt-4\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        type: \"button\",\n                                        className: \"bg-indigo-100 rounded px-4 py-2 flex items-center gap-2 hover:bg-indigo-50 text-indigo-900 font-semibold tracking-wide \".concat(editable ? \"\" : \" hidden\"),\n                                        onClick: ()=>setEditable(!editable),\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_assets_myIcons__WEBPACK_IMPORTED_MODULE_5__.EditIcon, {}, void 0, false, {\n                                                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                                lineNumber: 91,\n                                                columnNumber: 19\n                                            }, undefined),\n                                            \"Edit\"\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                        lineNumber: 84,\n                                        columnNumber: 17\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                        type: \"submit\",\n                                        hidden: editable,\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_assets_myIcons__WEBPACK_IMPORTED_MODULE_5__.SaveIcon, {}, void 0, false, {\n                                                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                                lineNumber: 95,\n                                                columnNumber: 19\n                                            }, undefined),\n                                            \"Save\"\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                        lineNumber: 94,\n                                        columnNumber: 17\n                                    }, undefined)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                                lineNumber: 83,\n                                columnNumber: 15\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                        lineNumber: 67,\n                        columnNumber: 13\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                    lineNumber: 66,\n                    columnNumber: 11\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n                lineNumber: 61,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\Projects\\\\Clone\\\\i20processor\\\\frontend\\\\src\\\\app\\\\(folder)\\\\admin\\\\institution\\\\institutionInfo.tsx\",\n        lineNumber: 56,\n        columnNumber: 5\n    }, undefined);\n};\n_s(InstitutionInfo, \"IZsB35M2DoAjLSON63Cx6397H0s=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_1__.useSearchParams\n    ];\n});\n_c = InstitutionInfo;\n/* harmony default export */ __webpack_exports__[\"default\"] = (InstitutionInfo);\nvar _c;\n$RefreshReg$(_c, \"InstitutionInfo\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvKGZvbGRlcikvYWRtaW4vaW5zdGl0dXRpb24vaW5zdGl0dXRpb25JbmZvLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDa0Q7QUFDTjtBQUNDO0FBQ007QUFDcEI7QUFDdUI7QUFDZDtBQUVpQjtBQUNTO0FBQ0Q7QUFFakUsTUFBTWMsa0JBQWtCOztJQUN0QixNQUFNLENBQUNDLGlCQUFpQkMsbUJBQW1CLEdBQ3pDZiwrQ0FBUUEsQ0FBbUJZLDBFQUFhQTtJQUMxQyxNQUFNSSxrQkFBa0JqQixnRUFBZUEsR0FBR2tCLEdBQUcsQ0FBQztJQUM5QyxNQUFNLENBQUNDLFNBQVNDLFdBQVcsR0FBR25CLCtDQUFRQSxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQ29CLFVBQVVDLFlBQVksR0FBR3JCLCtDQUFRQSxDQUFDO0lBRXpDQyxnREFBU0EsQ0FBQztRQUNSa0IsV0FBVztRQUNYRyxtQkFBbUJOO1FBQ25CSyxZQUFZO0lBQ2QsR0FBRztRQUFDTDtLQUFnQjtJQUVwQixNQUFNTyxvQkFBb0IsT0FBT0M7UUFDL0IsSUFBSTtZQUNGQyxRQUFRQyxHQUFHLENBQUMsb0JBQW9CRjtZQUNoQyxNQUFNRyxNQUFNLE1BQU1DLE1BQU0sc0JBQXNCWixpQkFBaUI7Z0JBQzdEYSxRQUFRO2dCQUNSQyxNQUFNcEIseUVBQVdBLENBQUNjO1lBQ3BCO1lBQ0EsSUFBSSxDQUFDRyxJQUFJSSxFQUFFLEVBQUUsTUFBTUo7WUFDbkIsTUFBTUssT0FBTyxNQUFNTCxJQUFJTSxJQUFJO1lBQzNCUixRQUFRQyxHQUFHLENBQUNNO1lBQ1p2QixrREFBS0EsQ0FBQ3lCLE9BQU8sQ0FBQ0YsS0FBS0csT0FBTztRQUM1QixFQUFFLE9BQU9DLEtBQVU7WUFDakIsTUFBTUosT0FBTyxNQUFNSSxJQUFJSCxJQUFJO1lBQzNCeEIsa0RBQUtBLENBQUM0QixLQUFLLENBQUNMLEtBQUtHLE9BQU87UUFDMUI7SUFDRjtJQUVBLE1BQU1iLHFCQUFxQixPQUFPTjtRQUNoQyxNQUFNWSxNQUFNLHNCQUFzQlosaUJBQy9Cc0IsSUFBSSxDQUFDLENBQUNYLE1BQVFBLElBQUlNLElBQUksSUFDdEJLLElBQUksQ0FBQyxDQUFDeEI7WUFDTEMsbUJBQW1CRCxnQkFBZ0JrQixJQUFJO1FBQ3pDLEdBQ0NNLElBQUksQ0FBQztZQUNKbkIsV0FBVztRQUNiO0lBQ0o7SUFFQSxxQkFDRSw4REFBQ29COzswQkFDQyw4REFBQ0M7Z0JBQUdDLFdBQVU7MEJBQW9EOzs7Ozs7WUFHakUsQ0FBQ3ZCLHlCQUNBLDhEQUFDZCwwQ0FBTUE7Z0JBQ0xzQyxlQUFlNUI7Z0JBQ2Y2QixrQkFBa0JoQywyRUFBaUJBO2dCQUNuQ2lDLFVBQVUsQ0FBQ3BCLFNBQVdELGtCQUFrQkM7MEJBRXhDLDRFQUFDZTs4QkFDQyw0RUFBQ3BDLHdDQUFJQTs7MENBQ0gsOERBQUMwQztnQ0FBTUMsU0FBUTswQ0FBaUI7Ozs7OzswQ0FDaEMsOERBQUM1Qyx5Q0FBS0E7Z0NBQUM2QyxNQUFLO2dDQUFpQkMsVUFBVTVCOzs7Ozs7MENBQ3ZDLDhEQUFDZixrRUFBUUE7Z0NBQUMwQyxNQUFLOzs7Ozs7MENBQ2YsOERBQUNGO2dDQUFNQyxTQUFROzBDQUFnQjs7Ozs7OzBDQUMvQiw4REFBQzVDLHlDQUFLQTtnQ0FBQzZDLE1BQUs7Z0NBQWdCQyxVQUFVNUI7Ozs7OzswQ0FDdEMsOERBQUNmLGtFQUFRQTtnQ0FBQzBDLE1BQUs7Ozs7OzswQ0FDZiw4REFBQ0Y7Z0NBQU1DLFNBQVE7MENBQVE7Ozs7OzswQ0FDdkIsOERBQUM1Qyx5Q0FBS0E7Z0NBQUM2QyxNQUFLO2dDQUFRRSxNQUFLO2dDQUFRRCxVQUFVNUI7Ozs7OzswQ0FDM0MsOERBQUNmLGtFQUFRQTtnQ0FBQzBDLE1BQUs7Ozs7OzswQ0FDZiw4REFBQ0Y7Z0NBQU1DLFNBQVE7MENBQU07Ozs7OzswQ0FDckIsOERBQUM1Qyx5Q0FBS0E7Z0NBQUM2QyxNQUFLO2dDQUFNQyxVQUFVNUI7Ozs7OzswQ0FDNUIsOERBQUNmLGtFQUFRQTtnQ0FBQzBDLE1BQUs7Ozs7OzswQ0FDZiw4REFBQ0Y7Z0NBQU1DLFNBQVE7MENBQWU7Ozs7OzswQ0FDOUIsOERBQUM1Qyx5Q0FBS0E7Z0NBQUM2QyxNQUFLO2dDQUFlQyxVQUFVNUI7Ozs7OzswQ0FDckMsOERBQUNmLGtFQUFRQTtnQ0FBQzBDLE1BQUs7Ozs7OzswQ0FDZiw4REFBQ0c7Z0NBQUlULFdBQVU7O2tEQUNiLDhEQUFDVTt3Q0FDQ0YsTUFBSzt3Q0FDTFIsV0FBVywwSEFFVixPQURDckIsV0FBVyxLQUFLO3dDQUVsQmdDLFNBQVMsSUFBTS9CLFlBQVksQ0FBQ0Q7OzBEQUU1Qiw4REFBQ2IscURBQVFBOzs7Ozs0Q0FBRzs7Ozs7OztrREFHZCw4REFBQzRDO3dDQUFPRixNQUFLO3dDQUFTSSxRQUFRakM7OzBEQUM1Qiw4REFBQ1oscURBQVFBOzs7Ozs0Q0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVOUI7R0EzRk1LOztRQUdvQmQsNERBQWVBOzs7S0FIbkNjO0FBNkZOLCtEQUFlQSxlQUFlQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvKGZvbGRlcikvYWRtaW4vaW5zdGl0dXRpb24vaW5zdGl0dXRpb25JbmZvLnRzeD8wMTFlIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xyXG5pbXBvcnQgeyB1c2VTZWFyY2hQYXJhbXMgfSBmcm9tIFwibmV4dC9uYXZpZ2F0aW9uXCI7XHJcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgRmllbGQsIEZvcm0sIEZvcm1payB9IGZyb20gXCJmb3JtaWtcIjtcclxuaW1wb3J0IEVycm9yTXNnIGZyb20gXCJAL2NvbXBvbmVudHMvdXRpbHMvZXJyb3JNc2dcIjtcclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEVkaXRJY29uLCBTYXZlSWNvbiB9IGZyb20gXCJAL2Fzc2V0cy9teUljb25zXCI7XHJcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSBcInJlYWN0LWhvdC10b2FzdFwiO1xyXG5pbXBvcnQgeyBpbnN0aXR1dGlvbk1vZGVsIH0gZnJvbSBcIkAvY29tcG9uZW50cy91dGlscy9tb2RlbHNcIjtcclxuaW1wb3J0IGdldEZvcm1EYXRhIGZyb20gXCJAL2NvbXBvbmVudHMvdXRpbHMvZ2V0Rm9ybURhdGFcIjtcclxuaW1wb3J0IHsgaW5zdGl0dXRpb25TY2hlbWEgfSBmcm9tIFwiQC9jb21wb25lbnRzL3V0aWxzL3ZhbFNjaGVtYXNcIjtcclxuaW1wb3J0IHsgaW5zdGl0dXRpb25JViB9IGZyb20gXCJAL2NvbXBvbmVudHMvdXRpbHMvaW5pdGlhbFZhbHVlc1wiO1xyXG5cclxuY29uc3QgSW5zdGl0dXRpb25JbmZvID0gKCkgPT4ge1xyXG4gIGNvbnN0IFtpbnN0aXR1dGlvbkluZm8sIHNldEluc3RpdHV0aW9uSW5mb10gPVxyXG4gICAgdXNlU3RhdGU8aW5zdGl0dXRpb25Nb2RlbD4oaW5zdGl0dXRpb25JVik7XHJcbiAgY29uc3QgaW5zdGl0dXRpb25OYW1lID0gdXNlU2VhcmNoUGFyYW1zKCkuZ2V0KFwiaW5zdGl0dXRpb25cIik7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3QgW2VkaXRhYmxlLCBzZXRFZGl0YWJsZV0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldExvYWRpbmcodHJ1ZSk7XHJcbiAgICBnZXRJbnN0aXR1dGlvbkluZm8oaW5zdGl0dXRpb25OYW1lKTtcclxuICAgIHNldEVkaXRhYmxlKHRydWUpO1xyXG4gIH0sIFtpbnN0aXR1dGlvbk5hbWVdKTtcclxuXHJcbiAgY29uc3QgdXBkYXRlSW5zdGl0dXRpb24gPSBhc3luYyAodmFsdWVzOiBpbnN0aXR1dGlvbk1vZGVsKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkluc3RpdHV0aW9uIEluZm9cIiwgdmFsdWVzKTtcclxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXCIvYXBpL2luc3RpdHV0aW9uL1wiICsgaW5zdGl0dXRpb25OYW1lLCB7XHJcbiAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICAgIGJvZHk6IGdldEZvcm1EYXRhKHZhbHVlcyksXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoIXJlcy5vaykgdGhyb3cgcmVzO1xyXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcclxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgIHRvYXN0LnN1Y2Nlc3MoZGF0YS5tZXNzYWdlKTtcclxuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBlcnIuanNvbigpO1xyXG4gICAgICB0b2FzdC5lcnJvcihkYXRhLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdldEluc3RpdHV0aW9uSW5mbyA9IGFzeW5jIChpbnN0aXR1dGlvbk5hbWU6IHN0cmluZyB8IG51bGwpID0+IHtcclxuICAgIGF3YWl0IGZldGNoKFwiL2FwaS9pbnN0aXR1dGlvbi9cIiArIGluc3RpdHV0aW9uTmFtZSlcclxuICAgICAgLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcclxuICAgICAgLnRoZW4oKGluc3RpdHV0aW9uSW5mbykgPT4ge1xyXG4gICAgICAgIHNldEluc3RpdHV0aW9uSW5mbyhpbnN0aXR1dGlvbkluZm8uZGF0YSk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uPlxyXG4gICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgZm9udC1ib2xkIHRleHQteGwgdGV4dC1zbGF0ZS03MDAgcHktMlwiPlxyXG4gICAgICAgIEluc3RpdHV0aW9uIEluZm9cclxuICAgICAgPC9oMT5cclxuICAgICAgeyFsb2FkaW5nICYmIChcclxuICAgICAgICA8Rm9ybWlrXHJcbiAgICAgICAgICBpbml0aWFsVmFsdWVzPXtpbnN0aXR1dGlvbkluZm99XHJcbiAgICAgICAgICB2YWxpZGF0aW9uU2NoZW1hPXtpbnN0aXR1dGlvblNjaGVtYX1cclxuICAgICAgICAgIG9uU3VibWl0PXsodmFsdWVzKSA9PiB1cGRhdGVJbnN0aXR1dGlvbih2YWx1ZXMpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxzZWN0aW9uPlxyXG4gICAgICAgICAgICA8Rm9ybT5cclxuICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInVuaXZlcnNpdHlOYW1lXCI+VW5pdmVyc2l0eSBOYW1lPC9sYWJlbD5cclxuICAgICAgICAgICAgICA8RmllbGQgbmFtZT1cInVuaXZlcnNpdHlOYW1lXCIgcmVhZE9ubHk9e2VkaXRhYmxlfSAvPlxyXG4gICAgICAgICAgICAgIDxFcnJvck1zZyBuYW1lPVwidW5pdmVyc2l0eU5hbWVcIiAvPlxyXG4gICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiYWRtaW5GdWxsTmFtZVwiPkFkbWluIEZ1bGwgTmFtZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgPEZpZWxkIG5hbWU9XCJhZG1pbkZ1bGxOYW1lXCIgcmVhZE9ubHk9e2VkaXRhYmxlfSAvPlxyXG4gICAgICAgICAgICAgIDxFcnJvck1zZyBuYW1lPVwiYWRtaW5GdWxsTmFtZVwiIC8+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJlbWFpbFwiPkVtYWlsPC9sYWJlbD5cclxuICAgICAgICAgICAgICA8RmllbGQgbmFtZT1cImVtYWlsXCIgdHlwZT1cImVtYWlsXCIgcmVhZE9ubHk9e2VkaXRhYmxlfSAvPlxyXG4gICAgICAgICAgICAgIDxFcnJvck1zZyBuYW1lPVwiZW1haWxcIiAvPlxyXG4gICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiY3JtXCI+Q1JNPC9sYWJlbD5cclxuICAgICAgICAgICAgICA8RmllbGQgbmFtZT1cImNybVwiIHJlYWRPbmx5PXtlZGl0YWJsZX0gLz5cclxuICAgICAgICAgICAgICA8RXJyb3JNc2cgbmFtZT1cImNybVwiIC8+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJhZG1pbkNvbnRhY3RcIj5BZG1pbiBDb250YWN0PC9sYWJlbD5cclxuICAgICAgICAgICAgICA8RmllbGQgbmFtZT1cImFkbWluQ29udGFjdFwiIHJlYWRPbmx5PXtlZGl0YWJsZX0gLz5cclxuICAgICAgICAgICAgICA8RXJyb3JNc2cgbmFtZT1cImFkbWluQ29udGFjdFwiIC8+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZCBwdC00XCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BiZy1pbmRpZ28tMTAwIHJvdW5kZWQgcHgtNCBweS0yIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGhvdmVyOmJnLWluZGlnby01MCB0ZXh0LWluZGlnby05MDAgZm9udC1zZW1pYm9sZCB0cmFja2luZy13aWRlICR7XHJcbiAgICAgICAgICAgICAgICAgICAgZWRpdGFibGUgPyBcIlwiIDogXCIgaGlkZGVuXCJcclxuICAgICAgICAgICAgICAgICAgfWB9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEVkaXRhYmxlKCFlZGl0YWJsZSl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxFZGl0SWNvbiAvPlxyXG4gICAgICAgICAgICAgICAgICBFZGl0XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGhpZGRlbj17ZWRpdGFibGV9PlxyXG4gICAgICAgICAgICAgICAgICA8U2F2ZUljb24gLz5cclxuICAgICAgICAgICAgICAgICAgU2F2ZVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvRm9ybT5cclxuICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICA8L0Zvcm1paz5cclxuICAgICAgKX1cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5zdGl0dXRpb25JbmZvO1xyXG4iXSwibmFtZXMiOlsidXNlU2VhcmNoUGFyYW1zIiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJGaWVsZCIsIkZvcm0iLCJGb3JtaWsiLCJFcnJvck1zZyIsIlJlYWN0IiwiRWRpdEljb24iLCJTYXZlSWNvbiIsInRvYXN0IiwiZ2V0Rm9ybURhdGEiLCJpbnN0aXR1dGlvblNjaGVtYSIsImluc3RpdHV0aW9uSVYiLCJJbnN0aXR1dGlvbkluZm8iLCJpbnN0aXR1dGlvbkluZm8iLCJzZXRJbnN0aXR1dGlvbkluZm8iLCJpbnN0aXR1dGlvbk5hbWUiLCJnZXQiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImVkaXRhYmxlIiwic2V0RWRpdGFibGUiLCJnZXRJbnN0aXR1dGlvbkluZm8iLCJ1cGRhdGVJbnN0aXR1dGlvbiIsInZhbHVlcyIsImNvbnNvbGUiLCJsb2ciLCJyZXMiLCJmZXRjaCIsIm1ldGhvZCIsImJvZHkiLCJvayIsImRhdGEiLCJqc29uIiwic3VjY2VzcyIsIm1lc3NhZ2UiLCJlcnIiLCJlcnJvciIsInRoZW4iLCJzZWN0aW9uIiwiaDEiLCJjbGFzc05hbWUiLCJpbml0aWFsVmFsdWVzIiwidmFsaWRhdGlvblNjaGVtYSIsIm9uU3VibWl0IiwibGFiZWwiLCJodG1sRm9yIiwibmFtZSIsInJlYWRPbmx5IiwidHlwZSIsImRpdiIsImJ1dHRvbiIsIm9uQ2xpY2siLCJoaWRkZW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/(folder)/admin/institution/institutionInfo.tsx\n"));

/***/ })

});