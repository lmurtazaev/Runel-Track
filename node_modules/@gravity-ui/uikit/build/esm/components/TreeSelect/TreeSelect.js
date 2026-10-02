'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { useFocusWithin, useForkRef, useLayoutEffect, useUniqId } from "../../hooks/index.js";
import { useOpenState } from "../../hooks/useSelect/useOpenState.js";
import { SelectControl } from "../Select/components/index.js";
import { SelectPopup } from "../Select/components/SelectPopup/SelectPopup.js";
import { TreeList } from "../TreeList/index.js";
import { OuterAdditionalContent } from "../controls/common/OuterAdditionalContent/OuterAdditionalContent.js";
import { errorPropsMapper } from "../controls/utils.js";
import { useMobile } from "../mobile/index.js";
import { ListItemView, getListItemClickHandler, useList } from "../useList/index.js";
import { block } from "../utils/cn.js";
import { useControlledValue } from "./hooks/useControlledValue.js";
import "./TreeSelect.css";
const b = block('tree-select');
const defaultItemRenderer = (renderState) => {
    return _jsx(ListItemView, { ...renderState.props, ...renderState.renderContainerProps });
};
export const TreeSelect = React.forwardRef(function TreeSelect({ id, qa, title, placement, slotBeforeListBody, slotAfterListBody, size = 'm', defaultOpen, width, containerRef: propsContainerRef, className, containerClassName, popupClassName, open: propsOpen, multiple, popupWidth, popupDisablePortal, items, value: propsValue, defaultValue, placeholder, disabled = false, withExpandedState = true, defaultExpandedState = 'expanded', hasClear, errorMessage: propsErrorMessage, errorPlacement: propsErrorPlacement, validationState: propsValidationState, onClose, onOpenChange, onUpdate, renderControl, renderItem = defaultItemRenderer, renderContainer, mapItemDataToContentProps, onFocus, onBlur, getItemId, onItemClick, }, ref) {
    const mobile = useMobile();
    const uniqId = useUniqId();
    const treeSelectId = id ?? uniqId;
    const popupId = `tree-select-popup-${treeSelectId}`;
    const controlWrapRef = React.useRef(null);
    const controlRef = React.useRef(null);
    const containerRefLocal = React.useRef(null);
    const containerRef = propsContainerRef ?? containerRefLocal;
    const { errorMessage, errorPlacement, validationState } = errorPropsMapper({
        errorMessage: propsErrorMessage,
        errorPlacement: propsErrorPlacement || 'outside',
        validationState: propsValidationState,
    });
    const errorMessageId = useUniqId();
    const isErrorStateVisible = validationState === 'invalid';
    const isErrorMsgVisible = isErrorStateVisible && Boolean(errorMessage) && errorPlacement === 'outside';
    const isErrorIconVisible = isErrorStateVisible && Boolean(errorMessage) && errorPlacement === 'inside';
    const handleControlRef = useForkRef(ref, controlRef);
    const { toggleOpen, open } = useOpenState({
        defaultOpen,
        onClose,
        onOpenChange,
        open: propsOpen,
    });
    const { value, selectedById, setSelected } = useControlledValue({
        value: propsValue,
        defaultValue,
        onUpdate,
    });
    const list = useList({
        controlledState: {
            selectedById,
            setSelected,
        },
        items,
        getItemId,
        defaultExpandedState,
        withExpandedState,
    });
    const handleItemClick = React.useMemo(() => {
        if (onItemClick === null) {
            return undefined;
        }
        const handler = (arg, e) => {
            const payload = { id: arg.id, list };
            if (onItemClick) {
                onItemClick?.(payload, e);
            }
            else {
                const baseOnClick = getListItemClickHandler({ list, multiple });
                baseOnClick(payload, e);
                const isGroup = list.state.expandedById && arg.id in list.state.expandedById;
                if (!multiple && !isGroup) {
                    toggleOpen(false);
                }
            }
        };
        return handler;
    }, [onItemClick, list, multiple, toggleOpen]);
    // restoring focus when popup opens
    useLayoutEffect(() => {
        if (open) {
            // for some reason popup position on page may be wrong calculated. `preventScroll` prevent page gap in that cases
            containerRef.current?.focus({ preventScroll: true });
        }
        return () => list.state.setActiveItemId(undefined); // reset active item on popup close
        // subscribe only in open event
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);
    const handleClose = React.useCallback(() => toggleOpen(false), [toggleOpen]);
    const { focusWithinProps } = useFocusWithin({
        onFocusWithin: onFocus,
        onBlurWithin: React.useCallback((e) => {
            onBlur?.(e);
            handleClose();
        }, [handleClose, onBlur]),
    });
    const controlProps = {
        list,
        open,
        placeholder,
        toggleOpen,
        clearValue: () => list.state.setSelected({}),
        ref: handleControlRef,
        size,
        value,
        disabled,
        id: treeSelectId,
        activeItemId: list.state.activeItemId,
        title,
        errorMessage: isErrorIconVisible ? errorMessage : undefined,
        errorPlacement,
        validationState,
        hasClear,
        isErrorVisible: isErrorStateVisible,
    };
    const togglerNode = renderControl ? (renderControl(controlProps)) : (_jsx(SelectControl, { ...controlProps, selectedOptionsContent: React.Children.toArray(value.map((itemId) => itemId in list.structure.itemsById
            ? mapItemDataToContentProps(list.structure.itemsById[itemId]).title
            : '')).join(', '), view: "normal", pin: "round-round", popupId: popupId, selectId: treeSelectId }));
    const mods = {
        ...(width === 'max' && { width }),
    };
    const inlineStyles = {};
    if (typeof width === 'number') {
        inlineStyles.width = width;
    }
    return (_jsxs("div", { ref: controlWrapRef, ...focusWithinProps, className: b(mods, className), style: inlineStyles, children: [togglerNode, _jsxs(SelectPopup, { ref: controlWrapRef, className: b('popup', { size }, popupClassName), controlRef: controlRef, width: popupWidth, placement: placement, open: open, handleClose: handleClose, disablePortal: popupDisablePortal, mobile: mobile, id: popupId, children: [slotBeforeListBody, _jsx(TreeList, { list: list, size: size, className: b('list', containerClassName), qa: qa, multiple: multiple, id: `list-${treeSelectId}`, containerRef: containerRef, onItemClick: handleItemClick, renderContainer: renderContainer, mapItemDataToContentProps: mapItemDataToContentProps, renderItem: renderItem ?? defaultItemRenderer }), slotAfterListBody] }), _jsx(OuterAdditionalContent, { errorMessage: isErrorMsgVisible ? errorMessage : null, errorMessageId: errorMessageId })] }));
});
//# sourceMappingURL=TreeSelect.js.map
