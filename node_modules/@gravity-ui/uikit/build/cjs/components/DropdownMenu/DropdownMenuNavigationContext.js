'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownMenuNavigationContextProvider = exports.DropdownMenuNavigationContext = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const rootMenuPath = [];
exports.DropdownMenuNavigationContext = React.createContext({
    activeMenuPath: rootMenuPath,
    setActiveMenuPath: () => { },
    anchorRef: { current: null },
});
const DropdownMenuNavigationContextProvider = ({ anchorRef, children, disabled, }) => {
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
    return ((0, jsx_runtime_1.jsx)(exports.DropdownMenuNavigationContext.Provider, { value: contextValue, children: children }));
};
exports.DropdownMenuNavigationContextProvider = DropdownMenuNavigationContextProvider;
//# sourceMappingURL=DropdownMenuNavigationContext.js.map
