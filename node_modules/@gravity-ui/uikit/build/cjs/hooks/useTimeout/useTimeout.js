"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTimeout = useTimeout;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
function useTimeout(callback, ms) {
    React.useEffect(() => {
        if (typeof ms !== 'number') {
            return undefined;
        }
        const timer = setTimeout(() => {
            callback();
        }, ms);
        return () => {
            clearTimeout(timer);
        };
    }, [callback, ms]);
}
//# sourceMappingURL=useTimeout.js.map
