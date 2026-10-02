import * as React from 'react';
import type { PopupPlacement } from "../Popup/index.js";
import type { AriaLabelingProps, DOMProps, Key, QAProps } from "../types.js";
import { BreadcrumbsItem } from "./BreadcrumbsItem.js";
import "./Breadcrumbs.css";
export interface BreadcrumbsProps extends DOMProps, AriaLabelingProps, QAProps {
    id?: string;
    showRoot?: boolean;
    separator?: React.ReactNode;
    maxItems?: number;
    popupStyle?: 'staircase';
    popupPlacement?: PopupPlacement;
    itemComponent?: React.ElementType;
    children: React.ReactNode;
    disabled?: boolean;
    onAction?: (key: Key) => void;
    endContent?: React.ReactNode;
}
export declare const Breadcrumbs: BreadcrumbsComponent;
type BreadcrumbsComponent = React.FunctionComponent<BreadcrumbsProps & {
    ref?: React.Ref<HTMLElement>;
}> & {
    Item: typeof BreadcrumbsItem;
};
export {};
