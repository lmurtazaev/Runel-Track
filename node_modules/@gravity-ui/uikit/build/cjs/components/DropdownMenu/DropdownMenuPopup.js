'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownMenuPopup = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const constants_1 = require("../../constants.js");
const hooks_1 = require("../../hooks/index.js");
const Menu_1 = require("../Menu/index.js");
const Popup_1 = require("../Popup/index.js");
const DropdownMenu_classname_1 = require("./DropdownMenu.classname.js");
const DropdownMenuContext_1 = require("./DropdownMenuContext.js");
const DropdownMenuItem_1 = require("./DropdownMenuItem.js");
const DropdownMenuNavigationContext_1 = require("./DropdownMenuNavigationContext.js");
const isSeparator_1 = require("./utils/isSeparator.js");
const shouldSkipItemNavigation_1 = require("./utils/shouldSkipItemNavigation.js");
const stringifyNavigationPath_1 = require("./utils/stringifyNavigationPath.js");
const DropdownMenuPopup = ({ items, open, anchorRef, onClose, size, menuProps, children, popupProps, path = [], }) => {
    const { toggle, data } = React.useContext(DropdownMenuContext_1.DropdownMenuContext);
    const { activeMenuPath, setActiveMenuPath, anchorRef: navigationAnchorRef, } = React.useContext(DropdownMenuNavigationContext_1.DropdownMenuNavigationContext);
    const isSubmenu = path.length > 0;
    const activateParent = React.useCallback(() => {
        setActiveMenuPath(path.slice(0, path.length - 1));
    }, [setActiveMenuPath, path]);
    const handleMouseEnter = React.useCallback(() => {
        setActiveMenuPath(path);
    }, [path, setActiveMenuPath]);
    const handleMouseLeave = React.useCallback(() => {
        activateParent();
    }, [activateParent]);
    const handleSelect = React.useCallback((activeItem, event) => {
        if (activeItem.items && activeItem.path) {
            setActiveMenuPath(activeItem.path);
        }
        else {
            activeItem.action?.(event, data);
            toggle(false);
        }
    }, [data, setActiveMenuPath, toggle]);
    const handleKeydown = React.useCallback((activeItemIndex, event) => {
        switch (event.key) {
            case constants_1.KeyCode.ESCAPE: {
                if (isSubmenu) {
                    event.stopPropagation();
                    activateParent?.();
                }
                return false;
            }
            case constants_1.KeyCode.ENTER:
            case constants_1.KeyCode.SPACEBAR: {
                const activeItem = items[activeItemIndex];
                const isSubmenuToggleActive = activeItem?.items;
                if (isSubmenu || isSubmenuToggleActive) {
                    event.stopPropagation();
                    event.preventDefault();
                }
                if (activeItem) {
                    handleSelect(activeItem, event);
                }
                return false;
            }
        }
        return true;
    }, [activateParent, handleSelect, isSubmenu, items]);
    const isNavigationActive = open && (0, stringifyNavigationPath_1.stringifyNavigationPath)(path) === (0, stringifyNavigationPath_1.stringifyNavigationPath)(activeMenuPath);
    const { activeItemIndex, setActiveItemIndex, reset: resetNavigation, } = (0, hooks_1.useListNavigation)({
        items,
        skip: shouldSkipItemNavigation_1.shouldSkipItemNavigation,
        anchorRef: navigationAnchorRef,
        onAnchorKeyDown: handleKeydown,
        disabled: !isNavigationActive,
        initialValue: isSubmenu ? 0 : -1,
    });
    React.useEffect(() => {
        if (!open) {
            resetNavigation();
        }
    }, [open, resetNavigation]);
    return ((0, jsx_runtime_1.jsx)(Popup_1.Popup, { open: open, anchorRef: anchorRef, onClose: onClose, placement: "bottom-start", ...popupProps, children: (0, jsx_runtime_1.jsx)("div", { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, className: (0, DropdownMenu_classname_1.cnDropdownMenu)('popup-content'), children: children || ((0, jsx_runtime_1.jsx)(Menu_1.Menu, { className: (0, DropdownMenu_classname_1.cnDropdownMenu)('menu'), size: size, ...menuProps, children: items.map((item, index) => {
                    const isActive = isNavigationActive && activeItemIndex === index;
                    const activate = () => setActiveItemIndex(index);
                    const isActiveParent = open &&
                        !isActive &&
                        activeMenuPath.length !== 0 &&
                        (0, stringifyNavigationPath_1.stringifyNavigationPath)(item.path) ===
                            (0, stringifyNavigationPath_1.stringifyNavigationPath)(activeMenuPath.slice(0, item.path.length));
                    const extraProps = {
                        ...item.extraProps,
                        onClick: activate,
                        onMouseEnter: activate,
                    };
                    return ((0, jsx_runtime_1.jsx)(DropdownMenuItem_1.DropdownMenuItem, { size: size, className: (0, DropdownMenu_classname_1.cnDropdownMenu)('menu-item', {
                            separator: (0, isSeparator_1.isSeparator)(item),
                            'active-parent': isActiveParent,
                            'with-submenu': Boolean(item.items?.length),
                        }, item.className), selected: isActive, popupProps: popupProps, closeMenu: onClose, ...item, extraProps: extraProps }, index));
                }) })) }) }));
};
exports.DropdownMenuPopup = DropdownMenuPopup;
//# sourceMappingURL=DropdownMenuPopup.js.map
