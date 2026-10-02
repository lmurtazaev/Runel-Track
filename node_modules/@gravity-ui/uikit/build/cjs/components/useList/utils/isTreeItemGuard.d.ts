import type { ListItemType, ListTreeItemType } from "../types.js";
export declare const isTreeItemGuard: <T>(item?: ListItemType<T>) => item is ListTreeItemType<T>;
