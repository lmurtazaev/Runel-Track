import * as React from 'react';
import type { QAProps } from "../../../types.js";
import type { ListItemId, ListItemSize, ListItemViewContentType } from "../../types.js";
export interface ListItemViewCommonProps<T extends React.ElementType = 'li'> extends QAProps {
    /**
     * @default `m`
     */
    size?: ListItemSize;
    /**
     * `[${LIST_ITEM_DATA_ATR}="${id}"]` data attribute to find element.
     * For example for scroll to
     */
    id: ListItemId;
    /**
     * Note: if passed and `disabled` option is `true` click will not be appear
     */
    onClick?: React.ComponentPropsWithoutRef<T>['onClick'];
    selected?: boolean;
    disabled?: boolean;
    active?: boolean;
    selectionViewType?: 'single' | 'multiple';
    content: ListItemViewContentType;
}
export interface ListItemViewProps<T extends React.ElementType = 'li'> extends Omit<ListItemViewCommonProps<T>, 'content'> {
    /**
     * Ability to override default html tag
     */
    as?: T;
    height?: number;
    /**
     * By default hovered elements has active styles. You can disable this behavior
     */
    activeOnHover?: boolean;
    style?: React.CSSProperties;
    className?: string;
    role?: React.AriaRole;
    /**
     * Add active styles and change selection behavior during dnd is performing
     */
    dragging?: boolean;
    content: ListItemViewContentType | React.ReactNode;
}
type ListItemViewRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];
type ListItemViewPropsWithTypedAttrs<T extends React.ElementType> = ListItemViewProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ListItemViewProps<T>>;
export declare const ListItemView: <C extends React.ElementType = "li">({ ref, ...props }: ListItemViewPropsWithTypedAttrs<C> & {
    ref?: ListItemViewRef<C>;
}) => React.ReactElement;
export {};
