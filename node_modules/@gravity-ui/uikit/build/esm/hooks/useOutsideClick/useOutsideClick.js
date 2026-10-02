import * as React from 'react';
/**
 * Hook for observing clicks outside a given target
 * @param ref - purpose of observation
 * @param handler - callback when a click is triggered outside the observation target
 * @returns - nothing
 */
export const useOutsideClick = ({ ref, handler }) => {
    React.useEffect(() => {
        const callback = (e) => {
            const elem = ref?.current;
            if (elem && !elem.contains(e.target) && handler) {
                handler(e);
            }
        };
        window.addEventListener('mouseup', callback, { capture: true });
        window.addEventListener('touchend', callback, { capture: true });
        return () => {
            window.removeEventListener('mouseup', callback, { capture: true });
            window.removeEventListener('touchend', callback, { capture: true });
        };
    }, [handler, ref]);
};
//# sourceMappingURL=useOutsideClick.js.map
