"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForkRef = useForkRef;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mergeRefs_1 = require("./mergeRefs.js");
function useForkRef(...refs) {
    return React.useMemo(() => {
        if (refs.every((ref) => ref === null || ref === undefined)) {
            return null;
        }
        return (0, mergeRefs_1.mergeRefs)(...refs);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, refs);
}
//# sourceMappingURL=useForkRef.js.map
