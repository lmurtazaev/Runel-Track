'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
export const PortalContext = React.createContext({
    current: null,
});
PortalContext.displayName = 'PortalContext';
export function PortalProvider({ container, children }) {
    return _jsx(PortalContext.Provider, { value: container, children: children });
}
//# sourceMappingURL=PortalProvider.js.map
