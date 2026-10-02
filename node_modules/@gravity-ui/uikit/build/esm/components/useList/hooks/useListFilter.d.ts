import * as React from 'react';
import type { ListItemType } from "../types.js";
interface UseListFilterProps<T> {
    items: ListItemType<T>[];
    /**
     * Override default filtration logic
     */
    filterItems?(value: string, items: ListItemType<T>[]): ListItemType<T>[];
    /**
     * Override only logic with item filtration
     */
    filterItem?(value: string, item: T): boolean;
    onFilterChange?(value: string): void;
    debounceTimeout?: number;
    initialFilterValue?: string;
}
/**
 * Ready-to-use logic for filtering tree-like data structures
 *
 * ```tsx
 * const {item: filteredItems,...listFiltration} = useListFIlter({items});
 * const list = useList({items: filteredItems});
 *
 * <TextInput {...listFiltration} />
 * ```
 */
export declare function useListFilter<T>({ items: externalItems, initialFilterValue, filterItem, onFilterChange, filterItems, debounceTimeout, }: UseListFilterProps<T>): {
    filterRef: React.RefObject<HTMLInputElement>;
    filter: string;
    reset: () => void;
    items: ListItemType<T>[];
    onFilterUpdate: (nextFilterValue: string) => void;
};
export {};
