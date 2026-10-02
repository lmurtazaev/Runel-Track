import * as React from 'react';
export function useScrollHandler(onScroll, anchorRef, disabled) {
    React.useEffect(() => {
        if (disabled) {
            return undefined;
        }
        const handleScroll = (event) => {
            if (event.target.contains(anchorRef.current)) {
                onScroll(event);
            }
        };
        document.addEventListener('scroll', handleScroll, true);
        return () => {
            document.removeEventListener('scroll', handleScroll, true);
        };
    }, [anchorRef, onScroll, disabled]);
}
//# sourceMappingURL=useScrollHandler.js.map
