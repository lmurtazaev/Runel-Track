import * as React from 'react';
import type { DroppableProvided } from '@hello-pangea/dnd';
import type { ListItem } from "./ListItem.js";
export type SimpleContainerProps = React.PropsWithChildren<{
    itemCount: number;
    provided?: DroppableProvided;
    onScrollToItem?: (node: HTMLElement) => boolean;
    role: React.AriaRole;
    id: string;
}>;
type RefsList = Record<number, React.RefObject<ListItem | null>>;
export type SimpleContainerState = {
    refsList: RefsList;
};
export declare class SimpleContainer extends React.Component<SimpleContainerProps, SimpleContainerState> {
    static getDerivedStateFromProps({ itemCount }: SimpleContainerProps, prevState: SimpleContainerState): SimpleContainerState;
    node: HTMLDivElement | null;
    constructor(props: SimpleContainerProps);
    render(): import("react/jsx-runtime").JSX.Element;
    scrollToItem(index: number): void;
    private setRef;
}
export {};
