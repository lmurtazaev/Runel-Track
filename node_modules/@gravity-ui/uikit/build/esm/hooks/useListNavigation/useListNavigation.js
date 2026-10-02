import * as React from 'react';
import { KeyCode } from "../../constants.js";
import { useLayoutEffect } from "../useLayoutEffect/index.js";
import { moveBack } from "./moveBack.js";
import { moveForward } from "./moveForward.js";
export function useListNavigation({ items, skip, pageSize, processHomeKey = true, processEndKey = true, anchorRef, disabled = false, initialValue = -1, onAnchorKeyDown, }) {
    const [activeItemIndex, setActiveItemIndex] = React.useState(initialValue);
    const reset = React.useCallback(() => {
        setActiveItemIndex(initialValue);
    }, [initialValue]);
    React.useEffect(() => {
        if (items) {
            reset();
        }
    }, [items, reset]);
    useLayoutEffect(() => {
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
                case KeyCode.ARROW_DOWN: {
                    event.preventDefault();
                    // Go 1 step forward
                    setActiveItemIndex((previousActiveItemIndex) => moveForward(items, previousActiveItemIndex, 1, skip));
                    break;
                }
                case KeyCode.ARROW_UP: {
                    event.preventDefault();
                    // Go 1 step back
                    setActiveItemIndex((previousActiveItemIndex) => moveBack(items, previousActiveItemIndex, 1, skip));
                    break;
                }
                case KeyCode.PAGE_DOWN: {
                    if (!pageSize) {
                        return;
                    }
                    event.preventDefault();
                    // Go pageSize steps forward
                    setActiveItemIndex((previousActiveItemIndex) => moveForward(items, previousActiveItemIndex, pageSize, skip));
                    break;
                }
                case KeyCode.PAGE_UP: {
                    if (!pageSize) {
                        return;
                    }
                    event.preventDefault();
                    // Go pageSize steps back
                    setActiveItemIndex((previousActiveItemIndex) => moveBack(items, previousActiveItemIndex, pageSize, skip));
                    break;
                }
                case KeyCode.HOME: {
                    if (!processHomeKey) {
                        return;
                    }
                    event.preventDefault();
                    // Go to the start of the list
                    setActiveItemIndex((previousActiveItemIndex) => moveBack(items, previousActiveItemIndex, previousActiveItemIndex, skip));
                    break;
                }
                case KeyCode.END: {
                    if (!processEndKey) {
                        return;
                    }
                    event.preventDefault();
                    // Go to the end of the list
                    setActiveItemIndex((previousActiveItemIndex) => moveBack(items, previousActiveItemIndex, previousActiveItemIndex + 1, skip));
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
