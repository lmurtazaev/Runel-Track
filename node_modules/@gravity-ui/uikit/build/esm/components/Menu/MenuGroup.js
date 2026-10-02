import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { useUniqId } from "../../hooks/index.js";
import { block } from "../utils/cn.js";
const b = block('menu');
export const MenuGroup = React.forwardRef(function MenuGroup({ label, children, style, className, qa }, ref) {
    const labelId = useUniqId();
    return (_jsx("li", { ref: ref, className: b('list-group-item'), children: _jsxs("div", { style: style, className: b('group', className), "data-qa": qa, children: [label && (_jsx("div", { id: labelId, className: b('group-label'), children: label })), _jsx("ul", { role: "group", "aria-labelledby": labelId, className: b('group-list'), children: children })] }) }));
});
//# sourceMappingURL=MenuGroup.js.map
