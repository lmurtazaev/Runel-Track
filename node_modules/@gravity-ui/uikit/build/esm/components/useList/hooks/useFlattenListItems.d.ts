import type { ListItemId, ListItemType } from "../types.js";
interface UseFlattenListItemsProps<T> {
    items: ListItemType<T>[];
    expandedById?: Record<ListItemId, boolean>;
    getItemId?(item: T): ListItemId;
}
/**
 * Pick ids from items and flatten children.
 * Returns flatten ids list tree structure representation.
 * Not included items if they in `expandedById` map
 */
export declare function useFlattenListItems<T>({ items, expandedById, getItemId, }: UseFlattenListItemsProps<T>): import("../index.js").ParsedFlattenState;
export {};
