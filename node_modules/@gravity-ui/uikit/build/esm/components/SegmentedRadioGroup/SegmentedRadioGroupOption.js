'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { RadioGroupContext, useRadio } from "../../hooks/private/index.js";
import { block } from "../utils/cn.js";
import { isIcon, isSvg } from "../utils/common.js";
const b = block('segmented-radio-group');
export const SegmentedRadioGroupOption = React.forwardRef(function SegmentedRadioGroupOption(props, ref) {
    const radioGroupContext = React.useContext(RadioGroupContext);
    if (!radioGroupContext) {
        throw new Error('<SegmentedRadioGroup.Option> must be used within <SegmentedRadioGroup>');
    }
    const { name, currentValue, disabled: disabledContext, onChange } = radioGroupContext;
    const { disabled: disabledProp, content, children, title, value } = props;
    const disabled = disabledContext || disabledProp;
    const { checked, inputProps } = useRadio({
        ...props,
        name,
        disabled,
        checked: value === currentValue,
        onChange,
    });
    const inner = content || children;
    const icon = isIcon(inner) || isSvg(inner);
    return (_jsxs("label", { className: b('option', {
            disabled,
            checked,
        }), ref: ref, title: title, children: [_jsx("input", { ...inputProps, className: b('option-control') }), inner && _jsx("span", { className: b('option-text', { icon }), children: inner })] }));
});
//# sourceMappingURL=SegmentedRadioGroupOption.js.map
