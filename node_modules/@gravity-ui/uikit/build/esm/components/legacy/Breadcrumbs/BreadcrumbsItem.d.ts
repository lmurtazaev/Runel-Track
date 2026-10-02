import * as React from 'react';
import type { BreadcrumbsItem as IBreadcrumbsItem } from "./Breadcrumbs.js";
import type { RenderBreadcrumbsItem, RenderBreadcrumbsItemContent, RenderBreadcrumbsRootContent } from "./types.js";
export interface Props<T extends IBreadcrumbsItem = IBreadcrumbsItem> {
    item: T;
    isCurrent: boolean;
    isPrevCurrent: boolean;
    renderItemContent?: RenderBreadcrumbsItemContent<T> | RenderBreadcrumbsRootContent<T>;
    renderItem?: RenderBreadcrumbsItem<T>;
}
declare function Item<T extends IBreadcrumbsItem = IBreadcrumbsItem>({ item, isCurrent, isPrevCurrent, renderItemContent, renderItem, }: Props<T>): string | number | boolean | Iterable<React.ReactNode> | import("react/jsx-runtime").JSX.Element | null | undefined;
export declare const BreadcrumbsItem: typeof Item & {
    displayName: string;
};
export {};
