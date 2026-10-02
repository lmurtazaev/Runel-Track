'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAlertContext = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const AlertContext_1 = require("./AlertContext.js");
const useAlertContext = () => {
    const context = React.useContext(AlertContext_1.AlertContext);
    if (!context)
        throw new Error('Alert: `useAlertContext` hook is used out of "AlertContext"');
    return context;
};
exports.useAlertContext = useAlertContext;
//# sourceMappingURL=useAlertContext.js.map
