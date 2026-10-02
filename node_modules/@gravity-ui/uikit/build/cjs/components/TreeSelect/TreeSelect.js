'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeSelect = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const hooks_1 = require("../../hooks/index.js");
const useOpenState_1 = require("../../hooks/useSelect/useOpenState.js");
const components_1 = require("../Select/components/index.js");
const SelectPopup_1 = require("../Select/components/SelectPopup/SelectPopup.js");
const TreeList_1 = require("../TreeList/index.js");
const OuterAdditionalContent_1 = require("../controls/common/OuterAdditionalContent/OuterAdditionalContent.js");
const utils_1 = require("../controls/utils.js");
const mobile_1 = require("../mobile/index.js");
const useList_1 = require("../useList/index.js");
const cn_1 = require("../utils/cn.js");
const useControlledValue_1 = require("./hooks/useControlledValue.js");
require("./TreeSelect.css");
const b = (0, cn_1.block)('tree-select');
const defaultItemRenderer = (renderState) => {
    return (0, jsx_runtime_1.jsx)(useList_1.ListItemView, { ...renderState.props, ...renderState.renderContainerProps });
};
exports.TreeSelect = React.forwardRef(function TreeSelect({ id, qa, title, placement, slotBeforeListBody, slotAfterListBody, size = 'm', defaultOpen, width, containerRef: propsContainerRef, className, containerClassName, popupClassName, open: propsOpen, multiple, popupWidth, popupDisablePortal, items, value: propsValue, defaultValue, placeholder, disabled = false, withExpandedState = true, defaultExpandedState = 'expanded', hasClear, errorMessage: propsErrorMessage, errorPlacement: propsErrorPlacement, validationState: propsValidationState, onClose, onOpenChange, onUpdate, renderControl, renderItem = defaultItemRenderer, renderContainer, mapItemDataToContentProps, onFocus, onBlur, getItemId, onItemClick, }, ref) {
    const mobile = (0, mobile_1.useMobile)();
    const uniqId = (0, hooks_1.useUniqId)();
    const treeSelectId = id ?? uniqId;
    const popupId = `tree-select-popup-${treeSelectId}`;
    const controlWrapRef = React.useRef(null);
    const controlRef = React.useRef(null);
    const containerRefLocal = React.useRef(null);
    const containerRef = propsContainerRef ?? containerRefLocal;
    const { errorMessage, errorPlacement, validationState } = (0, utils_1.errorPropsMapper)({
        errorMessage: propsErrorMessage,
        errorPlacement: propsErrorPlacement || 'outside',
        validationState: propsValidationState,
    });
    const errorMessageId = (0, hooks_1.useUniqId)();
    const isErrorStateVisible = validationState === 'invalid';
    const isErrorMsgVisible = isErrorStateVisible && Boolean(errorMessage) && errorPlacement === 'outside';
    const isErrorIconVisible = isErrorStateVisible && Boolean(errorMessage) && errorPlacement === 'inside';
    const handleControlRef = (0, hooks_1.useForkRef)(ref, controlRef);
    const { toggleOpen, open } = (0, useOpenState_1.useOpenState)({
        defaultOpen,
        onClose,
        onOpenChange,
        open: propsOpen,
    });
    const { value, selectedById, setSelected } = (0, useControlledValue_1.useControlledValue)({
        value: propsValue,
        defaultValue,
        onUpdate,
    });
    const list = (0, useList_1.useList)({
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
                const baseOnClick = (0, useList_1.getListItemClickHandler)({ list, multiple });
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
    (0, hooks_1.useLayoutEffect)(() => {
        if (open) {
            // for some reason popup position on page may be wrong calculated. `preventScroll` prevent page gap in that cases
            containerRef.current?.focus({ preventScroll: true });
        }
        return () => list.state.setActiveItemId(undefined); // reset active item on popup close
        // subscribe only in open event
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);
    const handleClose = React.useCallback(() => toggleOpen(false), [toggleOpen]);
    const { focusWithinProps } = (0, hooks_1.useFocusWithin)({
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
    const togglerNode = renderControl ? (renderControl(controlProps)) : ((0, jsx_runtime_1.jsx)(components_1.SelectControl, { ...controlProps, selectedOptionsContent: React.Children.toArray(value.map((itemId) => itemId in list.structure.itemsById
            ? mapItemDataToContentProps(list.structure.itemsById[itemId]).title
            : '')).join(', '), view: "normal", pin: "round-round", popupId: popupId, selectId: treeSelectId }));
    const mods = {
        ...(width === 'max' && { width }),
    };
    const inlineStyles = {};
    if (typeof width === 'number') {
        inlineStyles.width = width;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: controlWrapRef, ...focusWithinProps, className: b(mods, className), style: inlineStyles, children: [togglerNode, (0, jsx_runtime_1.jsxs)(SelectPopup_1.SelectPopup, { ref: controlWrapRef, className: b('popup', { size }, popupClassName), controlRef: controlRef, width: popupWidth, placement: placement, open: open, handleClose: handleClose, disablePortal: popupDisablePortal, mobile: mobile, id: popupId, children: [slotBeforeListBody, (0, jsx_runtime_1.jsx)(TreeList_1.TreeList, { list: list, size: size, className: b('list', containerClassName), qa: qa, multiple: multiple, id: `list-${treeSelectId}`, containerRef: containerRef, onItemClick: handleItemClick, renderContainer: renderContainer, mapItemDataToContentProps: mapItemDataToContentProps, renderItem: renderItem ?? defaultItemRenderer }), slotAfterListBody] }), (0, jsx_runtime_1.jsx)(OuterAdditionalContent_1.OuterAdditionalContent, { errorMessage: isErrorMsgVisible ? errorMessage : null, errorMessageId: errorMessageId })] }));
});
//# sourceMappingURL=TreeSelect.js.map
