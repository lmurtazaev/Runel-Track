"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuGroup = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const hooks_1 = require("../../hooks/index.js");
const cn_1 = require("../utils/cn.js");
const b = (0, cn_1.block)('menu');
exports.MenuGroup = React.forwardRef(function MenuGroup({ label, children, style, className, qa }, ref) {
    const labelId = (0, hooks_1.useUniqId)();
    return ((0, jsx_runtime_1.jsx)("li", { ref: ref, className: b('list-group-item'), children: (0, jsx_runtime_1.jsxs)("div", { style: style, className: b('group', className), "data-qa": qa, children: [label && ((0, jsx_runtime_1.jsx)("div", { id: labelId, className: b('group-label'), children: label })), (0, jsx_runtime_1.jsx)("ul", { role: "group", "aria-labelledby": labelId, className: b('group-list'), children: children })] }) }));
});
//# sourceMappingURL=MenuGroup.js.map
