"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdditionalContent = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const cn_1 = require("../../utils/cn.js");
const b = (0, cn_1.block)('text-input');
exports.AdditionalContent = React.forwardRef(function AdditionalContent({ placement, children, onClick }, ref) {
    if (!children) {
        return null;
    }
    return (
    // It is used to focus the control input if non-interaction element is provided.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    (0, jsx_runtime_1.jsx)("div", { ref: ref, className: b('additional-content', { placement }), onClick: onClick, children: children }));
});
//# sourceMappingURL=AdditionalContent.js.map
