'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownMenuItem = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Icon_1 = require("../Icon/index.js");
const Menu_1 = require("../Menu/index.js");
const theme_1 = require("../theme/index.js");
const DropdownMenu_classname_1 = require("./DropdownMenu.classname.js");
const DropdownMenuContext_1 = require("./DropdownMenuContext.js");
const DropdownMenuPopup_1 = require("./DropdownMenuPopup.js");
const useSubmenu_1 = require("./hooks/useSubmenu.js");
const DropdownMenuItem = ({ text, action, items: subMenuItems, popupProps, closeMenu, children, path, size, ...props }) => {
    const { toggle, data } = React.useContext(DropdownMenuContext_1.DropdownMenuContext);
    const menuItemRef = React.useRef(null);
    const direction = (0, theme_1.useDirection)();
    const { hasSubmenu, isSubmenuOpen, closeSubmenu, openSubmenu } = (0, useSubmenu_1.useSubmenu)({
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
    const iconEnd = React.useMemo(() => hasSubmenu ? ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { data: direction === 'rtl' ? icons_1.ChevronLeft : icons_1.ChevronRight, size: 10, className: (0, DropdownMenu_classname_1.cnDropdownMenu)('sub-menu-arrow') })) : (props.iconEnd), [hasSubmenu, direction, props.iconEnd]);
    return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsx)(Menu_1.Menu.Item, { ref: menuItemRef, ...props, extraProps: extraProps, onClick: handleMenuItemClick, iconEnd: iconEnd, children: text || children }), hasSubmenu && subMenuItems && ((0, jsx_runtime_1.jsx)(DropdownMenuPopup_1.DropdownMenuPopup, { popupProps: {
                    ...popupProps,
                    className: (0, DropdownMenu_classname_1.cnDropdownMenu)('sub-menu', popupProps?.className),
                    placement: subMenuPlacement,
                }, size: size, items: subMenuItems, path: path, open: isSubmenuOpen, anchorRef: menuItemRef, onClose: handleCloseMenu }))] }));
};
exports.DropdownMenuItem = DropdownMenuItem;
//# sourceMappingURL=DropdownMenuItem.js.map
