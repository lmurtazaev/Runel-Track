'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectFilter = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const controls_1 = require("../../../controls/index.js");
const cn_1 = require("../../../utils/cn.js");
const constants_1 = require("../../constants.js");
const i18n_1 = tslib_1.__importDefault(require("../../i18n/index.js"));
require("./SelectFilter.css");
const b = (0, cn_1.block)('select-filter');
const style = {
    padding: '4px 4px 0',
};
exports.SelectFilter = React.forwardRef((props, ref) => {
    const { onChange, onKeyDown, renderFilter, size, value, placeholder, popupId, activeIndex } = props;
    const inputRef = React.useRef(null);
    React.useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus({ preventScroll: true }),
    }), []);
    const { t } = i18n_1.default.useTranslation();
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
    return ((0, jsx_runtime_1.jsx)("div", { className: b(), style: style, children: (0, jsx_runtime_1.jsx)(controls_1.TextInput, { controlRef: inputRef, controlProps: {
                className: b('input'),
                size: 1,
                'aria-label': inputProps['aria-label'],
                'aria-controls': inputProps['aria-controls'],
                'aria-activedescendant': inputProps['aria-activedescendant'],
            }, size: size, value: value, placeholder: placeholder, onUpdate: onChange, onKeyDown: onKeyDown, qa: constants_1.SelectQa.FILTER_INPUT }) }));
});
exports.SelectFilter.displayName = 'SelectFilter';
//# sourceMappingURL=SelectFilter.js.map
