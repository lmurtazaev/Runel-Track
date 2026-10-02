'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeList = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const hooks_1 = require("../../hooks/index.js");
const useList_1 = require("../useList/index.js");
const cn_1 = require("../utils/cn.js");
const b = (0, cn_1.block)('tree-list');
const TreeList = ({ qa, id, size = 'm', className, list, multiple, containerRef: propsContainerRef, renderItem: propsRenderItem, renderContainer = useList_1.ListContainer, onItemClick: propsOnItemClick, mapItemDataToContentProps, }) => {
    const uniqId = (0, hooks_1.useUniqId)();
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
                const baseOnClick = (0, useList_1.getListItemClickHandler)({ list, multiple });
                baseOnClick(payload, e);
            }
        };
        return handler;
    }, [propsOnItemClick, list, multiple]);
    (0, useList_1.useListKeydown)({
        containerRef,
        onItemClick,
        list,
    });
    const renderItem = (itemId, index, renderContainerProps) => {
        const renderState = (0, useList_1.getItemRenderState)({
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
        return (0, jsx_runtime_1.jsx)(useList_1.ListItemView, { ...renderState.props, ...renderContainerProps });
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
exports.TreeList = TreeList;
//# sourceMappingURL=TreeList.js.map
