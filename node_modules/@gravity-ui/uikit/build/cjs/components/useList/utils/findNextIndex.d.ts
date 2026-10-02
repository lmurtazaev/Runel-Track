import type { ListItemId } from "../types.js";
interface FindNextItemsProps {
    list: string[];
    index: number;
    step: number;
    disabledItemsById?: Record<ListItemId, boolean>;
}
export declare const findNextIndex: ({ list, index, step, disabledItemsById }: FindNextItemsProps) => number | undefined;
export {};
