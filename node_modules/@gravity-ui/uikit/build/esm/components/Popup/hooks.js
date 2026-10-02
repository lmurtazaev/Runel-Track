import * as React from 'react';
export function useAnchor(anchorElement, anchorRef) {
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
