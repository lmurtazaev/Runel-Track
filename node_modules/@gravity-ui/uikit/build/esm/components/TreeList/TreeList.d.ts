import * as React from 'react';
import type { TreeListProps } from "./types.js";
export declare const TreeList: <T, P extends {} = {}>({ qa, id, size, className, list, multiple, containerRef: propsContainerRef, renderItem: propsRenderItem, renderContainer, onItemClick: propsOnItemClick, mapItemDataToContentProps, }: TreeListProps<T, P>) => React.JSX.Element;
