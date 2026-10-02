import * as React from 'react';
export type UseListNavigationProps<ItemType, AnchorType> = {
    items: ItemType[];
    skip?: (item: ItemType) => boolean;
    pageSize?: number;
    processHomeKey?: boolean;
    processEndKey?: boolean;
    disabled?: boolean;
    initialValue?: number;
    anchorRef?: React.RefObject<AnchorType | null>;
    onAnchorKeyDown?: (activeItemIndex: number, event: KeyboardEvent) => void | boolean;
};
export type UseListNavigationResult = {
    activeItemIndex: number;
    setActiveItemIndex: React.Dispatch<React.SetStateAction<number>>;
    reset: () => void;
};
export declare function useListNavigation<ItemType, AnchorType extends HTMLElement>({ items, skip, pageSize, processHomeKey, processEndKey, anchorRef, disabled, initialValue, onAnchorKeyDown, }: UseListNavigationProps<ItemType, AnchorType>): UseListNavigationResult;
