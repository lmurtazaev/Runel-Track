'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Composite, CompositeItem, FloatingList, flip, offset, safePolygon, shift, useClick, useDismiss, useFloatingParentNodeId, useFloatingRootContext, useFloatingTree, useHover, useInteractions, useListNavigation, useRole, } from '@floating-ui/react';
import { useControlledState, useForkRef } from "../../../hooks/index.js";
import { Popup } from "../../Popup/index.js";
import { useDirection } from "../../theme/index.js";
import { block } from "../../utils/cn.js";
import { getElementRef } from "../../utils/getElementRef.js";
import { MenuContext } from "./MenuContext.js";
import { MenuDivider } from "./MenuDivider.js";
import { MenuItem } from "./MenuItem.js";
import { MenuTrigger } from "./MenuTrigger.js";
import { isComponentType } from "./utils.js";
import "./Menu.css";
const b = block('lab-menu');
// The component is needed to run submenu logic hooks.
// We get <nodeId> of the Popup using "useFloatingParentNodeId" here
// and <parentId> from using "useFloatingParentNodeId" outside the Popup.
function MenuPopupContent({ open, onRequestClose, isNested, children, className, style, qa, }) {
    const tree = useFloatingTree();
    const nodeId = useFloatingParentNodeId();
    const parentId = React.useContext(MenuContext)?.floatingParentId;
    React.useEffect(() => {
        if (!tree)
            return;
        function handleTreeClick() {
            // Closing only the root Menu so the closing animation runs once for all menus due to shared portal container
            if (!isNested) {
                onRequestClose();
            }
        }
        function handleSubMenuOpen(event) {
            // Closing on sibling submenu open
            if (event.nodeId !== nodeId && event.parentId === parentId) {
                onRequestClose();
            }
        }
        tree.events.on('click', handleTreeClick);
        tree.events.on('menuopen', handleSubMenuOpen);
        return () => {
            tree.events.off('click', handleTreeClick);
            tree.events.off('menuopen', handleSubMenuOpen);
        };
    }, [onRequestClose, tree, nodeId, parentId, isNested]);
    React.useEffect(() => {
        if (open && tree) {
            tree.events.emit('menuopen', { parentId, nodeId });
        }
    }, [open, tree, nodeId, parentId]);
    return (_jsx("div", { className: b(null, className), style: style, "data-qa": qa, children: children }));
}
export function Menu({ trigger, inline = false, defaultOpen, open, onOpenChange, placement = 'bottom-start', disabled, children, size = 'm', className, style, qa, }) {
    const [anchorElement, setAnchorElement] = React.useState(null);
    const [floatingElement, setFloatingElement] = React.useState(null);
    const [isOpen, setIsOpen] = useControlledState(open, defaultOpen ?? false, onOpenChange);
    const [activeIndex, setActiveIndex] = React.useState(null);
    const isRTL = useDirection() === 'rtl';
    const itemsRef = React.useRef([]);
    const parentMenu = React.useContext(MenuContext);
    const floatingParentId = useFloatingParentNodeId();
    const isNested = Boolean(parentMenu);
    const floatingContext = useFloatingRootContext({
        open: isOpen && !disabled,
        onOpenChange: setIsOpen,
        elements: {
            reference: anchorElement,
            floating: floatingElement,
        },
    });
    const hover = useHover(floatingContext, {
        enabled: isNested,
        delay: { open: 100 },
        handleClose: safePolygon({ blockPointerEvents: true }),
    });
    const click = useClick(floatingContext, {
        toggle: !isNested,
        ignoreMouse: isNested,
    });
    const dismiss = useDismiss(floatingContext, { enabled: !isNested });
    const role = useRole(floatingContext, { role: 'menu' });
    const listNavigation = useListNavigation(floatingContext, {
        listRef: itemsRef,
        activeIndex,
        nested: isNested,
        onNavigate: setActiveIndex,
        rtl: isRTL,
    });
    const detectOverflowOptions = {
        padding: 4,
    };
    const middlewares = [
        offset({ mainAxis: isNested ? 3 : 4, alignmentAxis: isNested ? -4 : 0 }),
        flip({ ...detectOverflowOptions }),
        shift({ ...detectOverflowOptions }),
    ];
    const interactions = [hover, click, dismiss, role, listNavigation];
    const { getReferenceProps, getItemProps } = useInteractions(interactions);
    const anchorRef = useForkRef(setAnchorElement, React.isValidElement(trigger) ? getElementRef(trigger) : undefined);
    const anchorProps = React.isValidElement(trigger)
        ? getReferenceProps(trigger.props)
        : getReferenceProps();
    const anchorNode = React.isValidElement(trigger)
        ? React.cloneElement(trigger, {
            ...anchorProps,
            ref: anchorRef,
        })
        : typeof trigger === 'function'
            ? trigger(anchorProps, anchorRef)
            : null;
    const handleContentRequestClose = React.useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);
    const getItemPropsInline = React.useCallback((userProps) => {
        const handleItemPointerEnter = (event) => {
            userProps?.onPointerEnter?.(event);
            const element = event.currentTarget;
            const index = [
                ...(element.closest('[role="menu"]')?.querySelectorAll('[role="menuitem"]') ??
                    []),
            ].indexOf(element);
            if (!element.disabled &&
                !element.ariaDisabled &&
                index >= 0) {
                element.focus();
                setActiveIndex(index);
            }
            else {
                setActiveIndex(null);
            }
        };
        const handleItemPointerLeave = (event) => {
            userProps?.onPointerLeave?.(event);
            setActiveIndex(null);
        };
        return {
            // Clear attribute set by Floating UI Composite (we don't use it)
            'data-active': undefined,
            ...userProps,
            onPointerEnter: handleItemPointerEnter,
            onPointerLeave: handleItemPointerLeave,
        };
    }, []);
    const contextValue = React.useMemo(() => ({
        inline: parentMenu?.inline ?? inline,
        size: parentMenu?.size ?? size,
        activeIndex,
        floatingParentId: floatingParentId,
        getItemProps: inline ? getItemPropsInline : getItemProps,
    }), [parentMenu, inline, size, activeIndex, floatingParentId, getItemPropsInline, getItemProps]);
    React.useEffect(() => {
        if (!anchorNode) {
            if (trigger) {
                floatingContext.refs.setPositionReference(trigger);
                setIsOpen(true);
            }
            else {
                setIsOpen(false);
            }
        }
    }, [trigger]);
    if (inline) {
        const preparedChildren = React.Children.toArray(children).map((child, index) => {
            if (!React.isValidElement(child) || !isComponentType(child, 'Menu.Item')) {
                return child;
            }
            return (_jsx(CompositeItem, { render: (props) => React.cloneElement(child, { ...child.props, ...props }) }, index));
        });
        return (_jsx(MenuContext.Provider, { value: contextValue, children: _jsx(Composite, { render: _jsx("div", { role: "menu", className: b(null, className), style: style, "data-qa": qa }), orientation: "vertical", loop: false, rtl: isRTL, activeIndex: activeIndex ?? undefined, onNavigate: setActiveIndex, children: preparedChildren }) }));
    }
    return (_jsxs(React.Fragment, { children: [anchorNode, _jsx(Popup, { open: floatingContext.open, placement: isNested ? `${isRTL ? 'left' : 'right'}-start` : placement, disablePortal: isNested, disableEscapeKeyDown: isNested, disableOutsideClick: isNested, floatingContext: floatingContext, floatingRef: setFloatingElement, floatingMiddlewares: middlewares, floatingInteractions: interactions, children: _jsx(MenuContext.Provider, { value: contextValue, children: _jsx(FloatingList, { elementsRef: itemsRef, children: _jsx(MenuPopupContent, { open: isOpen, onRequestClose: handleContentRequestClose, isNested: isNested, className: className, style: style, qa: qa, children: children }) }) }) })] }));
}
Menu.displayName = 'Menu';
Menu.Trigger = MenuTrigger;
Menu.Item = MenuItem;
Menu.Divider = MenuDivider;
//# sourceMappingURL=Menu.js.map
