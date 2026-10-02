import * as React from 'react';
export interface Loadable {
    /** Whether the items are currently loading. */
    loading?: boolean;
    /** Handler that is called when more items should be loaded, e.g. while scrolling near the bottom. */
    onLoadMore?: () => void;
}
export interface LoadMoreOptions extends Loadable {
    /**
     * The amount of offset from bottom that should trigger load more.
     * The value is multiplied to the size of the visible area.
     * @default 1
     */
    scrollOffset?: number;
}
export declare function useLoadMore(scrollContainerRef: React.RefObject<HTMLElement | null>, options: LoadMoreOptions): void;
