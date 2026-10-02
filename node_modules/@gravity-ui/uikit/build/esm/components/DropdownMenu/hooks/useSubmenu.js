import * as React from 'react';
import { DropdownMenuNavigationContext } from "../DropdownMenuNavigationContext.js";
import { isSubmenuOpen } from "../utils/isSubmenuOpen.js";
export function useSubmenu({ items, path }) {
    const { activeMenuPath, setActiveMenuPath } = React.useContext(DropdownMenuNavigationContext);
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
        isSubmenuOpen: isSubmenuOpen(path, activeMenuPath),
        openSubmenu,
        closeSubmenu,
    };
}
//# sourceMappingURL=useSubmenu.js.map
