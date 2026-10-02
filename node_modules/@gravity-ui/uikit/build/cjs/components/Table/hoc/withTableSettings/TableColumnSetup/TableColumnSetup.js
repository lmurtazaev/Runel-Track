'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableColumnSetup = void 0;
const tslib_1 = require("tslib");
const react_1 = require("react");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const icons_1 = require("@gravity-ui/icons");
const dnd_1 = require("@hello-pangea/dnd");
const hooks_1 = require("../../../../../hooks/index.js");
const useActionHandlers_1 = require("../../../../../hooks/useActionHandlers/useActionHandlers.js");
const Button_1 = require("../../../../Button/index.js");
const Icon_1 = require("../../../../Icon/index.js");
const Text_1 = require("../../../../Text/index.js");
const TreeSelect_1 = require("../../../../TreeSelect/TreeSelect.js");
const TextInput_1 = require("../../../../controls/TextInput/index.js");
const Flex_1 = require("../../../../layout/Flex/Flex.js");
const useList_1 = require("../../../../useList/index.js");
const cn_1 = require("../../../../utils/cn.js");
const i18n_1 = tslib_1.__importDefault(require("./i18n/index.js"));
require("./TableColumnSetup.css");
const b = (0, cn_1.block)('inner-table-column-setup');
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
    const uniqId = (0, hooks_1.useUniqId)();
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
        return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsxs)(useList_1.ListContainerView
                /*
                 *  TODO: Remove casting in React 19 (https://github.com/gravity-ui/uikit/issues/2537)
                 */
                , { 
                    /*
                     *  TODO: Remove casting in React 19 (https://github.com/gravity-ui/uikit/issues/2537)
                     */
                    ref: containerRef, id: id, className: className, children: [stickyStartItemList, (0, jsx_runtime_1.jsx)(dnd_1.DragDropContext, { onDragEnd: onDragEnd, children: (0, jsx_runtime_1.jsx)(dnd_1.Droppable, { droppableId: uniqId, renderClone: renderDndActiveItem, children: (droppableProvided) => {
                                    return ((0, jsx_runtime_1.jsxs)("div", { ...droppableProvided.droppableProps, ref: droppableProvided.innerRef, children: [sortableItemList, droppableProvided.placeholder] }));
                                } }) }), stickyEndItemList] }), (0, jsx_runtime_1.jsx)("div", { className: controlsCn, children: renderControls() })] }));
    };
    return dndRenderContainer;
};
const useDndRenderItem = (sortable) => {
    const renderDndItem = ({ data: item, props, index, renderContainerProps, }) => {
        const isDragDisabled = sortable === false || renderContainerProps?.isDragDisabled === true;
        const endSlot = isDragDisabled ? undefined : (0, jsx_runtime_1.jsx)(Icon_1.Icon, { data: icons_1.Grip, size: 16 });
        const startSlot = item.isRequired ? (0, jsx_runtime_1.jsx)(Icon_1.Icon, { data: icons_1.Lock }) : undefined;
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
            return (0, react_1.createElement)(useList_1.ListItemView, { ...commonProps, key: commonProps.id });
        }
        const renderItem = (provided, snapshot) => ((0, jsx_runtime_1.jsx)(useList_1.ListItemView, { ...commonProps, ...provided.draggableProps, ...provided.dragHandleProps, ref: provided.innerRef, dragging: snapshot.isDragging }));
        if (renderContainerProps?.provided && renderContainerProps.snapshot) {
            return renderItem(renderContainerProps.provided, renderContainerProps.snapshot);
        }
        return ((0, jsx_runtime_1.jsx)(dnd_1.Draggable, { draggableId: props.id, index: index, isDragDisabled: isDragDisabled, children: renderItem }, `item-key-${props.id}`));
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
    const emptyRenderContainer = () => (0, jsx_runtime_1.jsx)(Text_1.Text, { className: emptyPlaceholderCn, children: placeholder });
    return emptyRenderContainer;
};
const TableColumnSetup = (props) => {
    const { renderSwitcher, popupWidth, popupPlacement, items: propsItems, onUpdate: propsOnUpdate, sortable, renderControls, className, defaultItems = propsItems, showResetButton: propsShowResetButton, filterable, filterPlaceholder, filterEmptyMessage, filterSettings = defaultFilterSettingsFn, hideApplyButton, } = props;
    const [open, setOpen] = React.useState(false);
    const [sortingEnabled, setSortingEnabled] = React.useState(sortable);
    const [prevSortingEnabled, setPrevSortingEnabled] = React.useState(sortable);
    if (sortable !== prevSortingEnabled) {
        setPrevSortingEnabled(sortable);
        setSortingEnabled(sortable);
    }
    const [items, setItems] = (0, hooks_1.useControlledState)(hideApplyButton ? propsItems : undefined, propsItems, hideApplyButton ? propsOnUpdate : undefined);
    // Track changes to propsItems in manual mode
    const [prevPropsItems, setPrevPropsItems] = React.useState(propsItems);
    if (propsItems !== prevPropsItems) {
        setPrevPropsItems(propsItems);
        if (!hideApplyButton) {
            setItems(propsItems);
        }
    }
    const { t } = i18n_1.default.useTranslation();
    const filterState = (0, useList_1.useListFilter)({ items, filterItem: filterSettings, debounceTimeout: 0 });
    const onApply = () => {
        const newSettings = items.map(({ id, isSelected }) => ({ id, isSelected }));
        propsOnUpdate(newSettings);
        onOpenChange(false);
    };
    const DefaultApplyButton = () => ((0, jsx_runtime_1.jsx)(Button_1.Button, { view: "action", width: "max", onClick: onApply, children: t('button_apply') }));
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
        renderControls: () => renderControls ? (renderControls({ DefaultApplyButton, onApply })) : ((0, jsx_runtime_1.jsxs)(Flex_1.Flex, { gapRow: 1, direction: "column", className: controlsCn, children: [showResetButton && ((0, jsx_runtime_1.jsx)(Button_1.Button, { onClick: () => {
                        if (hideApplyButton) {
                            propsOnUpdate(defaultItems);
                        }
                        setItems(defaultItems);
                    }, width: "max", children: t('button_reset') })), !hideApplyButton && (0, jsx_runtime_1.jsx)(DefaultApplyButton, {})] })),
    });
    const dndRenderItem = useDndRenderItem(sortingEnabled);
    const renderControl = ({ toggleOpen }) => {
        const onKeyDown = (0, useActionHandlers_1.createOnKeyDownHandler)(toggleOpen);
        return (renderSwitcher?.({ onClick: toggleOpen, onKeyDown }) || ((0, jsx_runtime_1.jsxs)(Button_1.Button, { onClick: toggleOpen, onKeyDown: onKeyDown, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { data: icons_1.Gear }), t('button_switcher')] })));
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
    const slotBeforeListBody = filterable ? ((0, jsx_runtime_1.jsx)(TextInput_1.TextInput, { size: "m", view: "clear", placeholder: filterPlaceholder, value: filterState.filter, className: filterInputCn, onUpdate: onFilterValueUpdate, hasClear: true })) : null;
    const renderContainer = filterState.filter && !filterState.items.length ? emptyRenderContainer : dndRenderContainer;
    return ((0, jsx_runtime_1.jsx)(TreeSelect_1.TreeSelect, { className: b(null, className), mapItemDataToContentProps: mapItemDataToContentProps, multiple: true, size: "l", open: open, value: value, items: filterState.filter ? filterState.items : items, onUpdate: onUpdate, popupWidth: popupWidth, onOpenChange: onOpenChange, placement: popupPlacement, slotBeforeListBody: slotBeforeListBody, renderContainer: renderContainer, renderControl: renderControl, renderItem: dndRenderItem }));
};
exports.TableColumnSetup = TableColumnSetup;
//# sourceMappingURL=TableColumnSetup.js.map
