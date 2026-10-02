import * as React from 'react';
import type { AriaLabelingProps, DOMProps, QAProps } from "../types.js";
import { MenuGroup } from "./MenuGroup.js";
import type { MenuGroupProps } from "./MenuGroup.js";
import { MenuItem } from "./MenuItem.js";
import type { MenuItemProps } from "./MenuItem.js";
import "./Menu.css";
export type MenuSize = 's' | 'm' | 'l' | 'xl';
export interface MenuProps extends AriaLabelingProps, DOMProps, QAProps {
    size?: MenuSize;
    children?: React.ReactNode;
}
export type { MenuItemProps, MenuGroupProps };
interface MenuComponent extends React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<HTMLUListElement>> {
    Item: typeof MenuItem;
    Group: typeof MenuGroup;
}
export declare const Menu: MenuComponent;
