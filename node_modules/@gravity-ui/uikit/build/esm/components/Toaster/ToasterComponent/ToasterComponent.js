'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { Portal } from "../../Portal/index.js";
import { useMobile } from "../../mobile/index.js";
import { block } from "../../utils/cn.js";
import { ToastsContext } from "../Provider/ToastsContext.js";
import { ToastList } from "../ToastList/ToastList.js";
import { useToaster } from "../hooks/useToaster.js";
const b = block('toaster');
export function ToasterComponent({ className, mobile, hasPortal = true }) {
    const defaultMobile = useMobile();
    const { remove } = useToaster();
    const list = React.useContext(ToastsContext);
    const toaster = (_jsx(ToastList, { toasts: list, removeCallback: remove, mobile: mobile ?? defaultMobile }));
    if (!hasPortal) {
        return toaster;
    }
    return (_jsx(Portal, { children: _jsx("div", { className: b({ mobile: mobile ?? defaultMobile }, className), "aria-live": "assertive", children: toaster }) }));
}
ToasterComponent.displayName = 'ToasterComponent';
//# sourceMappingURL=ToasterComponent.js.map
