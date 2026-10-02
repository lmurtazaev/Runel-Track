import * as React from 'react';
export function useTimeout(callback, ms) {
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
