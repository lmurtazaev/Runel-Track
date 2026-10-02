'use client';
import { createElement as _createElement } from "react";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { Gear, Grip, Lock } from '@gravity-ui/icons';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useControlledState, useUniqId } from "../../../../../hooks/index.js";
import { createOnKeyDownHandler } from "../../../../../hooks/useActionHandlers/useActionHandlers.js";
import { Button } from "../../../../Button/index.js";
import { Icon } from "../../../../Icon/index.js";
import { Text } from "../../../../Text/index.js";
import { TreeSelect } from "../../../../TreeSelect/TreeSelect.js";
import { TextInput } from "../../../../controls/TextInput/index.js";
import { Flex } from "../../../../layout/Flex/Flex.js";
import { ListContainerView, ListItemView, useListFilter } from "../../../../useList/index.js";
import { block } from "../../../../utils/cn.js";
import i18n from "./i18n/index.js";
import "./TableColumnSetup.css";
const b = block('inner-table-column-setup');
const controlsCn = b('controls');
const filterInputCn = b('filter-input');
const emptyPlaceholderCn = b('empty-placeholder');
const reorderArray = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};
const prepareStickyState = (itemsById, visibleFlattenIds) => {
    let lastStickyStartIdx = 0;
    for (; lastStickyStartIdx !== visibleFlattenIds.length; lastStickyStartIdx++) {
        const visibleFlattenId = visibleFlattenIds[lastStickyStartIdx];
        const item = itemsById[visibleFlattenId];
        if (item?.sticky !== 'left' && item?.sticky !== 'start') {
            break;
        }
    }
    let firstStickyEndIdx = visibleFlattenIds.length;
    for (; firstStickyEndIdx !== 0; firstStickyEndIdx--) {
        const visibleFlattenId = visibleFlattenIds[firstStickyEndIdx - 1];
        const item = itemsById[visibleFlattenId];
        if (item?.sticky !== 'right' && item?.sticky !== 'end') {
            break;
        }
    }
    return {
        stickyStartItemIdList: visibleFlattenIds.slice(0, lastStickyStartIdx),
        sortableItemIdList: visibleFlattenIds.slice(lastStickyStartIdx, firstStickyEndIdx),
        stickyEndItemIdList: visibleFlattenIds.slice(firstStickyEndIdx),
    };
};
const prepareValue = (tableColumnItems) => {
    const selectedIds = [];
    tableColumnItems.forEach(({ id, isSelected }) => {
        if (isSelected) {
            selectedIds.push(id);
        }
    });
    return selectedIds;
};
const RENDER_DRAG_DISABLED_CONTAINER_PROPS = { isDragDisabled: true };
const useDndRenderContainer = ({ onDragEnd, renderControls }) => {
    const uniqId = useUniqId();
    const dndRenderContainer = ({ renderItem, list, containerRef, id, className, }) => {
        const renderDndActiveItem = (provided, snapshot, rubric) => {
            const renderContainerProps = {
                provided,
                snapshot,
            };
            return renderItem(list.structure.visibleFlattenIds[rubric.source.index], rubric.source.index, renderContainerProps);
        };
        const { stickyStartItemIdList, sortableItemIdList, stickyEndItemIdList } = prepareStickyState(list.structure.itemsById, list.structure.visibleFlattenIds);
        const stickyStartItemList = stickyStartItemIdList.map((visibleFlattenId, idx) => {
            return renderItem(visibleFlattenId, idx, RENDER_DRAG_DISABLED_CONTAINER_PROPS);
        });
        const sortableItemList = sortableItemIdList.map((visibleFlattenId, idx) => {
            return renderItem(visibleFlattenId, idx + stickyStartItemIdList.length);
        });
        const stickyEndItemList = stickyEndItemIdList.map((visibleFlattenId, idx) => {
            return renderItem(visibleFlattenId, stickyStartItemList.length + sortableItemList.length + idx, RENDER_DRAG_DISABLED_CONTAINER_PROPS);
        });
        return (_jsxs(React.Fragment, { children: [_jsxs(ListContainerView
                /*
                 *  TODO: Remove casting in React 19 (https://github.com/gravity-ui/uikit/issues/2537)
                 */
                , { 
                    /*
                     *  TODO: Remove casting in React 19 (https://github.com/gravity-ui/uikit/issues/2537)
                     */
                    ref: containerRef, id: id, className: className, children: [stickyStartItemList, _jsx(DragDropContext, { onDragEnd: onDragEnd, children: _jsx(Droppable, { droppableId: uniqId, renderClone: renderDndActiveItem, children: (droppableProvided) => {
                                    return (_jsxs("div", { ...droppableProvided.droppableProps, ref: droppableProvided.innerRef, children: [sortableItemList, droppableProvided.placeholder] }));
                                } }) }), stickyEndItemList] }), _jsx("div", { className: controlsCn, children: renderControls() })] }));
    };
    return dndRenderContainer;
};
const useDndRenderItem = (sortable) => {
    const renderDndItem = ({ data: item, props, index, renderContainerProps, }) => {
        const isDragDisabled = sortable === false || renderContainerProps?.isDragDisabled === true;
        const endSlot = isDragDisabled ? undefined : _jsx(Icon, { data: Grip, size: 16 });
        const startSlot = item.isRequired ? _jsx(Icon, { data: Lock }) : undefined;
        const selected = item.isRequired ? false : props.selected;
        const commonProps = {
            ...props,
            selected,
            selectionViewType: item.isRequired ? 'single' : 'multiple',
            content: {
                ...props.content,
                startSlot,
                endSlot,
            },
        };
        if (isDragDisabled) {
            return _createElement(ListItemView, { ...commonProps, key: commonProps.id });
        }
        const renderItem = (provided, snapshot) => (_jsx(ListItemView, { ...commonProps, ...provided.draggableProps, ...provided.dragHandleProps, ref: provided.innerRef, dragging: snapshot.isDragging }));
        if (renderContainerProps?.provided && renderContainerProps.snapshot) {
            return renderItem(renderContainerProps.provided, renderContainerProps.snapshot);
        }
        return (_jsx(Draggable, { draggableId: props.id, index: index, isDragDisabled: isDragDisabled, children: renderItem }, `item-key-${props.id}`));
    };
    return renderDndItem;
};
const mapItemDataToContentProps = (item) => {
    return {
        title: item.title,
    };
};
const defaultFilterSettingsFn = (value, item) => {
    return typeof item.title === 'string'
        ? item.title.toLowerCase().includes(value.trim().toLowerCase())
        : true;
};
const useEmptyRenderContainer = (placeholder) => {
    const emptyRenderContainer = () => _jsx(Text, { className: emptyPlaceholderCn, children: placeholder });
    return emptyRenderContainer;
};
export const TableColumnSetup = (props) => {
    const { renderSwitcher, popupWidth, popupPlacement, items: propsItems, onUpdate: propsOnUpdate, sortable, renderControls, className, defaultItems = propsItems, showResetButton: propsShowResetButton, filterable, filterPlaceholder, filterEmptyMessage, filterSettings = defaultFilterSettingsFn, hideApplyButton, } = props;
    const [open, setOpen] = React.useState(false);
    const [sortingEnabled, setSortingEnabled] = React.useState(sortable);
    const [prevSortingEnabled, setPrevSortingEnabled] = React.useState(sortable);
    if (sortable !== prevSortingEnabled) {
        setPrevSortingEnabled(sortable);
        setSortingEnabled(sortable);
    }
    const [items, setItems] = useControlledState(hideApplyButton ? propsItems : undefined, propsItems, hideApplyButton ? propsOnUpdate : undefined);
    // Track changes to propsItems in manual mode
    const [prevPropsItems, setPrevPropsItems] = React.useState(propsItems);
    if (propsItems !== prevPropsItems) {
        setPrevPropsItems(propsItems);
        if (!hideApplyButton) {
            setItems(propsItems);
        }
    }
    const { t } = i18n.useTranslation();
    const filterState = useListFilter({ items, filterItem: filterSettings, debounceTimeout: 0 });
    const onApply = () => {
        const newSettings = items.map(({ id, isSelected }) => ({ id, isSelected }));
        propsOnUpdate(newSettings);
        onOpenChange(false);
    };
    const DefaultApplyButton = () => (_jsx(Button, { view: "action", width: "max", onClick: onApply, children: t('button_apply') }));
    const onDragEnd = ({ destination, source }) => {
        if (destination?.index !== undefined && destination?.index !== source.index) {
            const reorderedItems = reorderArray(items, source.index, destination.index);
            setItems(reorderedItems);
        }
    };
    const showResetButton = typeof propsShowResetButton === 'function'
        ? propsShowResetButton(items)
        : propsShowResetButton;
    const dndRenderContainer = useDndRenderContainer({
        onDragEnd,
        renderControls: () => renderControls ? (renderControls({ DefaultApplyButton, onApply })) : (_jsxs(Flex, { gapRow: 1, direction: "column", className: controlsCn, children: [showResetButton && (_jsx(Button, { onClick: () => {
                        if (hideApplyButton) {
                            propsOnUpdate(defaultItems);
                        }
                        setItems(defaultItems);
                    }, width: "max", children: t('button_reset') })), !hideApplyButton && _jsx(DefaultApplyButton, {})] })),
    });
    const dndRenderItem = useDndRenderItem(sortingEnabled);
    const renderControl = ({ toggleOpen }) => {
        const onKeyDown = createOnKeyDownHandler(toggleOpen);
        return (renderSwitcher?.({ onClick: toggleOpen, onKeyDown }) || (_jsxs(Button, { onClick: toggleOpen, onKeyDown: onKeyDown, children: [_jsx(Icon, { data: Gear }), t('button_switcher')] })));
    };
    const onOpenChange = (open) => {
        setOpen(open);
        if (open === false) {
            setItems(propsItems);
            setSortingEnabled(sortable);
            filterState.reset();
        }
    };
    const onUpdate = (selectedItemsIds) => {
        const newItems = items.map((item) => ({
            ...item,
            isSelected: item.isRequired || selectedItemsIds.includes(item.id),
        }));
        setItems(newItems);
    };
    const value = React.useMemo(() => prepareValue(items), [items]);
    const emptyRenderContainer = useEmptyRenderContainer(filterEmptyMessage);
    const onFilterValueUpdate = (value) => {
        filterState.onFilterUpdate(value);
        setSortingEnabled(!value.length);
    };
    const slotBeforeListBody = filterable ? (_jsx(TextInput, { size: "m", view: "clear", placeholder: filterPlaceholder, value: filterState.filter, className: filterInputCn, onUpdate: onFilterValueUpdate, hasClear: true })) : null;
    const renderContainer = filterState.filter && !filterState.items.length ? emptyRenderContainer : dndRenderContainer;
    return (_jsx(TreeSelect, { className: b(null, className), mapItemDataToContentProps: mapItemDataToContentProps, multiple: true, size: "l", open: open, value: value, items: filterState.filter ? filterState.items : items, onUpdate: onUpdate, popupWidth: popupWidth, onOpenChange: onOpenChange, placement: popupPlacement, slotBeforeListBody: slotBeforeListBody, renderContainer: renderContainer, renderControl: renderControl, renderItem: dndRenderItem }));
};
//# sourceMappingURL=TableColumnSetup.js.map
