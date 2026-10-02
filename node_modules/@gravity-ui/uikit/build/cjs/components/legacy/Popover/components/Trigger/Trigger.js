'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trigger = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const hooks_1 = require("../../../../../hooks/index.js");
const Trigger = ({ open, openOnHover, disabled, className, openTooltip, closeTooltip, closedManually, onClick, children, }) => {
    const handleClick = async (event) => {
        // Ignores click that should close tooltip in case of {openOnHover: true}
        // to prevent situation when user could close tooltip accidentally
        const shouldPreventClosingByClick = open && openOnHover;
        if (disabled || shouldPreventClosingByClick) {
            return;
        }
        const shouldToggleTooltip = !onClick || (await onClick(event));
        if (!shouldToggleTooltip) {
            return;
        }
        const toggleTooltip = () => {
            const nextOpen = !open;
            if (nextOpen) {
                openTooltip();
                closedManually.current = false;
            }
            else {
                closeTooltip();
                closedManually.current = true;
            }
        };
        toggleTooltip();
    };
    const { onKeyDown } = (0, hooks_1.useActionHandlers)(handleClick);
    return typeof children === 'function' ? ((0, jsx_runtime_1.jsx)(React.Fragment, { children: children({ onClick: handleClick, onKeyDown, open }) })) : (
    // The event handler should only be used to capture bubbled events
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    (0, jsx_runtime_1.jsx)("div", { className: className, onClick: handleClick, onKeyDown: onClick ? onKeyDown : undefined, children: children }));
};
exports.Trigger = Trigger;
//# sourceMappingURL=Trigger.js.map
