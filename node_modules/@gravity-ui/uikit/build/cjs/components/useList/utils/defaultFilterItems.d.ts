import type { ListItemType } from "../types.js";
export declare function defaultFilterItems<T>(items: ListItemType<T>[], filterFn: (data: T) => boolean): ListItemType<T>[];
