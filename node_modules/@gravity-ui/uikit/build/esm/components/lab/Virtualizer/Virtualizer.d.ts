import * as React from 'react';
import type { Rect } from '@tanstack/react-virtual';
import type { Key } from "../../types.js";
import type { Loadable } from "./useLoadMore.js";
type Item = {
    index: number;
    key: Key;
};
export type ScrollAlignment = 'start' | 'center' | 'end' | 'auto';
export interface VirtualizerApi {
    scrollToOffset: (offset: number, align?: ScrollAlignment) => void;
    scrollToIndex: (index: number, align?: ScrollAlignment) => void;
    scrollOffset: number | null;
    scrollRect: Rect | null;
}
interface VirtualizerProps extends Loadable, React.HTMLAttributes<HTMLDivElement> {
    /** The ref of the virtualizer api. */
    apiRef?: React.Ref<VirtualizerApi>;
    /** The ref of the scroll container element. */
    containerRef?: React.Ref<HTMLElement>;
    /** The number of first level items in the list. */
    count: number;
    /** The size of the item in the list. Size should include all children. For children items parentKey is passed. */
    getItemSize: (index: number, parentKey?: Key) => number;
    /** The key of the item in the list. For children items parentKey is passed. */
    getItemKey: (index: number, parentKey?: Key) => Key;
    /** Disables virtualization of the list. This might be useful for small lists. */
    disableVirtualization?: boolean;
    /** Renders the row of the list. */
    renderRow: (
    /**
     * The item of the row.
     * @param item.index The index of the item in current level.
     * @param item.key The key of the item in the list.
     */
    item: Item, 
    /** The key of the parent item in the list. */
    parentKey: Key | undefined, 
    /**
     * Renders the children of the row.
     * @param options.count The number of children items.
     * @param options.height The self height of the row.
     */
    renderChildren: (options: {
        count: number;
        height: number;
    }) => React.ReactNode) => React.ReactNode;
    /** The indexes of the persisted items. Each item is an array of indexes in the hierarchy. */
    persistedIndexes?: Array<number[]>;
}
export declare function Virtualizer({ apiRef, containerRef, count, getItemSize, getItemKey, disableVirtualization, renderRow, loading, onLoadMore, persistedIndexes, ...props }: VirtualizerProps): import("react/jsx-runtime").JSX.Element;
export {};
