import * as React from 'react';
import type { ButtonButtonProps } from "../../Button/index.js";
export interface MenuTriggerProps extends ButtonButtonProps {
    icon?: 'horizontal' | 'vertical';
}
export declare const MenuTrigger: React.ForwardRefExoticComponent<MenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
