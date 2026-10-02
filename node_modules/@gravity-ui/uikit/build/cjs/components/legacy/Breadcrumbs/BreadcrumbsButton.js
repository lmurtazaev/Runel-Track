"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadcrumbsButton = BreadcrumbsButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../../utils/cn.js");
const b = (0, cn_1.block)('breadcrumbs-legacy');
function BreadcrumbsButton(props) {
    return (0, jsx_runtime_1.jsx)("button", { ...props, type: "button", className: b('switcher', { more: true }) });
}
//# sourceMappingURL=BreadcrumbsButton.js.map
