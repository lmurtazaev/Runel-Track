import * as React from 'react';
const initialPosition = { top: 0, right: 0, bottom: 0, left: 0 };
// React hook for creating virtual element for popup
export function useVirtualElementRef(props = {}) {
    const { rect, contextElement } = props;
    const rectRef = React.useRef(initialPosition);
    const ref = React.useRef({
        contextElement,
        getBoundingClientRect() {
            const { top, right, bottom, left } = rectRef.current;
            const width = right - left;
            const height = bottom - top;
            return {
                top,
                right,
                bottom,
                left,
                width,
                height,
            };
        },
    });
    ref.current.contextElement = contextElement;
    if (rect) {
        const { top = 0, left = 0, right = left, bottom = top } = rect;
        rectRef.current = { top, right, bottom, left };
    }
    else {
        rectRef.current = initialPosition;
    }
    return ref;
}
export function useVirtualElement(rect) {
    const rectRef = React.useRef(rect);
    const [anchor, setAnchor] = React.useState({
        getBoundingClientRect() {
            const { top = 0, left = 0, right = left, bottom = top } = rectRef.current;
            return { top, left, bottom, right, width: right - left, height: bottom - top };
        },
        contextElement: undefined,
    });
    const setContextElement = React.useCallback((node) => {
        setAnchor({
            getBoundingClientRect() {
                const { top = 0, left = 0, right = left, bottom = top } = rectRef.current;
                return {
                    top,
                    left,
                    bottom,
                    right,
                    width: right - left,
                    height: bottom - top,
                };
            },
            contextElement: node ?? undefined,
        });
    }, []);
    const { top, left, bottom, right } = rect;
    React.useEffect(() => {
        rectRef.current = { top, left, bottom, right };
    }, [top, left, bottom, right]);
    return { anchor, setContextElement };
}
//# sourceMappingURL=useVirtualElementRef.js.map
