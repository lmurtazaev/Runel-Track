'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortalContext = void 0;
exports.PortalProvider = PortalProvider;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
exports.PortalContext = React.createContext({
    current: null,
});
exports.PortalContext.displayName = 'PortalContext';
function PortalProvider({ container, children }) {
    return (0, jsx_runtime_1.jsx)(exports.PortalContext.Provider, { value: container, children: children });
}
//# sourceMappingURL=PortalProvider.js.map
