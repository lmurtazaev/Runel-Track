"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAnchor = useAnchor;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
function useAnchor(anchorElement, anchorRef) {
    const anchorElementRef = React.useRef(anchorElement ?? null);
    React.useEffect(() => {
        anchorElementRef.current = anchorElement ?? null;
    }, [anchorElement]);
    if (anchorElement !== undefined) {
        return { element: anchorElement, ref: anchorElementRef };
    }
    else if (anchorRef) {
        return { element: anchorRef.current, ref: anchorRef };
    }
    return { element: undefined, ref: undefined };
}
//# sourceMappingURL=hooks.js.map
