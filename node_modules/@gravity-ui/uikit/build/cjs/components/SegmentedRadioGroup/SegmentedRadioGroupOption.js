'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegmentedRadioGroupOption = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const private_1 = require("../../hooks/private/index.js");
const cn_1 = require("../utils/cn.js");
const common_1 = require("../utils/common.js");
const b = (0, cn_1.block)('segmented-radio-group');
exports.SegmentedRadioGroupOption = React.forwardRef(function SegmentedRadioGroupOption(props, ref) {
    const radioGroupContext = React.useContext(private_1.RadioGroupContext);
    if (!radioGroupContext) {
        throw new Error('<SegmentedRadioGroup.Option> must be used within <SegmentedRadioGroup>');
    }
    const { name, currentValue, disabled: disabledContext, onChange } = radioGroupContext;
    const { disabled: disabledProp, content, children, title, value } = props;
    const disabled = disabledContext || disabledProp;
    const { checked, inputProps } = (0, private_1.useRadio)({
        ...props,
        name,
        disabled,
        checked: value === currentValue,
        onChange,
    });
    const inner = content || children;
    const icon = (0, common_1.isIcon)(inner) || (0, common_1.isSvg)(inner);
    return ((0, jsx_runtime_1.jsxs)("label", { className: b('option', {
            disabled,
            checked,
        }), ref: ref, title: title, children: [(0, jsx_runtime_1.jsx)("input", { ...inputProps, className: b('option-control') }), inner && (0, jsx_runtime_1.jsx)("span", { className: b('option-text', { icon }), children: inner })] }));
});
//# sourceMappingURL=SegmentedRadioGroupOption.js.map
