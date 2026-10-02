"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupArrow = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const cn_1 = require("../utils/cn.js");
require("./Popup.css");
const b = (0, cn_1.block)('popup');
exports.PopupArrow = React.forwardRef(function PopupArrow({ styles }, ref) {
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: b('arrow'), style: styles, children: (0, jsx_runtime_1.jsxs)("div", { className: b('arrow-content'), children: [(0, jsx_runtime_1.jsx)("div", { className: b('arrow-circle-wrapper'), children: (0, jsx_runtime_1.jsx)("div", { className: b('arrow-circle', { left: true }) }) }), (0, jsx_runtime_1.jsx)("div", { className: b('arrow-circle-wrapper'), children: (0, jsx_runtime_1.jsx)("div", { className: b('arrow-circle', { right: true }) }) })] }) }));
});
//# sourceMappingURL=PopupArrow.js.map
