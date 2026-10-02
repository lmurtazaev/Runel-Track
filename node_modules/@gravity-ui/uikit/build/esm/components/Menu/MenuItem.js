'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { useActionHandlers } from "../../hooks/index.js";
import { block } from "../utils/cn.js";
import { eventBroker } from "../utils/event-broker/index.js";
const b = block('menu');
export const MenuItem = React.forwardRef(function MenuItem({ iconStart, iconEnd, title, disabled, active, selected, href, target, rel, onClick, style, className, contentClassName, theme, extraProps, children, qa, }, ref) {
    const { onKeyDown } = useActionHandlers(onClick);
    const handleClickCapture = React.useCallback((event) => {
        eventBroker.publish({
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
        iconStart && (_jsx("div", { className: b('item-icon'), children: iconStart }, "icon-start")),
        _jsx("div", { className: b('item-content', contentClassName), children: children }, "content"),
        iconEnd && (_jsx("div", { className: b('item-icon-end'), children: iconEnd }, 'icon-end')),
    ];
    let item;
    if (href) {
        item = (_jsx("a", { ...defaultProps, ...extraProps, ...commonProps, href: href, target: target, rel: rel, children: content }));
    }
    else {
        item = (_jsx("div", { ...defaultProps, ...extraProps, ...commonProps, children: content }));
    }
    return (_jsx("li", { ref: ref, className: b('list-item'), role: "none", children: item }));
});
//# sourceMappingURL=MenuItem.js.map
