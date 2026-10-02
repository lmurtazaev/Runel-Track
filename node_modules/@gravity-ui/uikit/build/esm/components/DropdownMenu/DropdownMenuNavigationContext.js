'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
const rootMenuPath = [];
export const DropdownMenuNavigationContext = React.createContext({
    activeMenuPath: rootMenuPath,
    setActiveMenuPath: () => { },
    anchorRef: { current: null },
});
export const DropdownMenuNavigationContextProvider = ({ anchorRef, children, disabled, }) => {
    const [activeMenuPath, setActiveMenuPath] = React.useState(rootMenuPath);
    React.useEffect(() => {
        if (disabled) {
            setActiveMenuPath(rootMenuPath);
        }
    }, [disabled]);
    const contextValue = React.useMemo(() => ({
        activeMenuPath,
        setActiveMenuPath,
        anchorRef,
    }), [activeMenuPath, anchorRef]);
    return (_jsx(DropdownMenuNavigationContext.Provider, { value: contextValue, children: children }));
};
//# sourceMappingURL=DropdownMenuNavigationContext.js.map
