"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSubmenu = useSubmenu;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const DropdownMenuNavigationContext_1 = require("../DropdownMenuNavigationContext.js");
const isSubmenuOpen_1 = require("../utils/isSubmenuOpen.js");
function useSubmenu({ items, path }) {
    const { activeMenuPath, setActiveMenuPath } = React.useContext(DropdownMenuNavigationContext_1.DropdownMenuNavigationContext);
    const hasSubmenu = Boolean(path) && Boolean(items?.length);
    const closeSubmenu = React.useCallback(() => {
        if (!path) {
            return;
        }
        setActiveMenuPath(path.slice(0, path.length - 1));
    }, [path, setActiveMenuPath]);
    const openSubmenu = React.useCallback(() => {
        if (!path) {
            return;
        }
        setActiveMenuPath(path);
    }, [path, setActiveMenuPath]);
    return {
        hasSubmenu,
        isSubmenuOpen: (0, isSubmenuOpen_1.isSubmenuOpen)(path, activeMenuPath),
        openSubmenu,
        closeSubmenu,
    };
}
//# sourceMappingURL=useSubmenu.js.map
