'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { ChevronLeft, ChevronRight } from '@gravity-ui/icons';
import { Icon } from "../Icon/index.js";
import { Menu } from "../Menu/index.js";
import { useDirection } from "../theme/index.js";
import { cnDropdownMenu } from "./DropdownMenu.classname.js";
import { DropdownMenuContext } from "./DropdownMenuContext.js";
import { DropdownMenuPopup } from "./DropdownMenuPopup.js";
import { useSubmenu } from "./hooks/useSubmenu.js";
export const DropdownMenuItem = ({ text, action, items: subMenuItems, popupProps, closeMenu, children, path, size, ...props }) => {
    const { toggle, data } = React.useContext(DropdownMenuContext);
    const menuItemRef = React.useRef(null);
    const direction = useDirection();
    const { hasSubmenu, isSubmenuOpen, closeSubmenu, openSubmenu } = useSubmenu({
        items: subMenuItems,
        path,
    });
    const handleCloseMenu = React.useCallback(() => {
        const close = () => {
            if (closeMenu) {
                closeMenu();
            }
            else {
                toggle(false);
            }
        };
        if (hasSubmenu) {
            closeSubmenu();
            // Wait for submenu to close
            requestAnimationFrame(close);
        }
        else {
            close();
        }
    }, [closeMenu, closeSubmenu, hasSubmenu, toggle]);
    const handleMenuItemClick = React.useCallback((event) => {
        props.extraProps?.onClick?.(event);
        if (hasSubmenu) {
            if (isSubmenuOpen) {
                closeSubmenu();
            }
            else {
                openSubmenu();
            }
            return;
        }
        action?.(event, data);
        handleCloseMenu();
    }, [
        action,
        data,
        handleCloseMenu,
        hasSubmenu,
        isSubmenuOpen,
        openSubmenu,
        closeSubmenu,
        props.extraProps,
    ]);
    const extraProps = React.useMemo(() => {
        return {
            ...props.extraProps,
            onMouseEnter: (event) => {
                props.extraProps?.onMouseEnter?.(event);
                if (hasSubmenu) {
                    openSubmenu();
                }
            },
            onMouseLeave: (event) => {
                props.extraProps?.onMouseLeave?.(event);
                if (hasSubmenu) {
                    closeSubmenu();
                }
            },
        };
    }, [props.extraProps, closeSubmenu, hasSubmenu, openSubmenu]);
    const subMenuPlacement = React.useMemo(() => (direction === 'rtl' ? ['left-start', 'right-start'] : ['right-start', 'left-start']), [direction]);
    const iconEnd = React.useMemo(() => hasSubmenu ? (_jsx(Icon, { data: direction === 'rtl' ? ChevronLeft : ChevronRight, size: 10, className: cnDropdownMenu('sub-menu-arrow') })) : (props.iconEnd), [hasSubmenu, direction, props.iconEnd]);
    return (_jsxs(React.Fragment, { children: [_jsx(Menu.Item, { ref: menuItemRef, ...props, extraProps: extraProps, onClick: handleMenuItemClick, iconEnd: iconEnd, children: text || children }), hasSubmenu && subMenuItems && (_jsx(DropdownMenuPopup, { popupProps: {
                    ...popupProps,
                    className: cnDropdownMenu('sub-menu', popupProps?.className),
                    placement: subMenuPlacement,
                }, size: size, items: subMenuItems, path: path, open: isSubmenuOpen, anchorRef: menuItemRef, onClose: handleCloseMenu }))] }));
};
//# sourceMappingURL=DropdownMenuItem.js.map
