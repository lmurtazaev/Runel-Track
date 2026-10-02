'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadcrumbsItem = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const Link_1 = require("../../Link/index.js");
const cn_1 = require("../../utils/cn.js");
const BreadcrumbsButton_1 = require("./BreadcrumbsButton.js");
const b = (0, cn_1.block)('breadcrumbs-legacy');
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
            return ((0, jsx_runtime_1.jsx)(Link_1.Link, { view: "secondary", href: item.href, title: itemTitle, onClick: item.action, className: b('item', { 'prev-current': isPrevCurrent }), children: children }, item.text));
        }
        return ((0, jsx_runtime_1.jsx)(BreadcrumbsButton_1.BreadcrumbsButton, { title: itemTitle, onClick: item.action, children: children }, item.text));
    }
    return ((0, jsx_runtime_1.jsx)("div", { title: itemTitle, className: b('item', { current: true }), children: children }));
}
exports.BreadcrumbsItem = React.memo(Item);
exports.BreadcrumbsItem.displayName = 'Breadcrumbs.Item';
//# sourceMappingURL=BreadcrumbsItem.js.map
