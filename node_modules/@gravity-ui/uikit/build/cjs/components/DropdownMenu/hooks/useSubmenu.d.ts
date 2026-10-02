import type { DropdownMenuListItem } from "../types.js";
export type UseSubmenuProps<T> = {
    items?: DropdownMenuListItem<T>[];
    path?: number[];
};
export declare function useSubmenu<T>({ items, path }: UseSubmenuProps<T>): {
    hasSubmenu: boolean;
    isSubmenuOpen: boolean;
    openSubmenu: () => void;
    closeSubmenu: () => void;
};
