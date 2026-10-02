import * as React from 'react';
export type DropdownMenuNavigationContextType = {
    activeMenuPath: number[];
    setActiveMenuPath: (path: number[]) => void;
    anchorRef: React.RefObject<HTMLDivElement | null>;
};
export declare const DropdownMenuNavigationContext: React.Context<DropdownMenuNavigationContextType>;
export type DropdownMenuNavigationContextProviderProps = {
    anchorRef: React.RefObject<HTMLDivElement | null>;
    children: React.ReactNode;
    disabled: boolean;
};
export declare const DropdownMenuNavigationContextProvider: ({ anchorRef, children, disabled, }: DropdownMenuNavigationContextProviderProps) => import("react/jsx-runtime").JSX.Element;
