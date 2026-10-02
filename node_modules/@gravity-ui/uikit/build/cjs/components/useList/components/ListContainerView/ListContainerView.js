"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListContainerView = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const layout_1 = require("../../../layout/index.js");
const cn_1 = require("../../../utils/cn.js");
require("./ListContainerView.css");
const b = (0, cn_1.block)('list-container-view');
exports.ListContainerView = React.forwardRef(function ListContainerView({ as = 'div', role = 'listbox', children, id, className, fixedHeight, extraProps, qa, style }, ref) {
    return ((0, jsx_runtime_1.jsx)(layout_1.Flex, { qa: qa, as: as, direction: "column", ref: ref, grow: true, tabIndex: -1, id: id, role: role, style: style, className: b({ 'fixed-height': fixedHeight }, className), ...extraProps, children: children }));
});
//# sourceMappingURL=ListContainerView.js.map
