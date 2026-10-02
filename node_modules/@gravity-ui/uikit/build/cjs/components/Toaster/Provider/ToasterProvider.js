'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToasterProvider = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const ToasterContext_1 = require("./ToasterContext.js");
const ToastsContext_1 = require("./ToastsContext.js");
const ToasterProvider = ({ toaster, children }) => {
    const [toasts, setToasts] = React.useState([]);
    React.useEffect(() => {
        const unsubscribe = toaster.subscribe(setToasts);
        return () => {
            unsubscribe();
        };
    }, [toaster]);
    return ((0, jsx_runtime_1.jsx)(ToasterContext_1.ToasterContext.Provider, { value: toaster, children: (0, jsx_runtime_1.jsx)(ToastsContext_1.ToastsContext.Provider, { value: toasts, children: children }) }));
};
exports.ToasterProvider = ToasterProvider;
exports.ToasterProvider.displayName = 'ToasterProvider';
//# sourceMappingURL=ToasterProvider.js.map
