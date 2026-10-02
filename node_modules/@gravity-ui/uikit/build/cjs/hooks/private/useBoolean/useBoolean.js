"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBoolean = useBoolean;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
function useBoolean(initialState) {
    const [value, setValue] = React.useState(initialState);
    return [
        value,
        React.useCallback(() => setValue(true), []),
        React.useCallback(() => setValue(false), []),
        React.useCallback(() => setValue((val) => !val), []),
    ];
}
//# sourceMappingURL=useBoolean.js.map
