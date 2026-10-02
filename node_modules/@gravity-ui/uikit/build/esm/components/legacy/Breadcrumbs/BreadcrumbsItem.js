'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { Link } from "../../Link/index.js";
import { block } from "../../utils/cn.js";
import { BreadcrumbsButton } from "./BreadcrumbsButton.js";
const b = block('breadcrumbs-legacy');
function Item({ item, isCurrent, isPrevCurrent, renderItemContent, renderItem, }) {
    const children = renderItemContent
        ? renderItemContent(item, isCurrent, isPrevCurrent)
        : item.text;
    if (renderItem) {
        return renderItem({ item, children, isCurrent, isPrevCurrent });
    }
    const itemTitle = item.title || item.text;
    if (isPrevCurrent || !isCurrent) {
        if (item.href !== undefined) {
            return (_jsx(Link, { view: "secondary", href: item.href, title: itemTitle, onClick: item.action, className: b('item', { 'prev-current': isPrevCurrent }), children: children }, item.text));
        }
        return (_jsx(BreadcrumbsButton, { title: itemTitle, onClick: item.action, children: children }, item.text));
    }
    return (_jsx("div", { title: itemTitle, className: b('item', { current: true }), children: children }));
}
export const BreadcrumbsItem = React.memo(Item);
BreadcrumbsItem.displayName = 'Breadcrumbs.Item';
//# sourceMappingURL=BreadcrumbsItem.js.map
