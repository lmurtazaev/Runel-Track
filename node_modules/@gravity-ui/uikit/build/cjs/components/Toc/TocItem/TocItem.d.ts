import type * as React from 'react';
import type { TocItem as TocItemType } from "../types.js";
import "./TocItem.css";
export interface TocItemProps extends TocItemType {
    childItem?: boolean;
    active?: boolean;
    onClick?: (event: React.MouseEvent) => void;
    depth: number;
}
export declare const TocItem: (props: TocItemProps) => import("react/jsx-runtime").JSX.Element;
