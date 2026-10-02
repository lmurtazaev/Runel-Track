"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadcrumbsSeparator = BreadcrumbsSeparator;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../../utils/cn.js");
const b = (0, cn_1.block)('breadcrumbs-legacy');
function BreadcrumbsSeparator({ renderItemDivider }) {
    return ((0, jsx_runtime_1.jsx)("div", { "aria-hidden": true, className: b('divider'), children: renderItemDivider ? renderItemDivider() : '/' }));
}
BreadcrumbsSeparator.displayName = 'Breadcrumbs.Separator';
//# sourceMappingURL=BreadcrumbsSeparator.js.map
