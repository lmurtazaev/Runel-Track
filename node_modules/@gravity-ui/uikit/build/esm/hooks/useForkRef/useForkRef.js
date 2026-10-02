import * as React from 'react';
import { mergeRefs } from "./mergeRefs.js";
export function useForkRef(...refs) {
    return React.useMemo(() => {
        if (refs.every((ref) => ref === null || ref === undefined)) {
            return null;
        }
        return mergeRefs(...refs);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, refs);
}
//# sourceMappingURL=useForkRef.js.map
