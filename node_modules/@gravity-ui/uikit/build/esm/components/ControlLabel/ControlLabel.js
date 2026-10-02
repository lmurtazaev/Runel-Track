import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { block } from "../utils/cn.js";
import "./ControlLabel.css";
const b = block('control-label');
/**
 * Wrap with label for `<Checkbox/>`, `<Radio/>`, `<Switch/>`
 */
export const ControlLabel = React.forwardRef(({ children, className, labelClassName, title, style, disabled = false, control, size = 'm', qa, }, ref) => {
    const clonedControl = React.cloneElement(control, {
        className: b('indicator', control.props.className),
    });
    return (_jsxs("label", { ref: ref, title: title, style: style, className: b({ size, disabled }, className), "data-qa": qa, children: [clonedControl, children ? _jsx("span", { className: b('text', labelClassName), children: children }) : null] }));
});
ControlLabel.displayName = 'ControlLabel';
//# sourceMappingURL=ControlLabel.js.map
