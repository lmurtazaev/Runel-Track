import type { ListItemId } from "../types.js";
export declare const getGroupItemId: (index: string | number, parentId?: string) => ListItemId;
export declare const parseGroupItemId: (id: ListItemId) => string[];
