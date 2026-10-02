'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
export const VariableSizeListElementType = React.forwardRef(({ style, role, listId, ...rest }, ref) => (_jsx("div", { ref: ref, style: style, role: role, id: listId, ...rest })));
VariableSizeListElementType.displayName = 'VariableSizeListElementType';
export const createVariableSizeListElementType = (role, listId) => {
    const Component = React.forwardRef((props, ref) => (_jsx(VariableSizeListElementType, { ...props, role: role, ref: ref, listId: listId })));
    Component.displayName = 'VariableSizeListElementType';
    return Component;
};
//# sourceMappingURL=VariableSizeListElementType.js.map
