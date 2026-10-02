'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Label } from "../../Label/index.js";
import { block } from "../../utils/cn.js";
import { TabsContext } from "./TabsContext.js";
const b = block('tabs-legacy');
export function TabsItem({ id, className, title, meta, hint, icon, counter, label, active, disabled, hasOverflow, extraProps, onClick, qa, }) {
    const { activeTabId } = React.useContext(TabsContext);
    const isActive = typeof active === 'boolean' ? active : activeTabId === id;
    const handleClick = () => {
        onClick(id);
    };
    const handleKeyDown = (event) => {
        if (event.key === ' ') {
            onClick(id);
        }
    };
    const htmlTitle = React.useMemo(() => {
        if (hint !== undefined) {
            return hint;
        }
        if (typeof title === 'string') {
            return title;
        }
        return undefined;
    }, [hint, title]);
    return (_jsxs("div", { ...extraProps, role: "tab", "aria-selected": isActive, "aria-disabled": disabled === true, tabIndex: disabled ? -1 : 0, className: b('item', { active: isActive, disabled, overflow: Boolean(hasOverflow) }, className), title: htmlTitle, onClick: handleClick, onKeyDown: handleKeyDown, "data-qa": qa, children: [_jsxs("div", { className: b('item-content'), children: [icon && _jsx("div", { className: b('item-icon'), children: icon }), _jsx("div", { className: b('item-title'), children: title || id }), counter !== undefined && _jsx("div", { className: b('item-counter'), children: counter }), label && (_jsx(Label, { className: b('item-label'), theme: label.theme, children: label.content }))] }), meta && _jsx("div", { className: b('item-meta'), children: meta })] }));
}
TabsItem.displayName = 'Tabs.Item';
//# sourceMappingURL=TabsItem.js.map
