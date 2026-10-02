'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = Menu;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const react_1 = require("@floating-ui/react");
const hooks_1 = require("../../../hooks/index.js");
const Popup_1 = require("../../Popup/index.js");
const theme_1 = require("../../theme/index.js");
const cn_1 = require("../../utils/cn.js");
const getElementRef_1 = require("../../utils/getElementRef.js");
const MenuContext_1 = require("./MenuContext.js");
const MenuDivider_1 = require("./MenuDivider.js");
const MenuItem_1 = require("./MenuItem.js");
const MenuTrigger_1 = require("./MenuTrigger.js");
const utils_1 = require("./utils.js");
require("./Menu.css");
const b = (0, cn_1.block)('lab-menu');
// The component is needed to run submenu logic hooks.
// We get <nodeId> of the Popup using "useFloatingParentNodeId" here
// and <parentId> from using "useFloatingParentNodeId" outside the Popup.
function MenuPopupContent({ open, onRequestClose, isNested, children, className, style, qa, }) {
    const tree = (0, react_1.useFloatingTree)();
    const nodeId = (0, react_1.useFloatingParentNodeId)();
    const parentId = React.useContext(MenuContext_1.MenuContext)?.floatingParentId;
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
    return ((0, jsx_runtime_1.jsx)("div", { className: b(null, className), style: style, "data-qa": qa, children: children }));
}
function Menu({ trigger, inline = false, defaultOpen, open, onOpenChange, placement = 'bottom-start', disabled, children, size = 'm', className, style, qa, }) {
    const [anchorElement, setAnchorElement] = React.useState(null);
    const [floatingElement, setFloatingElement] = React.useState(null);
    const [isOpen, setIsOpen] = (0, hooks_1.useControlledState)(open, defaultOpen ?? false, onOpenChange);
    const [activeIndex, setActiveIndex] = React.useState(null);
    const isRTL = (0, theme_1.useDirection)() === 'rtl';
    const itemsRef = React.useRef([]);
    const parentMenu = React.useContext(MenuContext_1.MenuContext);
    const floatingParentId = (0, react_1.useFloatingParentNodeId)();
    const isNested = Boolean(parentMenu);
    const floatingContext = (0, react_1.useFloatingRootContext)({
        open: isOpen && !disabled,
        onOpenChange: setIsOpen,
        elements: {
            reference: anchorElement,
            floating: floatingElement,
        },
    });
    const hover = (0, react_1.useHover)(floatingContext, {
        enabled: isNested,
        delay: { open: 100 },
        handleClose: (0, react_1.safePolygon)({ blockPointerEvents: true }),
    });
    const click = (0, react_1.useClick)(floatingContext, {
        toggle: !isNested,
        ignoreMouse: isNested,
    });
    const dismiss = (0, react_1.useDismiss)(floatingContext, { enabled: !isNested });
    const role = (0, react_1.useRole)(floatingContext, { role: 'menu' });
    const listNavigation = (0, react_1.useListNavigation)(floatingContext, {
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
        (0, react_1.offset)({ mainAxis: isNested ? 3 : 4, alignmentAxis: isNested ? -4 : 0 }),
        (0, react_1.flip)({ ...detectOverflowOptions }),
        (0, react_1.shift)({ ...detectOverflowOptions }),
    ];
    const interactions = [hover, click, dismiss, role, listNavigation];
    const { getReferenceProps, getItemProps } = (0, react_1.useInteractions)(interactions);
    const anchorRef = (0, hooks_1.useForkRef)(setAnchorElement, React.isValidElement(trigger) ? (0, getElementRef_1.getElementRef)(trigger) : undefined);
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
            if (!React.isValidElement(child) || !(0, utils_1.isComponentType)(child, 'Menu.Item')) {
                return child;
            }
            return ((0, jsx_runtime_1.jsx)(react_1.CompositeItem, { render: (props) => React.cloneElement(child, { ...child.props, ...props }) }, index));
        });
        return ((0, jsx_runtime_1.jsx)(MenuContext_1.MenuContext.Provider, { value: contextValue, children: (0, jsx_runtime_1.jsx)(react_1.Composite, { render: (0, jsx_runtime_1.jsx)("div", { role: "menu", className: b(null, className), style: style, "data-qa": qa }), orientation: "vertical", loop: false, rtl: isRTL, activeIndex: activeIndex ?? undefined, onNavigate: setActiveIndex, children: preparedChildren }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [anchorNode, (0, jsx_runtime_1.jsx)(Popup_1.Popup, { open: floatingContext.open, placement: isNested ? `${isRTL ? 'left' : 'right'}-start` : placement, disablePortal: isNested, disableEscapeKeyDown: isNested, disableOutsideClick: isNested, floatingContext: floatingContext, floatingRef: setFloatingElement, floatingMiddlewares: middlewares, floatingInteractions: interactions, children: (0, jsx_runtime_1.jsx)(MenuContext_1.MenuContext.Provider, { value: contextValue, children: (0, jsx_runtime_1.jsx)(react_1.FloatingList, { elementsRef: itemsRef, children: (0, jsx_runtime_1.jsx)(MenuPopupContent, { open: isOpen, onRequestClose: handleContentRequestClose, isNested: isNested, className: className, style: style, qa: qa, children: children }) }) }) })] }));
}
Menu.displayName = 'Menu';
Menu.Trigger = MenuTrigger_1.MenuTrigger;
Menu.Item = MenuItem_1.MenuItem;
Menu.Divider = MenuDivider_1.MenuDivider;
//# sourceMappingURL=Menu.js.map
