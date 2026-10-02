"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HexInput = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const react_color_1 = require("@uiw/react-color");
const controls_1 = require("../../../../controls/index.js");
const constants_1 = require("../../constants.js");
const HexInput = ({ value, withAlpha, onChange, onBlur }) => {
    const handleInputChange = React.useCallback((e) => {
        onChange(e.target.value);
    }, [onChange]);
    const renderInput = (props, ref) => ((0, jsx_runtime_1.jsx)(controls_1.TextInput, { ...props, 
        /*
         * @uiw/react-color: disable EditableInput styles settings
         */
        style: undefined, ref: ref, defaultValue: props.defaultValue ? String(props.defaultValue) : '', size: 'm', type: 'text', value: String(props.value), onChange: props.onChange, onBlur: props.onBlur }));
    return ((0, jsx_runtime_1.jsx)(react_color_1.EditableInput, { value: value, onChange: handleInputChange, onBlur: onBlur, className: (0, constants_1.b)('hex-input', { withAlpha }), renderInput: renderInput }));
};
exports.HexInput = HexInput;
//# sourceMappingURL=HexInput.js.map
