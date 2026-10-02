import * as React from 'react';
import type { DOMProps } from "../../types.js";
import "./ListItemView.css";
export interface ListItemViewProps<T extends React.ElementType = 'div'> extends DOMProps {
    id?: string;
    children: React.ReactNode;
    size?: 's' | 'm' | 'l' | 'xl';
    selected?: boolean;
    active?: boolean;
    hovered?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    disabled?: boolean;
    selectionStyle?: 'check' | 'highlight' | 'none';
    collapsible?: boolean;
    collapsed?: boolean;
    onCollapseChange?: (collapsed: boolean) => void;
    draggable?: boolean;
    nestedLevel?: number;
    startContent?: React.ReactNode;
    description?: React.ReactNode;
    endContent?: React.ReactNode;
    isContainer?: boolean;
    component?: T;
    componentProps?: React.ComponentProps<T>;
}
export declare const ListItemView: <T extends React.ElementType = "div">(props: ListItemViewProps<T> & Omit<React.ComponentPropsWithRef<T>, keyof ListItemViewProps<T>>) => React.ReactElement;
export declare function ListItemViewComponent(props: ListItemViewProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof ListItemViewProps>, ref: React.ForwardedRef<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
