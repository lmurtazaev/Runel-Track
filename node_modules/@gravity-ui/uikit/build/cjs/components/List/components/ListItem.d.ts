import * as React from 'react';
import type { ListItemProps } from "../types.js";
export declare const defaultRenderItem: <T extends unknown>(item: T) => string;
export declare class ListItem<T = unknown> extends React.Component<ListItemProps<T>> {
    private static publishEvent;
    node: HTMLDivElement | null;
    render(): import("react/jsx-runtime").JSX.Element;
    getNode: () => HTMLDivElement | null;
    private setRef;
    private renderSortIcon;
    private renderContent;
    private onClick;
    private onClickCapture;
    private onMouseEnter;
}
