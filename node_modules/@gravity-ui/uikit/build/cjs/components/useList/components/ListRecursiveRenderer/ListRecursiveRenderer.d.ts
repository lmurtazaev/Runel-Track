import type * as React from 'react';
import type { ListItemId, ListItemType, UseListResult } from "../../types.js";
import "./ListRecursiveRenderer.css";
export interface ListItemRecursiveRendererProps<T> {
    id: ListItemId;
    list: UseListResult<T>;
    itemSchema: ListItemType<T>;
    children(id: ListItemId, index: number): React.JSX.Element;
    className?: string;
    style?: React.CSSProperties;
}
export declare function ListItemRecursiveRenderer<T>({ id, itemSchema, list, ...props }: ListItemRecursiveRendererProps<T>): import("react/jsx-runtime").JSX.Element;
