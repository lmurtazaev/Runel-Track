import * as React from 'react';
import type { LabelProps } from "../../Label/index.js";
import type { QAProps } from "../../types.js";
type ExtraProps = Omit<React.HTMLProps<HTMLDivElement>, 'role' | 'aria-selected' | 'aria-disabled' | 'tabIndex' | 'className' | 'title' | 'onClick' | 'onKeyDown'>;
export interface TabsItemProps extends QAProps {
    id: string;
    className?: string;
    title: string | React.ReactNode;
    meta?: string;
    hint?: string;
    active?: boolean;
    disabled?: boolean;
    hasOverflow?: boolean;
    icon?: React.ReactNode;
    counter?: number | string;
    label?: {
        content: React.ReactNode;
        theme?: LabelProps['theme'];
    };
    extraProps?: ExtraProps;
    onClick(tabId: string): void;
}
export declare function TabsItem({ id, className, title, meta, hint, icon, counter, label, active, disabled, hasOverflow, extraProps, onClick, qa, }: TabsItemProps): import("react/jsx-runtime").JSX.Element;
export declare namespace TabsItem {
    var displayName: string;
}
export {};
