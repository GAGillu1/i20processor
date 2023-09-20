exports.id = 95;
exports.ids = [95];
exports.modules = {

/***/ 51989:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bq: () => (/* binding */ PreProcessorCardLg),
/* harmony export */   I0: () => (/* binding */ UsersCardLg),
/* harmony export */   f$: () => (/* binding */ InstanceCardLg),
/* harmony export */   vy: () => (/* binding */ PostProcessingCardLg)
/* harmony export */ });
/* unused harmony exports Card, CardLg, AddUserCard, I20Card, AdminCard, DsoCard, UsersCard, InstanceCard, AddInstanceCard, PreProcessingCard, PostProcessingCard, LogsCard, ChangePasswordCard */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_myIcons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(84071);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(25124);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);



// -------------------------------
// CARD
const Card = ({ ...props })=>{
    return /*#__PURE__*/ _jsx(Link, {
        href: props.href,
        children: /*#__PURE__*/ _jsxs("div", {
            className: "bg-white rounded-lg w-40 h-40 hover:scale-105 duration-300 transform group",
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: "bg-indigo-50 rounded-t-lg h-28 w-full items-center flex",
                    children: props.children
                }),
                /*#__PURE__*/ _jsx("div", {
                    className: "flex items-center justify-center h-12",
                    children: /*#__PURE__*/ _jsx("h3", {
                        className: "font-semibold text-lg ",
                        children: props.title
                    })
                })
            ]
        })
    });
};
// -------------------------------
// LARGE CARD
const CardLg = ({ ...props })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
        href: props.link,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
            className: "grid grid-cols-6 rounded-lg hover:scale-105 duration-300",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "bg-indigo-50 rounded-l-lg flex items-center justify-center",
                    children: props.children
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "col-span-5 bg-white rounded-r-lg p-2",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                            className: "text-indigo-900",
                            children: [
                                props.title,
                                " "
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "pt-2",
                            children: props.description
                        })
                    ]
                })
            ]
        })
    });
};
// -------------------------------
// ADD USER CARD
const AddUserCard = ()=>{
    return /*#__PURE__*/ _jsx(Card, {
        href: "/admin/users",
        title: "Add User",
        children: /*#__PURE__*/ _jsx(AddUserIcon, {
            className: "w-16 h-16 text-indigo-900 mx-auto"
        })
    });
};
// -------------------------------
// I20 CARD
const I20Card = ()=>{
    return /*#__PURE__*/ _jsx(Card, {
        href: "/i20",
        title: "I20",
        children: /*#__PURE__*/ _jsx(I20Icon, {
            className: "w-16 h-16 text-indigo-900 mx-auto"
        })
    });
};
// -------------------------------
// ADMIN CARD
const AdminCard = ()=>{
    return /*#__PURE__*/ _jsx(Card, {
        href: "/admin",
        title: "Admin",
        children: /*#__PURE__*/ _jsx(AdminIcon, {
            className: "w-16 h-16 text-indigo-900 mx-auto"
        })
    });
};
// -------------------------------
// DSO CARD
const DsoCard = ()=>{
    return /*#__PURE__*/ _jsx(Card, {
        href: "/dso",
        title: "DSO",
        children: /*#__PURE__*/ _jsx(DsoIcon, {
            className: "w-16 h-16 text-indigo-900 mx-auto"
        })
    });
};
// -------------------------------
// USERS CARD
const UsersCard = ()=>{
    return /*#__PURE__*/ _jsx(Card, {
        href: "/admin/users",
        title: "Users",
        children: /*#__PURE__*/ _jsx(UsersIcon, {
            className: "w-16 h-16 text-indigo-900 mx-auto"
        })
    });
};
// -------------------------------
// INSTANCE CARD
const InstanceCard = ()=>{
    return /*#__PURE__*/ _jsx(Card, {
        href: "/admin/instance",
        title: "Instance",
        children: /*#__PURE__*/ _jsx(InstanceIcon, {
            className: "w-16 h-16 text-indigo-900 mx-auto"
        })
    });
};
// -------------------------------
// ADD INSTANCE CARD
const AddInstanceCard = ()=>{
    return /*#__PURE__*/ _jsx(Card, {
        href: "/admin/instance?addInstance=true",
        title: "Add Instance",
        children: /*#__PURE__*/ _jsx(AddInstanceIcon, {
            className: "w-16 h-16 text-indigo-900 mx-auto"
        })
    });
};
// -------------------------------
// PRE-PROCESSOR CARD
const PreProcessingCard = ()=>{
    return /*#__PURE__*/ _jsx(Card, {
        href: "/i20/pre-processor",
        title: "Pre-processor",
        children: /*#__PURE__*/ _jsx(PreProcessingIcon, {
            className: "w-16 h-16 text-indigo-900 mx-auto"
        })
    });
};
// -------------------------------
// POST-PROCESSOR CARD
const PostProcessingCard = ()=>{
    return /*#__PURE__*/ _jsx(Card, {
        href: "/i20/post-processor",
        title: "Post-processor",
        children: /*#__PURE__*/ _jsx(PostProcessingIcon, {
            className: "w-16 h-16 text-indigo-900 mx-auto"
        })
    });
};
// -------------------------------
// LOGS CARD
const LogsCard = ()=>{
    return /*#__PURE__*/ _jsx(Card, {
        href: "/logs",
        title: "Logs",
        children: /*#__PURE__*/ _jsx(LogsIcon, {
            className: "w-16 h-16 text-indigo-900 mx-auto"
        })
    });
};
// -------------------------------
// CHANGE PASSWORD CARD
const ChangePasswordCard = ()=>{
    return /*#__PURE__*/ _jsx(Card, {
        href: "/profile",
        title: "Change Password",
        children: /*#__PURE__*/ _jsx(ChangePwdIcon, {
            className: "w-16 h-16 text-indigo-900 mx-auto"
        })
    });
};
// -------------------------------
// LARGE CARDS
// -------------------------------
// USERS CARD
const UsersCardLg = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CardLg, {
        link: "/admin/users",
        title: "Users",
        description: lorem,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_myIcons__WEBPACK_IMPORTED_MODULE_1__/* .UsersIcon */ .oy, {
            className: "w-16 h-16 text-indigo-900 mx-auto"
        })
    });
};
// -------------------------------
// INSTANCE CARD
const InstanceCardLg = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CardLg, {
        link: "/admin/instance",
        title: "Instance",
        description: lorem,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_myIcons__WEBPACK_IMPORTED_MODULE_1__/* .InstanceIcon */ .A5, {
            className: "w-16 h-16 text-indigo-900 mx-auto"
        })
    });
};
const lorem = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta excepturi quidem quisquam fugiat! Animi praesentium ut neque expedita explicabo nobis hic quisquam velit. Cupiditate, quasi ullam minus numquam doloribus porro?";
// -------------------------------
// PRE-PROCESSOR CARD
const PreProcessorCardLg = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CardLg, {
        link: "/i20/pre-processor",
        title: "Pre-processor",
        description: lorem,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_myIcons__WEBPACK_IMPORTED_MODULE_1__/* .PreProcessingIcon */ .zz, {
            className: "w-16 h-16 text-indigo-900 mx-auto"
        })
    });
};
// -------------------------------
// POST-PROCESSOR CARD
const PostProcessingCardLg = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CardLg, {
        link: "/i20/post-processor",
        title: "Post-processor",
        description: lorem,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_assets_myIcons__WEBPACK_IMPORTED_MODULE_1__/* .PostProcessingIcon */ .oi, {
            className: "w-16 h-16 text-indigo-900 mx-auto"
        })
    });
};


/***/ }),

/***/ 11440:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(50954)


/***/ }),

/***/ 57114:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(90696)


/***/ })

};
;