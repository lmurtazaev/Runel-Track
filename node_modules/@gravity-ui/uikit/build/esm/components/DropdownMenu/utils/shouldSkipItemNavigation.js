import { isSeparator } from "./isSeparator.js";
export function shouldSkipItemNavigation(item) {
    return item.disabled || isSeparator(item);
}
//# sourceMappingURL=shouldSkipItemNavigation.js.map
