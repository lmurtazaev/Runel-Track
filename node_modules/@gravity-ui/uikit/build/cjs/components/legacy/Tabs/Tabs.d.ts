import * as React from 'react';
import type { AriaLabelingProps, QAProps } from "../../types.js";
import { TabsItem } from "./TabsItem.js";
import type { TabsItemProps as TabsItemInternalProps } from "./TabsItem.js";
import "./Tabs.css";
export declare enum TabsDirection {
    Horizontal = "horizontal",
    Vertical = "vertical"
}
export type TabsSize = 'm' | 'l' | 'xl';
export interface TabsItemProps extends Omit<TabsItemInternalProps, 'active' | 'direction' | 'onClick'> {
}
export interface TabsProps extends AriaLabelingProps, QAProps {
    /**
     * Tabs direction
     * @deprecated Vertical tabs are deprecated
     */
    direction?: TabsDirection;
    /** Tabs size */
    size?: TabsSize;
    /** Active tab ID */
    activeTab?: string;
    /** By default if activeTab is not set, first tab will be active */
    allowNotSelected?: boolean;
    /** Tabs props list */
    items?: TabsItemProps[];
    children?: React.ReactNode;
    /** Additional CSS-class */
    className?: string;
    /** Select tab handler */
    onSelectTab?(tabId: string): void;
    /**
     * Allows to wrap `TabItem` into another component or render custom tab.
     * Ignored when tabs rendered via `children`
     */
    wrapTo?(item: TabsItemProps, node: React.ReactNode, index: number): React.ReactNode;
}
/**
 * @deprecated
 */
export declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>> & {
    Item: typeof TabsItem;
};
