'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStepperContext = exports.StepperContext = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
exports.StepperContext = React.createContext({
    size: 'm',
    onUpdate: undefined,
    value: undefined,
});
const useStepperContext = () => {
    const data = React.useContext(exports.StepperContext);
    return data;
};
exports.useStepperContext = useStepperContext;
//# sourceMappingURL=context.js.map
