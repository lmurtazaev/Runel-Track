'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
export const DefinitionListAttributesContext = React.createContext(undefined);
export function DefinitionListProvider({ direction, contentMaxWidth, nameMaxWidth, children, }) {
    const keyStyle = nameMaxWidth ? { maxWidth: nameMaxWidth, width: nameMaxWidth } : {};
    const valueStyle = typeof contentMaxWidth === 'number'
        ? { width: contentMaxWidth, maxWidth: contentMaxWidth }
        : {};
    return (_jsx(DefinitionListAttributesContext.Provider, { value: {
            keyStyle,
            valueStyle,
            direction,
        }, children: children }));
}
export function useDefinitionListAttributes() {
    const state = React.useContext(DefinitionListAttributesContext);
    if (state === undefined) {
        throw new Error('useDefinitionListAttributes must be used within DefinitionListProvider');
    }
    return state;
}
//# sourceMappingURL=DefinitionListContext.js.map
