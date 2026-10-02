import * as React from 'react';
import type { QAProps } from "../types.js";
import type { TocItem as TocItemType } from "./types.js";
export interface TocProps extends QAProps {
    className?: string;
    items: TocItemType[];
    value?: string;
    onUpdate?: (value: string) => void;
    onItemClick?: (event: React.MouseEvent) => void;
}
export declare const Toc: React.ForwardRefExoticComponent<TocProps & React.RefAttributes<HTMLElement>>;
