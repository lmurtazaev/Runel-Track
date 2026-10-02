import * as React from 'react';
import type { QAProps } from "../../types.js";
import "./AccordionItem.css";
export type AccordionItemProps = {
    value?: string;
    children?: React.ReactNode;
    expanded?: boolean;
    disabled?: boolean;
    keepMounted?: boolean;
    onUpdate?: (expanded: boolean) => void;
    defaultExpanded?: boolean;
    className?: string;
    summary?: React.ReactNode;
} & QAProps;
export declare const AccordionItem: React.ForwardRefExoticComponent<{
    value?: string;
    children?: React.ReactNode;
    expanded?: boolean;
    disabled?: boolean;
    keepMounted?: boolean;
    onUpdate?: (expanded: boolean) => void;
    defaultExpanded?: boolean;
    className?: string;
    summary?: React.ReactNode;
} & QAProps & React.RefAttributes<HTMLDivElement>>;
