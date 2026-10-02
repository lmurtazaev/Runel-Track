import * as React from 'react';
import type { PopupPlacement } from "../../Popup/index.js";
import type { QAProps } from "../../types.js";
import type { Props as BreadcrumbsItemProps } from "./BreadcrumbsItem.js";
import type { RenderBreadcrumbsItem, RenderBreadcrumbsItemContent, RenderBreadcrumbsRootContent } from "./types.js";
import "./Breadcrumbs.css";
type BaseBreadcrumbsItem = {
    text: string;
    items?: BreadcrumbsItem[];
    title?: string;
};
export type BreadcrumbsLinkItem = {
    href: string;
    action?: (event: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent) => void;
} & BaseBreadcrumbsItem;
export type BreadcrumbsButtonItem = {
    href?: undefined;
    action: (event: React.MouseEvent<HTMLElement, MouseEvent> | KeyboardEvent) => void;
} & BaseBreadcrumbsItem;
export type BreadcrumbsItem = BreadcrumbsLinkItem | BreadcrumbsButtonItem;
export interface BreadcrumbsProps<T extends BreadcrumbsItem = BreadcrumbsItem> extends QAProps {
    items: T[];
    className?: string;
    renderRootContent?: RenderBreadcrumbsRootContent<T>;
    renderItemContent?: RenderBreadcrumbsItemContent<T>;
    renderItemDivider?: () => React.ReactNode;
    renderItem?: RenderBreadcrumbsItem<T>;
    lastDisplayedItemsCount: LastDisplayedItemsCount;
    firstDisplayedItemsCount: FirstDisplayedItemsCount;
    popupStyle?: 'staircase';
    popupPlacement?: PopupPlacement;
}
interface BreadcrumbsState<T extends BreadcrumbsItem> {
    calculated: boolean;
    rootItem: T | undefined;
    visibleItems: T[];
    hiddenItems: T[];
    allItems: T[];
}
export declare enum LastDisplayedItemsCount {
    One = 1,
    Two = 2
}
export declare enum FirstDisplayedItemsCount {
    Zero = 0,
    One = 1
}
/**
 * @deprecated
 */
export declare class Breadcrumbs<T extends BreadcrumbsItem = BreadcrumbsItem> extends React.Component<BreadcrumbsProps<T>, BreadcrumbsState<T>> {
    static defaultProps: {
        popupPlacement: string[];
    };
    static prepareInitialState<T extends BreadcrumbsItem>(props: BreadcrumbsProps<T>): {
        calculated: boolean;
        rootItem: T | undefined;
        visibleItems: T[];
        hiddenItems: never[];
        allItems: T[];
    };
    static getDerivedStateFromProps<T extends BreadcrumbsItem>(props: BreadcrumbsProps<T>, state: BreadcrumbsState<T>): {
        calculated: boolean;
        rootItem: T | undefined;
        visibleItems: T[];
        hiddenItems: never[];
        allItems: T[];
    } | null;
    private container;
    private resizeObserver?;
    constructor(props: BreadcrumbsProps<T>);
    componentDidMount(): void;
    componentDidUpdate(prevProps: BreadcrumbsProps<T>): void;
    componentWillUnmount(): void;
    render(): import("react/jsx-runtime").JSX.Element;
    renderItem(item: T, isCurrent: boolean, isPrevCurrent: boolean, renderItemContent?: BreadcrumbsItemProps<T>['renderItemContent']): import("react/jsx-runtime").JSX.Element;
    renderItemDivider(): import("react/jsx-runtime").JSX.Element;
    renderRootItem(): import("react/jsx-runtime").JSX.Element | null;
    renderVisibleItems(): import("react/jsx-runtime").JSX.Element[];
    renderMoreItem(): import("react/jsx-runtime").JSX.Element | null;
    private recalculate;
    private handleResize;
}
export {};
