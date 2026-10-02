import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check } from '@gravity-ui/icons';
import { Icon } from "../../../Icon/index.js";
import { block } from "../../../utils/cn.js";
const b = block('select-list');
const DefaultOption = ({ option }) => {
    const { content, children, disabled, title } = option;
    return (_jsx("span", { title: title, className: b('option-default-label', { disabled }), children: content || children }));
};
export const OptionWrap = (props) => {
    const { renderOption, value, option, multiple } = props;
    const selected = value.indexOf(option.value) !== -1;
    const optionContent = renderOption ? renderOption(option) : _jsx(DefaultOption, { option: option });
    return (_jsxs("div", { "data-qa": option.qa, className: b('option', { disabled: option.disabled }), children: [multiple && (_jsx(Icon, { className: b('tick-icon', { shown: selected && multiple }), data: Check })), optionContent] }));
};
//# sourceMappingURL=OptionWrap.js.map
