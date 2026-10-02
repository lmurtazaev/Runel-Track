'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useObserveIntersection = exports.OBSERVER_TARGET_ATTR = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const theme_1 = require("../../../theme/index.js");
exports.OBSERVER_TARGET_ATTR = 'data-observer-id';
const GAP = 4;
const useObserveIntersection = (updateObserveKey) => {
    const direction = (0, theme_1.useDirection)();
    const parentRef = React.useRef(null);
    const [visibilityMap, setVisibilityMap] = React.useState({});
    const [offset, setOffset] = React.useState(0);
    const handleIntersection = React.useCallback((entries) => {
        const updatedEntries = {};
        let newOffest = 0;
        let lastVisibleEntry;
        let firstInvisible;
        entries.forEach((entry) => {
            const targetId = entry.target.getAttribute(exports.OBSERVER_TARGET_ATTR);
            if (!targetId) {
                return;
            }
            if (entry.isIntersecting) {
                lastVisibleEntry = entry;
                updatedEntries[targetId] = true;
            }
            else {
                if (!firstInvisible) {
                    firstInvisible = entry;
                }
                updatedEntries[targetId] = false;
            }
        });
        const parentRect = parentRef.current?.getBoundingClientRect();
        if (parentRect && firstInvisible) {
            const rect = firstInvisible.target.getBoundingClientRect();
            newOffest =
                direction === 'ltr'
                    ? rect.left - parentRect.left
                    : parentRect.right - rect.right;
        }
        else if (parentRect && lastVisibleEntry) {
            const rect = lastVisibleEntry.target.getBoundingClientRect();
            newOffest =
                direction === 'ltr'
                    ? rect.right - parentRect.left + GAP
                    : parentRect.right - rect.left + GAP;
        }
        setVisibilityMap((prev) => ({
            ...prev,
            ...updatedEntries,
        }));
        setOffset(newOffest);
    }, [direction]);
    React.useEffect(() => {
        setVisibilityMap({});
        const observer = new IntersectionObserver(handleIntersection, {
            root: parentRef.current,
            threshold: 1,
        });
        Array.from(parentRef.current?.children || []).forEach((item) => {
            if (item.hasAttribute(exports.OBSERVER_TARGET_ATTR)) {
                observer.observe(item);
            }
        });
        return () => observer.disconnect();
    }, [handleIntersection, updateObserveKey]);
    return { parentRef, visibilityMap, offset };
};
exports.useObserveIntersection = useObserveIntersection;
//# sourceMappingURL=useObserveIntersection.js.map
