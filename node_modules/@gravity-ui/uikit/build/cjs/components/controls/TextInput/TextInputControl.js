"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextInputControl = TextInputControl;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../../utils/cn.js");
const b = (0, cn_1.block)('text-input');
function TextInputControl(props) {
    const { controlProps, controlRef, type, name, id, tabIndex, autoComplete, placeholder, value, defaultValue, autoFocus, disabled, readOnly, onChange, onFocus, onBlur, onKeyDown, onKeyUp, onKeyPress, } = props;
    return ((0, jsx_runtime_1.jsx)("input", { ...controlProps, ref: controlRef, className: b('control', { type: 'input' }, controlProps.className), type: type, name: name, id: id, tabIndex: tabIndex, placeholder: placeholder, value: value, defaultValue: defaultValue, autoFocus: autoFocus, autoComplete: autoComplete, onChange: onChange, onFocus: onFocus, onBlur: onBlur, onKeyDown: onKeyDown, onKeyUp: onKeyUp, onKeyPress: onKeyPress, disabled: disabled ?? controlProps.disabled, readOnly: readOnly ?? controlProps.readOnly }));
}
//# sourceMappingURL=TextInputControl.js.map
