'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = exports.TabsDirection = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const cn_1 = require("../../utils/cn.js");
const filterDOMProps_1 = require("../../utils/filterDOMProps.js");
const TabsContext_1 = require("./TabsContext.js");
const TabsItem_1 = require("./TabsItem.js");
require("./Tabs.css");
const b = (0, cn_1.block)('tabs-legacy');
var TabsDirection;
(function (TabsDirection) {
    TabsDirection["Horizontal"] = "horizontal";
    TabsDirection["Vertical"] = "vertical";
})(TabsDirection || (exports.TabsDirection = TabsDirection = {}));
const getActiveTabId = (activeTab, allowNotSelected, items) => {
    if (activeTab) {
        return activeTab;
    }
    if (allowNotSelected || items?.length === 0) {
        return undefined;
    }
    return items?.[0]?.id;
};
const emptyTabsList = [];
const TabsComponent = React.forwardRef(({ direction = TabsDirection.Horizontal, size = 'm', activeTab, allowNotSelected = false, items = emptyTabsList, children, className, onSelectTab, wrapTo, qa, ...restProps }, ref) => {
    const activeTabId = getActiveTabId(activeTab, allowNotSelected, items);
    const tabsContextValue = React.useMemo(() => ({ activeTabId }), [activeTabId]);
    const tabs = React.useMemo(() => {
        const handleTabClick = (tabId) => {
            if (onSelectTab) {
                onSelectTab(tabId);
            }
        };
        return items.map((item, index) => {
            const tabItemNode = (0, jsx_runtime_1.jsx)(TabsItem_1.TabsItem, { ...item, onClick: handleTabClick }, item.id);
            if (wrapTo) {
                return wrapTo(item, tabItemNode, index);
            }
            return tabItemNode;
        });
    }, [items, onSelectTab, wrapTo]);
    return ((0, jsx_runtime_1.jsx)("div", { ...(0, filterDOMProps_1.filterDOMProps)(restProps, { labelable: true }), role: "tablist", className: b({ direction, size }, className), "data-qa": qa, ref: ref, children: (0, jsx_runtime_1.jsx)(TabsContext_1.TabsContext.Provider, { value: tabsContextValue, children: children || tabs }) }));
});
TabsComponent.displayName = 'Tabs';
/**
 * @deprecated
 */
exports.Tabs = Object.assign(TabsComponent, { Item: TabsItem_1.TabsItem });
//# sourceMappingURL=Tabs.js.map
