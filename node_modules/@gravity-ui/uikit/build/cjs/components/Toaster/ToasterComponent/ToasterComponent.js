'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToasterComponent = ToasterComponent;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const Portal_1 = require("../../Portal/index.js");
const mobile_1 = require("../../mobile/index.js");
const cn_1 = require("../../utils/cn.js");
const ToastsContext_1 = require("../Provider/ToastsContext.js");
const ToastList_1 = require("../ToastList/ToastList.js");
const useToaster_1 = require("../hooks/useToaster.js");
const b = (0, cn_1.block)('toaster');
function ToasterComponent({ className, mobile, hasPortal = true }) {
    const defaultMobile = (0, mobile_1.useMobile)();
    const { remove } = (0, useToaster_1.useToaster)();
    const list = React.useContext(ToastsContext_1.ToastsContext);
    const toaster = ((0, jsx_runtime_1.jsx)(ToastList_1.ToastList, { toasts: list, removeCallback: remove, mobile: mobile ?? defaultMobile }));
    if (!hasPortal) {
        return toaster;
    }
    return ((0, jsx_runtime_1.jsx)(Portal_1.Portal, { children: (0, jsx_runtime_1.jsx)("div", { className: b({ mobile: mobile ?? defaultMobile }, className), "aria-live": "assertive", children: toaster }) }));
}
ToasterComponent.displayName = 'ToasterComponent';
//# sourceMappingURL=ToasterComponent.js.map
