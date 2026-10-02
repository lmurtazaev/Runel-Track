import * as React from 'react';
import type { DOMProps, QAProps } from "../types.js";
export interface MenuItemProps extends DOMProps, QAProps {
    iconStart?: React.ReactNode;
    iconEnd?: React.ReactNode;
    title?: string;
    disabled?: boolean;
    active?: boolean;
    selected?: boolean;
    href?: string;
    target?: string;
    contentClassName?: string;
    rel?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement | HTMLAnchorElement>;
    theme?: 'normal' | 'danger';
    extraProps?: React.HTMLAttributes<HTMLDivElement> | React.AnchorHTMLAttributes<HTMLAnchorElement>;
    children?: React.ReactNode;
}
export declare const MenuItem: React.ForwardRefExoticComponent<MenuItemProps & React.RefAttributes<HTMLElement>>;
