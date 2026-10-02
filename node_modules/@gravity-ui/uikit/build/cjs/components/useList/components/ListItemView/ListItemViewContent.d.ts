import type * as React from 'react';
import type { ListItemViewContentType } from "../../types.js";
export declare const isListItemContentPropsGuard: (props: ListItemViewContentType | React.ReactNode) => props is ListItemViewContentType;
interface ListItemViewContentProps extends ListItemViewContentType {
    selected?: boolean;
    disabled?: boolean;
    /**
     * Show selected icon if selected and reserve space for this icon
     */
    hasSelectionIcon: boolean;
}
export declare const ListItemViewContent: ({ startSlot, subtitle, endSlot, disabled, hasSelectionIcon, isGroup, indentation, expanded, selected, title, expandIconPlacement, renderExpandIcon: RenderExpandIcon, }: ListItemViewContentProps) => import("react/jsx-runtime").JSX.Element;
export {};
