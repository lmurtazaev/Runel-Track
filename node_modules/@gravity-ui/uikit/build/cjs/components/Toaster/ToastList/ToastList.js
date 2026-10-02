'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToastList = ToastList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_transition_group_1 = require("react-transition-group");
const cn_1 = require("../../utils/cn.js");
const transition_1 = require("../../utils/transition.js");
const Toast_1 = require("../Toast/Toast.js");
require("./ToastAnimation.css");
require("./ToastList.css");
const desktopTransitionClassNames = (0, transition_1.getCSSTransitionClassNames)((0, cn_1.block)('toast-animation-desktop'));
const mobileTransitionClassNames = (0, transition_1.getCSSTransitionClassNames)((0, cn_1.block)('toast-animation-mobile'));
function ToastList(props) {
    const { toasts, mobile, removeCallback } = props;
    return ((0, jsx_runtime_1.jsx)(react_transition_group_1.TransitionGroup, { component: null, children: toasts.map((toast) => ((0, jsx_runtime_1.jsx)(react_transition_group_1.CSSTransition, { 
            /*
             * TODO: Remove casting in React 19 (https://github.com/gravity-ui/uikit/issues/2537)
             */
            nodeRef: toast.ref, classNames: mobile ? mobileTransitionClassNames : desktopTransitionClassNames, addEndListener: (done) => toast.ref?.current?.addEventListener('animationend', done), onEnter: () => updateToastHeightCssProperty(toast), onExit: () => updateToastHeightCssProperty(toast), children: (0, jsx_runtime_1.jsx)(Toast_1.Toast, { ...toast, 
                /*
                 * TODO: Remove casting in React 19 (https://github.com/gravity-ui/uikit/issues/2537)
                 */
                ref: toast.ref, mobile: mobile, removeCallback: removeCallback }) }, `${toast.name}_${toast.addedAt}`))) }));
}
function updateToastHeightCssProperty(toast) {
    if (toast.ref?.current) {
        toast.ref.current.style.setProperty('--_--item-height', `${toast.ref.current.offsetHeight}px`);
    }
}
//# sourceMappingURL=ToastList.js.map
