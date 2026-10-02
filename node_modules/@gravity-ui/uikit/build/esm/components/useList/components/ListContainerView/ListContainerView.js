import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { Flex } from "../../../layout/index.js";
import { block } from "../../../utils/cn.js";
import "./ListContainerView.css";
const b = block('list-container-view');
export const ListContainerView = React.forwardRef(function ListContainerView({ as = 'div', role = 'listbox', children, id, className, fixedHeight, extraProps, qa, style }, ref) {
    return (_jsx(Flex, { qa: qa, as: as, direction: "column", ref: ref, grow: true, tabIndex: -1, id: id, role: role, style: style, className: b({ 'fixed-height': fixedHeight }, className), ...extraProps, children: children }));
});
//# sourceMappingURL=ListContainerView.js.map
