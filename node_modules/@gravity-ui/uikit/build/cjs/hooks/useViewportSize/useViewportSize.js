"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useViewportSize = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const getViewportSize = () => ({
    width: window?.visualViewport?.width ?? window?.innerWidth ?? undefined,
    height: window?.visualViewport?.height ?? window?.innerHeight ?? undefined,
});
/**
 * A hook to get the size of the viewport when resizing
 * @returns - {width, height}
 */
const useViewportSize = () => {
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
exports.useViewportSize = useViewportSize;
//# sourceMappingURL=useViewportSize.js.map
