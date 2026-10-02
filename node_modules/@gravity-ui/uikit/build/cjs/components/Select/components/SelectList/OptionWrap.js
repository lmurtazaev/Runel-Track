"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionWrap = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("@gravity-ui/icons");
const Icon_1 = require("../../../Icon/index.js");
const cn_1 = require("../../../utils/cn.js");
const b = (0, cn_1.block)('select-list');
const DefaultOption = ({ option }) => {
    const { content, children, disabled, title } = option;
    return ((0, jsx_runtime_1.jsx)("span", { title: title, className: b('option-default-label', { disabled }), children: content || children }));
};
const OptionWrap = (props) => {
    const { renderOption, value, option, multiple } = props;
    const selected = value.indexOf(option.value) !== -1;
    const optionContent = renderOption ? renderOption(option) : (0, jsx_runtime_1.jsx)(DefaultOption, { option: option });
    return ((0, jsx_runtime_1.jsxs)("div", { "data-qa": option.qa, className: b('option', { disabled: option.disabled }), children: [multiple && ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { className: b('tick-icon', { shown: selected && multiple }), data: icons_1.Check })), optionContent] }));
};
exports.OptionWrap = OptionWrap;
//# sourceMappingURL=OptionWrap.js.map
