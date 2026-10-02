'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItem = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const hooks_1 = require("../../hooks/index.js");
const cn_1 = require("../utils/cn.js");
const event_broker_1 = require("../utils/event-broker/index.js");
const b = (0, cn_1.block)('menu');
exports.MenuItem = React.forwardRef(function MenuItem({ iconStart, iconEnd, title, disabled, active, selected, href, target, rel, onClick, style, className, contentClassName, theme, extraProps, children, qa, }, ref) {
    const { onKeyDown } = (0, hooks_1.useActionHandlers)(onClick);
    const handleClickCapture = React.useCallback((event) => {
        event_broker_1.eventBroker.publish({
            componentId: 'MenuItem',
            eventId: 'click',
            domEvent: event,
        });
    }, []);
    const defaultProps = {
        role: 'menuitem',
        onKeyDown: onClick && !disabled ? onKeyDown : undefined,
    };
    const commonProps = {
        title,
        onClick: disabled ? undefined : onClick,
        onClickCapture: disabled ? undefined : handleClickCapture,
        style,
        tabIndex: disabled ? -1 : 0,
        className: b('item', { disabled, active, selected, theme, interactive: Boolean(onClick) || Boolean(href) }, className),
        'data-qa': qa,
    };
    const content = [
        iconStart && ((0, jsx_runtime_1.jsx)("div", { className: b('item-icon'), children: iconStart }, "icon-start")),
        (0, jsx_runtime_1.jsx)("div", { className: b('item-content', contentClassName), children: children }, "content"),
        iconEnd && ((0, jsx_runtime_1.jsx)("div", { className: b('item-icon-end'), children: iconEnd }, 'icon-end')),
    ];
    let item;
    if (href) {
        item = ((0, jsx_runtime_1.jsx)("a", { ...defaultProps, ...extraProps, ...commonProps, href: href, target: target, rel: rel, children: content }));
    }
    else {
        item = ((0, jsx_runtime_1.jsx)("div", { ...defaultProps, ...extraProps, ...commonProps, children: content }));
    }
    return ((0, jsx_runtime_1.jsx)("li", { ref: ref, className: b('list-item'), role: "none", children: item }));
});
//# sourceMappingURL=MenuItem.js.map
