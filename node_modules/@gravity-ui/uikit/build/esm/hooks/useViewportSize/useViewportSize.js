import * as React from 'react';
const getViewportSize = () => ({
    width: window?.visualViewport?.width ?? window?.innerWidth ?? undefined,
    height: window?.visualViewport?.height ?? window?.innerHeight ?? undefined,
});
/**
 * A hook to get the size of the viewport when resizing
 * @returns - {width, height}
 */
export const useViewportSize = () => {
    const [size, setSize] = React.useState(getViewportSize());
    React.useEffect(() => {
        const onResize = () => {
            let newSize = getViewportSize();
            if (newSize.width === size?.width && newSize.height === size?.height) {
                newSize = size;
            }
            setSize(newSize);
        };
        (window.visualViewport ?? window).addEventListener('resize', onResize);
        return () => {
            (window.visualViewport ?? window).removeEventListener('resize', onResize);
        };
    }, [size]);
    return size;
};
//# sourceMappingURL=useViewportSize.js.map
