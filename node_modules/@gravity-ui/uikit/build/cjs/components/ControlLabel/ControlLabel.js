"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlLabel = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const cn_1 = require("../utils/cn.js");
require("./ControlLabel.css");
const b = (0, cn_1.block)('control-label');
/**
 * Wrap with label for `<Checkbox/>`, `<Radio/>`, `<Switch/>`
 */
exports.ControlLabel = React.forwardRef(({ children, className, labelClassName, title, style, disabled = false, control, size = 'm', qa, }, ref) => {
    const clonedControl = React.cloneElement(control, {
        className: b('indicator', control.props.className),
    });
    return ((0, jsx_runtime_1.jsxs)("label", { ref: ref, title: title, style: style, className: b({ size, disabled }, className), "data-qa": qa, children: [clonedControl, children ? (0, jsx_runtime_1.jsx)("span", { className: b('text', labelClassName), children: children }) : null] }));
});
exports.ControlLabel.displayName = 'ControlLabel';
//# sourceMappingURL=ControlLabel.js.map
