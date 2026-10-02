import * as React from 'react';
import type { UseInteractionsReturn } from '@floating-ui/react';
import type { PopupPlacement } from "../Popup/index.js";
interface DropdownMenuProps {
    children: React.ReactNode;
    disabled?: boolean;
    popupPlacement?: PopupPlacement;
    popupStyle?: 'staircase';
}
interface MenuContext {
    isMenu: boolean;
    activeIndex: null | number;
    getItemProps: UseInteractionsReturn['getItemProps'];
    listItemsRef: {
        current: Array<HTMLElement | null>;
    };
    popupStyle: undefined | 'staircase';
}
export declare function BreadcrumbsDropdownMenu({ children, disabled, popupPlacement, popupStyle, }: DropdownMenuProps): import("react/jsx-runtime").JSX.Element;
export declare function useMenuContext(): MenuContext;
export {};
