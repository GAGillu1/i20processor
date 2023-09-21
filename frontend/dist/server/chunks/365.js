"use strict";
exports.id = 365;
exports.ids = [365];
exports.modules = {

/***/ 33365:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ Response),
/* harmony export */   k: () => (/* binding */ ProgressBar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _myContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9629);
/* harmony import */ var react_hot_toast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10345);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(57114);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11440);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);
// Upload > Split > Sign > Zip > Post to slate > Download






const progress = [
    "w-[5%]",
    "w-1/6",
    "w-2/6",
    "w-3/6",
    "w-4/6",
    "w-5/6",
    "w-full"
];
const bannerArr = [
    "Add Sign:",
    "Split Failure:",
    "Total Files:",
    "Total Pages:",
    "Total Signatures:",
    "Index Error:",
    "Index Size:",
    "Index Msg:",
    "Missing Records:",
    "Sign Message:",
    "Split Message",
    "Zip Message:"
];
const Results = ()=>{
    const [results, setResults] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const path = (0,next_navigation__WEBPACK_IMPORTED_MODULE_4__.usePathname)();
    const api = "/api" + path;
    const getResults = async ()=>{
        try {
            const res = await fetch(api);
            if (!res.ok) throw res;
            const data = await res.json();
            setResults(data.data);
        } catch (err) {
            const data = await err.json();
            react_hot_toast__WEBPACK_IMPORTED_MODULE_3__["default"].error(data.message);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        getResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return results ? bannerArr.map((item, i)=>{
        return results[i] ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    className: "font-semibold",
                    children: item
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    className: "col-span-2",
                    children: results[i]
                })
            ]
        }, i) : "";
    }) : "";
};
const postArr = [
    "Uploading",
    "Splitting",
    "Signing",
    "Zipping",
    "Posting"
];
const preArr = [
    "Loading",
    "Uploading",
    "Validating VPN Credentials",
    "VPN login Success",
    "ISSM login Validation",
    "ISSM Login Success"
];
// const Steps = () => {
//   return stepArr.map((step, i) => {
//     return (
//       <div
//         className=" text-center flex flex-col items-center justify-center text-indigo-900 font-semibold gap-2"
//         key={i}
//       >
//         <div className="w-10 h-10 rounded-full bg-indigo-300 p-2">{i + 1}</div>
//         <p>{step}</p>
//       </div>
//     );
//   });
// };
const ProgressBar = ()=>{
    const path = (0,next_navigation__WEBPACK_IMPORTED_MODULE_4__.usePathname)();
    return path === "/i20/pre-processor" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(PreProcessorProgressBar, {}) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(PostProcessorProgressBar, {});
};
const PreProcessorProgressBar = ()=>{
    const data = (0,_myContext__WEBPACK_IMPORTED_MODULE_2__.useMyContext)();
    const status = data.preProcessStatus;
    const maxCount = data.preProcessMaxCount + 5;
    const progressText = "Processed " + (status - 5) + "/" + (maxCount - 5);
    const p = Math.floor(status / maxCount * 100);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
        className: "section",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "w-[90%] mx-auto",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                    className: "animate-pulse text-center",
                    children: `${status < 6 ? preArr[status] : progressText}`
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "mt-4 h-2 w-full rounded-full bg-slate-200",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: `h-2 animate-pulse bg-indigo-400 rounded-full `,
                        style: {
                            width: `${p}%`
                        }
                    })
                })
            ]
        })
    });
};
const PostProcessorProgressBar = ()=>{
    const data = (0,_myContext__WEBPACK_IMPORTED_MODULE_2__.useMyContext)();
    const status = Math.abs(data.postProcessStatus);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
        className: "section",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "w-[90%] mx-auto",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                    className: "animate-pulse text-center",
                    children: `${postArr[status]}`
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "mt-4 h-2 w-full rounded-full bg-slate-200",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: `h-2 animate-pulse bg-indigo-400 rounded-full ` + `${progress[status]}`
                    })
                })
            ]
        })
    });
};
const Response = ()=>{
    const path = (0,next_navigation__WEBPACK_IMPORTED_MODULE_4__.usePathname)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
        className: "w-[90%] mx-auto",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                className: "formHeader",
                children: "Results"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "grid grid-cols-3 gap-y-2",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Results, {})
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "flex justify-center items-center mt-4",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
                    href: path,
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        children: "Got it!"
                    })
                })
            })
        ]
    });
};


/***/ })

};
;