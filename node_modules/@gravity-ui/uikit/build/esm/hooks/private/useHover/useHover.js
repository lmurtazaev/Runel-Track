import * as React from 'react';
export function useHover() {
    const [isHovering, setIsHovering] = React.useState(false);
    const onMouseEnter = React.useCallback(() => {
        setIsHovering(true);
    }, []);
    const onMouseLeave = React.useCallback(() => {
        setIsHovering(false);
    }, []);
    return [onMouseEnter, onMouseLeave, isHovering];
}
//# sourceMappingURL=useHover.js.map
