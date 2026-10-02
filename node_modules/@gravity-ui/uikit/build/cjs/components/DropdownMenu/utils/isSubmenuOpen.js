"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSubmenuOpen = isSubmenuOpen;
function isSubmenuOpen(path, activeMenuPath) {
    return path?.every((item, index) => item === activeMenuPath?.[index]) ?? false;
}
//# sourceMappingURL=isSubmenuOpen.js.map
