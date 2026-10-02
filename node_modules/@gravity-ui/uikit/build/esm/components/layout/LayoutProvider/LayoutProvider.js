'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { LayoutContext } from "../contexts/LayoutContext.js";
import { useCurrentActiveMediaQuery } from "../hooks/useCurrentActiveMediaQuery.js";
import { overrideLayoutTheme } from "../utils/overrideLayoutTheme.js";
export function PrivateLayoutProvider({ children, config: override, initialMediaQuery, fixBreakpoints = false, }) {
    const parentContext = React.useContext(LayoutContext);
    const theme = React.useMemo(() => overrideLayoutTheme({ theme: parentContext.theme, override }), [override, parentContext.theme]);
    const activeMediaQuery = useCurrentActiveMediaQuery(theme.breakpoints, fixBreakpoints, initialMediaQuery);
    const value = React.useMemo(() => ({ activeMediaQuery, theme, fixBreakpoints }), [activeMediaQuery, theme, fixBreakpoints]);
    return _jsx(LayoutContext.Provider, { value: value, children: children });
}
//# sourceMappingURL=LayoutProvider.js.map
