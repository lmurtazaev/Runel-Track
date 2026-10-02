import * as React from 'react';
export interface MenuItemContextProps {
    setHasFocusInside: (hasFocusInside: boolean) => void;
}
export declare const MenuItemContext: React.Context<MenuItemContextProps | null>;
