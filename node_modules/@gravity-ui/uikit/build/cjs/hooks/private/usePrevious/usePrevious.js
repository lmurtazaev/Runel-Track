"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePrevious = usePrevious;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
function usePrevious(value) {
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
//# sourceMappingURL=usePrevious.js.map
