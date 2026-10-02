'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { TextInput } from "../../../controls/index.js";
import { block } from "../../../utils/cn.js";
import { SelectQa } from "../../constants.js";
import i18n from "../../i18n/index.js";
import "./SelectFilter.css";
const b = block('select-filter');
const style = {
    padding: '4px 4px 0',
};
export const SelectFilter = React.forwardRef((props, ref) => {
    const { onChange, onKeyDown, renderFilter, size, value, placeholder, popupId, activeIndex } = props;
    const inputRef = React.useRef(null);
    React.useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus({ preventScroll: true }),
    }), []);
    const { t } = i18n.useTranslation();
    const inputProps = {
        value,
        placeholder,
        size: 1,
        onKeyDown,
        onChange: (e) => {
            onChange(e.target.value);
        },
        'aria-label': t('label_filter'),
        'aria-controls': popupId,
        'aria-activedescendant': activeIndex === undefined ? undefined : `${popupId}-item-${activeIndex}`,
    };
    if (renderFilter) {
        return renderFilter({ onChange, onKeyDown, value, ref: inputRef, style, inputProps });
    }
    return (_jsx("div", { className: b(), style: style, children: _jsx(TextInput, { controlRef: inputRef, controlProps: {
                className: b('input'),
                size: 1,
                'aria-label': inputProps['aria-label'],
                'aria-controls': inputProps['aria-controls'],
                'aria-activedescendant': inputProps['aria-activedescendant'],
            }, size: size, value: value, placeholder: placeholder, onUpdate: onChange, onKeyDown: onKeyDown, qa: SelectQa.FILTER_INPUT }) }));
});
SelectFilter.displayName = 'SelectFilter';
//# sourceMappingURL=SelectFilter.js.map
