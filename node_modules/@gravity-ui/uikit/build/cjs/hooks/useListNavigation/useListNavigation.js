"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useListNavigation = useListNavigation;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const constants_1 = require("../../constants.js");
const useLayoutEffect_1 = require("../useLayoutEffect/index.js");
const moveBack_1 = require("./moveBack.js");
const moveForward_1 = require("./moveForward.js");
function useListNavigation({ items, skip, pageSize, processHomeKey = true, processEndKey = true, anchorRef, disabled = false, initialValue = -1, onAnchorKeyDown, }) {
    const [activeItemIndex, setActiveItemIndex] = React.useState(initialValue);
    const reset = React.useCallback(() => {
        setActiveItemIndex(initialValue);
    }, [initialValue]);
    React.useEffect(() => {
        if (items) {
            reset();
        }
    }, [items, reset]);
    (0, useLayoutEffect_1.useLayoutEffect)(() => {
        if (disabled) {
            return undefined;
        }
        const canNavigate = items.some((item) => !skip?.(item));
        if (!canNavigate) {
            return undefined;
        }
        const anchor = anchorRef?.current;
        if (!anchor) {
            return undefined;
        }
        const handleKeyDown = (event) => {
            const shouldProcessKeydown = onAnchorKeyDown?.(activeItemIndex, event);
            if (shouldProcessKeydown === false) {
                return;
            }
            switch (event.key) {
                case constants_1.KeyCode.ARROW_DOWN: {
                    event.preventDefault();
                    // Go 1 step forward
                    setActiveItemIndex((previousActiveItemIndex) => (0, moveForward_1.moveForward)(items, previousActiveItemIndex, 1, skip));
                    break;
                }
                case constants_1.KeyCode.ARROW_UP: {
                    event.preventDefault();
                    // Go 1 step back
                    setActiveItemIndex((previousActiveItemIndex) => (0, moveBack_1.moveBack)(items, previousActiveItemIndex, 1, skip));
                    break;
                }
                case constants_1.KeyCode.PAGE_DOWN: {
                    if (!pageSize) {
                        return;
                    }
                    event.preventDefault();
                    // Go pageSize steps forward
                    setActiveItemIndex((previousActiveItemIndex) => (0, moveForward_1.moveForward)(items, previousActiveItemIndex, pageSize, skip));
                    break;
                }
                case constants_1.KeyCode.PAGE_UP: {
                    if (!pageSize) {
                        return;
                    }
                    event.preventDefault();
                    // Go pageSize steps back
                    setActiveItemIndex((previousActiveItemIndex) => (0, moveBack_1.moveBack)(items, previousActiveItemIndex, pageSize, skip));
                    break;
                }
                case constants_1.KeyCode.HOME: {
                    if (!processHomeKey) {
                        return;
                    }
                    event.preventDefault();
                    // Go to the start of the list
                    setActiveItemIndex((previousActiveItemIndex) => (0, moveBack_1.moveBack)(items, previousActiveItemIndex, previousActiveItemIndex, skip));
                    break;
                }
                case constants_1.KeyCode.END: {
                    if (!processEndKey) {
                        return;
                    }
                    event.preventDefault();
                    // Go to the end of the list
                    setActiveItemIndex((previousActiveItemIndex) => (0, moveBack_1.moveBack)(items, previousActiveItemIndex, previousActiveItemIndex + 1, skip));
                    break;
                }
            }
        };
        anchor.addEventListener('keydown', handleKeyDown);
        return () => {
            anchor.removeEventListener('keydown', handleKeyDown);
        };
    }, [
        activeItemIndex,
        anchorRef,
        disabled,
        items,
        onAnchorKeyDown,
        pageSize,
        processEndKey,
        processHomeKey,
        skip,
    ]);
    return {
        activeItemIndex,
        setActiveItemIndex,
        reset,
    };
}
//# sourceMappingURL=useListNavigation.js.map
