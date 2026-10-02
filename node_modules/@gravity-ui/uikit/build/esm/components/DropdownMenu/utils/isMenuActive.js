import { stringifyNavigationPath } from "./stringifyNavigationPath.js";
export function isMenuActive(path, activeMenuPath) {
    return stringifyNavigationPath(path) === stringifyNavigationPath(activeMenuPath);
}
//# sourceMappingURL=isMenuActive.js.map
