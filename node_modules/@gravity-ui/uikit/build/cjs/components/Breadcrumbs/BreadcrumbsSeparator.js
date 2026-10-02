"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadcrumbsSeparator = BreadcrumbsSeparator;
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("./utils.js");
function BreadcrumbsSeparator({ separator }) {
    return ((0, jsx_runtime_1.jsx)("div", { "aria-hidden": true, className: (0, utils_1.b)('divider'), children: separator ?? '/' }));
}
BreadcrumbsSeparator.displayName = 'Breadcrumbs.Separator';
//# sourceMappingURL=BreadcrumbsSeparator.js.map
