'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { useUniqId } from "../../hooks/index.js";
import { ListContainer, ListItemView, getItemRenderState, getListItemClickHandler, useListKeydown, } from "../useList/index.js";
import { block } from "../utils/cn.js";
const b = block('tree-list');
export const TreeList = ({ qa, id, size = 'm', className, list, multiple, containerRef: propsContainerRef, renderItem: propsRenderItem, renderContainer = ListContainer, onItemClick: propsOnItemClick, mapItemDataToContentProps, }) => {
    const uniqId = useUniqId();
    const treeListId = id ?? uniqId;
    const containerRefLocal = React.useRef(null);
    const containerRef = propsContainerRef ?? containerRefLocal;
    const onItemClick = React.useMemo(() => {
        if (propsOnItemClick === null) {
            return undefined;
        }
        const handler = (arg, e) => {
            const payload = { id: arg.id, list };
            if (propsOnItemClick) {
                propsOnItemClick?.(payload, e);
            }
            else {
                const baseOnClick = getListItemClickHandler({ list, multiple });
                baseOnClick(payload, e);
            }
        };
        return handler;
    }, [propsOnItemClick, list, multiple]);
    useListKeydown({
        containerRef,
        onItemClick,
        list,
    });
    const renderItem = (itemId, index, renderContainerProps) => {
        const renderState = getItemRenderState({
            qa,
            id: itemId,
            size,
            multiple,
            mapItemDataToContentProps,
            onItemClick,
            list,
        });
        if (propsRenderItem) {
            return propsRenderItem({
                id: itemId,
                data: renderState.data,
                props: renderState.props,
                context: renderState.context,
                index,
                renderContainerProps,
                list,
            });
        }
        return _jsx(ListItemView, { ...renderState.props, ...renderContainerProps });
    };
    // not JSX decl here is from weird `@hello-pangea/dnd` render bug
    return renderContainer({
        qa,
        id: `list-${treeListId}`,
        size,
        containerRef,
        className: b(null, className),
        list,
        renderItem,
    });
};
//# sourceMappingURL=TreeList.js.map
