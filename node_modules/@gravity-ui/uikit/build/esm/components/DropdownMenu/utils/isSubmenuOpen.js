export function isSubmenuOpen(path, activeMenuPath) {
    return path?.every((item, index) => item === activeMenuPath?.[index]) ?? false;
}
//# sourceMappingURL=isSubmenuOpen.js.map
