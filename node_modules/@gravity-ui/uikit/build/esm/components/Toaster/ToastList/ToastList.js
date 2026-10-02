'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { block } from "../../utils/cn.js";
import { getCSSTransitionClassNames } from "../../utils/transition.js";
import { Toast } from "../Toast/Toast.js";
import "./ToastAnimation.css";
import "./ToastList.css";
const desktopTransitionClassNames = getCSSTransitionClassNames(block('toast-animation-desktop'));
const mobileTransitionClassNames = getCSSTransitionClassNames(block('toast-animation-mobile'));
export function ToastList(props) {
    const { toasts, mobile, removeCallback } = props;
    return (_jsx(TransitionGroup, { component: null, children: toasts.map((toast) => (_jsx(CSSTransition, { 
            /*
             * TODO: Remove casting in React 19 (https://github.com/gravity-ui/uikit/issues/2537)
             */
            nodeRef: toast.ref, classNames: mobile ? mobileTransitionClassNames : desktopTransitionClassNames, addEndListener: (done) => toast.ref?.current?.addEventListener('animationend', done), onEnter: () => updateToastHeightCssProperty(toast), onExit: () => updateToastHeightCssProperty(toast), children: _jsx(Toast, { ...toast, 
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
