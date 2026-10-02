'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { defaultRangeExtractor, useVirtualizer } from '@tanstack/react-virtual';
import { useForkRef } from "../../../hooks/index.js";
import { useLoadMore } from "./useLoadMore.js";
export function Virtualizer({ apiRef, containerRef, count, getItemSize, getItemKey, disableVirtualization, renderRow, loading, onLoadMore, persistedIndexes, ...props }) {
    const scrollContainerRef = React.useRef(null);
    const ref = useForkRef(containerRef, scrollContainerRef);
    const { rangeExtractor, persistedChildren } = getRangeExtractorAndChildrenIndexes(persistedIndexes);
    const virtualizer = useVirtualizer({
        count,
        getScrollElement: () => scrollContainerRef.current,
        getItemKey,
        estimateSize: getItemSize,
        rangeExtractor,
        overscan: disableVirtualization ? count : 0,
    });
    React.useImperativeHandle(apiRef, () => ({
        scrollToOffset: (offset, align = 'auto') => {
            virtualizer.scrollToOffset(virtualizer.getOffsetForAlignment(offset, align));
        },
        scrollToIndex: (index, align = 'auto') => {
            virtualizer.scrollToIndex(index, { align });
        },
        get scrollOffset() {
            return virtualizer.scrollOffset;
        },
        get scrollRect() {
            return virtualizer.scrollRect;
        },
    }), [virtualizer]);
    const visibleItems = virtualizer.getVirtualItems();
    useLoadMore(scrollContainerRef, { onLoadMore, loading });
    return (_jsx("div", { ...props, ref: ref, style: {
            ...props.style,
            overflow: 'auto',
            contain: disableVirtualization ? undefined : 'strict',
        }, children: renderRows({
            totalHeight: virtualizer.getTotalSize(),
            start: 0,
            items: visibleItems,
            scrollContainer: virtualizer.scrollElement,
            parentKey: undefined,
            renderRow,
            getItemSize,
            getItemKey,
            disableVirtualization,
            persistedChildren,
            measureElement: virtualizer.measureElement,
        }) }));
}
function renderRows({ totalHeight, start, parentKey, getItemSize, getItemKey, renderRow, items, scrollContainer, disableVirtualization, persistedChildren, measureElement, }) {
    return (_jsx("div", { role: "presentation", style: disableVirtualization
            ? { contentVisibility: 'auto', containIntrinsicBlockSize: totalHeight }
            : {
                height: totalHeight,
                width: '100%',
                position: 'relative',
            }, children: items.map((virtualRow) => (_jsx("div", { ref: measureElement, "data-key": virtualRow.key, "data-index": virtualRow.index, role: "presentation", style: disableVirtualization
                ? undefined
                : {
                    position: 'absolute',
                    top: virtualRow.start - start,
                    left: 0,
                    width: '100%',
                }, children: renderRow(virtualRow, parentKey, ({ height, count }) => (_jsx(ChildrenVirtualizer, { count: count, parentKey: virtualRow.key, start: virtualRow.start + height, getItemSize: getItemSize, getItemKey: getItemKey, renderRow: renderRow, scrollContainer: scrollContainer, disableVirtualization: disableVirtualization, persistedIndexes: persistedChildren?.get(virtualRow.index) }, virtualRow.key))) }, virtualRow.key))) }));
}
function ChildrenVirtualizer(props) {
    const { start, scrollContainer, count, getItemSize, getItemKey, renderRow, parentKey, disableVirtualization, persistedIndexes, } = props;
    const { rangeExtractor, persistedChildren } = getRangeExtractorAndChildrenIndexes(persistedIndexes);
    const virtualizer = useVirtualizer({
        count,
        getScrollElement: () => scrollContainer,
        estimateSize: (index) => getItemSize(index, parentKey),
        getItemKey: (index) => getItemKey(index, parentKey),
        scrollToFn: () => { }, // parent element controls scroll, so disable it here
        paddingStart: start,
        rangeExtractor,
        overscan: 0,
        enabled: !disableVirtualization,
    });
    let items = virtualizer.getVirtualItems();
    let height = virtualizer.getTotalSize() - start;
    if (disableVirtualization) {
        height = 0;
        items = new Array(count).fill(0).map((_, index) => {
            height += getItemSize(index, parentKey);
            return {
                index,
                key: getItemKey(index),
                start: 0,
                end: 0,
                size: 0,
                lane: 0,
            };
        });
    }
    return renderRows({
        getItemKey,
        getItemSize,
        totalHeight: height,
        start,
        items,
        scrollContainer,
        parentKey,
        renderRow,
        disableVirtualization,
        persistedChildren,
    });
}
function getRangeExtractorAndChildrenIndexes(persistedIndexes) {
    if (!persistedIndexes) {
        return {};
    }
    const persistedChildren = new Map();
    const persist = [];
    for (const [index, ...childrenIndexes] of persistedIndexes) {
        if (index >= 0) {
            persist.push(index);
            const children = persistedChildren.get(index) ?? [];
            children.push(childrenIndexes);
            persistedChildren.set(index, children);
        }
    }
    if (persist.length === 0) {
        return {};
    }
    const rangeExtractor = (range) => {
        const next = new Set(persist.filter((i) => i < range.count).concat(defaultRangeExtractor(range)));
        return Array.from(next).sort((a, b) => a - b);
    };
    return { rangeExtractor, persistedChildren };
}
//# sourceMappingURL=Virtualizer.js.map
