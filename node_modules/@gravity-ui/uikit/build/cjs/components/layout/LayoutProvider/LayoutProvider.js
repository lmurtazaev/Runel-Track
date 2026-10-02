'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateLayoutProvider = PrivateLayoutProvider;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const LayoutContext_1 = require("../contexts/LayoutContext.js");
const useCurrentActiveMediaQuery_1 = require("../hooks/useCurrentActiveMediaQuery.js");
const overrideLayoutTheme_1 = require("../utils/overrideLayoutTheme.js");
function PrivateLayoutProvider({ children, config: override, initialMediaQuery, fixBreakpoints = false, }) {
    const parentContext = React.useContext(LayoutContext_1.LayoutContext);
    const theme = React.useMemo(() => (0, overrideLayoutTheme_1.overrideLayoutTheme)({ theme: parentContext.theme, override }), [override, parentContext.theme]);
    const activeMediaQuery = (0, useCurrentActiveMediaQuery_1.useCurrentActiveMediaQuery)(theme.breakpoints, fixBreakpoints, initialMediaQuery);
    const value = React.useMemo(() => ({ activeMediaQuery, theme, fixBreakpoints }), [activeMediaQuery, theme, fixBreakpoints]);
    return (0, jsx_runtime_1.jsx)(LayoutContext_1.LayoutContext.Provider, { value: value, children: children });
}
//# sourceMappingURL=LayoutProvider.js.map
