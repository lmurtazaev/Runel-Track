'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { KeyCode } from "../../constants.js";
import { useListNavigation } from "../../hooks/index.js";
import { Menu } from "../Menu/index.js";
import { Popup } from "../Popup/index.js";
import { cnDropdownMenu } from "./DropdownMenu.classname.js";
import { DropdownMenuContext } from "./DropdownMenuContext.js";
import { DropdownMenuItem } from "./DropdownMenuItem.js";
import { DropdownMenuNavigationContext } from "./DropdownMenuNavigationContext.js";
import { isSeparator } from "./utils/isSeparator.js";
import { shouldSkipItemNavigation } from "./utils/shouldSkipItemNavigation.js";
import { stringifyNavigationPath } from "./utils/stringifyNavigationPath.js";
export const DropdownMenuPopup = ({ items, open, anchorRef, onClose, size, menuProps, children, popupProps, path = [], }) => {
    const { toggle, data } = React.useContext(DropdownMenuContext);
    const { activeMenuPath, setActiveMenuPath, anchorRef: navigationAnchorRef, } = React.useContext(DropdownMenuNavigationContext);
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
            case KeyCode.ESCAPE: {
                if (isSubmenu) {
                    event.stopPropagation();
                    activateParent?.();
                }
                return false;
            }
            case KeyCode.ENTER:
            case KeyCode.SPACEBAR: {
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
    const isNavigationActive = open && stringifyNavigationPath(path) === stringifyNavigationPath(activeMenuPath);
    const { activeItemIndex, setActiveItemIndex, reset: resetNavigation, } = useListNavigation({
        items,
        skip: shouldSkipItemNavigation,
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
    return (_jsx(Popup, { open: open, anchorRef: anchorRef, onClose: onClose, placement: "bottom-start", ...popupProps, children: _jsx("div", { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, className: cnDropdownMenu('popup-content'), children: children || (_jsx(Menu, { className: cnDropdownMenu('menu'), size: size, ...menuProps, children: items.map((item, index) => {
                    const isActive = isNavigationActive && activeItemIndex === index;
                    const activate = () => setActiveItemIndex(index);
                    const isActiveParent = open &&
                        !isActive &&
                        activeMenuPath.length !== 0 &&
                        stringifyNavigationPath(item.path) ===
                            stringifyNavigationPath(activeMenuPath.slice(0, item.path.length));
                    const extraProps = {
                        ...item.extraProps,
                        onClick: activate,
                        onMouseEnter: activate,
                    };
                    return (_jsx(DropdownMenuItem, { size: size, className: cnDropdownMenu('menu-item', {
                            separator: isSeparator(item),
                            'active-parent': isActiveParent,
                            'with-submenu': Boolean(item.items?.length),
                        }, item.className), selected: isActive, popupProps: popupProps, closeMenu: onClose, ...item, extraProps: extraProps }, index));
                }) })) }) }));
};
//# sourceMappingURL=DropdownMenuPopup.js.map
