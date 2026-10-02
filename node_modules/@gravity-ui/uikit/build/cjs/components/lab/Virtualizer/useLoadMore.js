"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLoadMore = useLoadMore;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const hooks_1 = require("../../../hooks/index.js");
function useLoadMore(scrollContainerRef, options) {
    const { onLoadMore, loading, scrollOffset = 1 } = options;
    const isLoadingRef = React.useRef(loading);
    React.useEffect(() => {
        const element = scrollContainerRef.current;
        if (!element || typeof onLoadMore !== 'function') {
            return undefined;
        }
        const onScroll = () => {
            if (isLoadingRef.current) {
                return;
            }
            const shouldLoadMore = element.scrollHeight - element.scrollTop - element.clientHeight <
                element.clientHeight * scrollOffset;
            if (shouldLoadMore) {
                isLoadingRef.current = true;
                onLoadMore();
            }
        };
        element.addEventListener('scroll', onScroll);
        return () => {
            element.removeEventListener('scroll', onScroll);
        };
    }, [scrollContainerRef, onLoadMore, scrollOffset]);
    const prevLoadingPropRef = React.useRef(loading);
    (0, hooks_1.useLayoutEffect)(() => {
        if (loading !== prevLoadingPropRef.current) {
            isLoadingRef.current = loading;
            prevLoadingPropRef.current = loading;
        }
        const element = scrollContainerRef.current;
        if (!element || typeof onLoadMore !== 'function') {
            return;
        }
        const shouldLoadMore = !isLoadingRef.current && element.scrollHeight === element.clientHeight;
        if (shouldLoadMore) {
            isLoadingRef.current = true;
            onLoadMore();
        }
    }, [loading, onLoadMore, scrollContainerRef]);
}
//# sourceMappingURL=useLoadMore.js.map
