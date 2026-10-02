'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { ToasterContext } from "./ToasterContext.js";
import { ToastsContext } from "./ToastsContext.js";
export const ToasterProvider = ({ toaster, children }) => {
    const [toasts, setToasts] = React.useState([]);
    React.useEffect(() => {
        const unsubscribe = toaster.subscribe(setToasts);
        return () => {
            unsubscribe();
        };
    }, [toaster]);
    return (_jsx(ToasterContext.Provider, { value: toaster, children: _jsx(ToastsContext.Provider, { value: toasts, children: children }) }));
};
ToasterProvider.displayName = 'ToasterProvider';
//# sourceMappingURL=ToasterProvider.js.map
