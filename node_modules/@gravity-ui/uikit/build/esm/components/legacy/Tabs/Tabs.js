'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { block } from "../../utils/cn.js";
import { filterDOMProps } from "../../utils/filterDOMProps.js";
import { TabsContext } from "./TabsContext.js";
import { TabsItem } from "./TabsItem.js";
import "./Tabs.css";
const b = block('tabs-legacy');
export var TabsDirection;
(function (TabsDirection) {
    TabsDirection["Horizontal"] = "horizontal";
    TabsDirection["Vertical"] = "vertical";
})(TabsDirection || (TabsDirection = {}));
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
            const tabItemNode = _jsx(TabsItem, { ...item, onClick: handleTabClick }, item.id);
            if (wrapTo) {
                return wrapTo(item, tabItemNode, index);
            }
            return tabItemNode;
        });
    }, [items, onSelectTab, wrapTo]);
    return (_jsx("div", { ...filterDOMProps(restProps, { labelable: true }), role: "tablist", className: b({ direction, size }, className), "data-qa": qa, ref: ref, children: _jsx(TabsContext.Provider, { value: tabsContextValue, children: children || tabs }) }));
});
TabsComponent.displayName = 'Tabs';
/**
 * @deprecated
 */
export const Tabs = Object.assign(TabsComponent, { Item: TabsItem });
//# sourceMappingURL=Tabs.js.map
