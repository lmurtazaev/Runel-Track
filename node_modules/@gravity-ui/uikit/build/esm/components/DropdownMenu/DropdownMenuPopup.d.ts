import * as React from 'react';
import type { MenuProps } from "../Menu/index.js";
import type { PopupProps } from "../Popup/index.js";
import type { DropdownMenuListItem, DropdownMenuSize } from "./types.js";
export type DropdownMenuPopupProps<T> = {
    items: DropdownMenuListItem<T>[];
    open: boolean;
    anchorRef: React.RefObject<HTMLDivElement | null>;
    onClose?: () => void;
    size?: DropdownMenuSize;
    menuProps?: MenuProps;
    children?: React.ReactNode;
    popupProps?: Partial<PopupProps>;
    path?: number[];
};
export declare const DropdownMenuPopup: <T>({ items, open, anchorRef, onClose, size, menuProps, children, popupProps, path, }: DropdownMenuPopupProps<T>) => import("react/jsx-runtime").JSX.Element;
