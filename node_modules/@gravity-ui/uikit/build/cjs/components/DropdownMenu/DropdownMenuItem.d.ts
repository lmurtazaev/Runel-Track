import * as React from 'react';
import type { PopupProps } from "../Popup/index.js";
import type { DropdownMenuListItem, DropdownMenuSize } from "./types.js";
export type DropdownMenuItemProps<T> = Omit<DropdownMenuListItem<T>, 'path'> & {
    popupProps?: Partial<PopupProps>;
    closeMenu?: () => void;
    children?: React.ReactNode;
    path?: number[];
    size?: DropdownMenuSize;
};
export declare const DropdownMenuItem: <T>({ text, action, items: subMenuItems, popupProps, closeMenu, children, path, size, ...props }: DropdownMenuItemProps<T>) => import("react/jsx-runtime").JSX.Element;
