import type { ListItemId, ListItemType } from "../types.js";
interface GetListItemIdProps<T> {
    item: ListItemType<T>;
    groupedId: ListItemId;
    getItemId?(data: T): ListItemId;
}
export declare const getListItemId: <T>({ item, groupedId, getItemId }: GetListItemIdProps<T>) => string;
export {};
