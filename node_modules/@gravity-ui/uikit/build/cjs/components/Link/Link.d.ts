import * as React from 'react';
import type { DOMProps, QAProps } from "../types.js";
import "./Link.css";
export type LinkView = 'normal' | 'primary' | 'secondary';
export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'style'>, QAProps, DOMProps {
    view?: LinkView;
    visitable?: boolean;
    underline?: boolean;
    href: string;
    children?: React.ReactNode;
    /**
     * @deprecated Use additional props at the root
     */
    extraProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
}
export declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
