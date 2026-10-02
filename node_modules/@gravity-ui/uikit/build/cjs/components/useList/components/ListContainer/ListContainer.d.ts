import type * as React from 'react';
import type { ListItemId, UseListResult } from "../../types.js";
import type { ListContainerViewProps } from "../ListContainerView/ListContainerView.js";
export type ListContainerProps<T, P extends {} = {}> = Omit<ListContainerViewProps, 'children'> & {
    list: UseListResult<T>;
    containerRef?: React.RefObject<HTMLDivElement | null>;
    renderItem(id: ListItemId, index: number, 
    /**
     * Ability to transfer props from an overridden container render
     */
    renderContainerProps?: P): React.JSX.Element;
};
export declare function ListContainer<T, P extends {} = {}>({ containerRef, renderItem, list, ...props }: ListContainerProps<T, P>): import("react/jsx-runtime").JSX.Element;
