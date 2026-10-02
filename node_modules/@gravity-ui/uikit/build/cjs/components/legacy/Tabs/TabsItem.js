'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabsItem = TabsItem;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const Label_1 = require("../../Label/index.js");
const cn_1 = require("../../utils/cn.js");
const TabsContext_1 = require("./TabsContext.js");
const b = (0, cn_1.block)('tabs-legacy');
function TabsItem({ id, className, title, meta, hint, icon, counter, label, active, disabled, hasOverflow, extraProps, onClick, qa, }) {
    const { activeTabId } = React.useContext(TabsContext_1.TabsContext);
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
    return ((0, jsx_runtime_1.jsxs)("div", { ...extraProps, role: "tab", "aria-selected": isActive, "aria-disabled": disabled === true, tabIndex: disabled ? -1 : 0, className: b('item', { active: isActive, disabled, overflow: Boolean(hasOverflow) }, className), title: htmlTitle, onClick: handleClick, onKeyDown: handleKeyDown, "data-qa": qa, children: [(0, jsx_runtime_1.jsxs)("div", { className: b('item-content'), children: [icon && (0, jsx_runtime_1.jsx)("div", { className: b('item-icon'), children: icon }), (0, jsx_runtime_1.jsx)("div", { className: b('item-title'), children: title || id }), counter !== undefined && (0, jsx_runtime_1.jsx)("div", { className: b('item-counter'), children: counter }), label && ((0, jsx_runtime_1.jsx)(Label_1.Label, { className: b('item-label'), theme: label.theme, children: label.content }))] }), meta && (0, jsx_runtime_1.jsx)("div", { className: b('item-meta'), children: meta })] }));
}
TabsItem.displayName = 'Tabs.Item';
//# sourceMappingURL=TabsItem.js.map
