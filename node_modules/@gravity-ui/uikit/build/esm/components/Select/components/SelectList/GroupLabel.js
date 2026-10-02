import { jsx as _jsx } from "react/jsx-runtime";
import { block } from "../../../utils/cn.js";
const b = block('select-list');
export const GroupLabel = ({ option, renderOptionGroup }) => {
    if (renderOptionGroup) {
        return _jsx("div", { className: b('group-label-custom'), children: renderOptionGroup(option) });
    }
    else {
        return (_jsx("div", { className: b('group-label', { empty: option.label === '' }), children: _jsx("div", { className: b('group-label-content'), children: option.label }) }));
    }
};
//# sourceMappingURL=GroupLabel.js.map
