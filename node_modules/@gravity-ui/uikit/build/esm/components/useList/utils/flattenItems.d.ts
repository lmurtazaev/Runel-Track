import type { ListItemId, ListItemType, ParsedFlattenState } from "../types.js";
interface FlattenItemsProps<T> {
    items: ListItemType<T>[];
    expandedById?: Record<ListItemId, boolean>;
    getItemId?: (item: T) => ListItemId;
}
export declare function flattenItems<T>({ items, getItemId, expandedById, }: FlattenItemsProps<T>): ParsedFlattenState;
export {};
