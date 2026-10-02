import * as React from 'react';
import type { DOMProps, QAProps } from "../types.js";
export interface MenuGroupProps extends DOMProps, QAProps {
    label?: string;
    children?: React.ReactNode;
}
export declare const MenuGroup: React.ForwardRefExoticComponent<MenuGroupProps & React.RefAttributes<HTMLLIElement>>;
