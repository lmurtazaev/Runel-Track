import * as React from 'react';
import type { MenuSize } from "./types.js";
export interface MenuContextProps {
    size: MenuSize;
    activeIndex: number | null;
    floatingParentId: string | null;
    getItemProps: (userProps?: React.HTMLProps<HTMLElement>) => Record<string, unknown>;
    inline: boolean;
}
export declare const MenuContext: React.Context<MenuContextProps | null>;
