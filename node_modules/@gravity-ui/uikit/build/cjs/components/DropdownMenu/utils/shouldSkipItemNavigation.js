"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldSkipItemNavigation = shouldSkipItemNavigation;
const isSeparator_1 = require("./isSeparator.js");
function shouldSkipItemNavigation(item) {
    return item.disabled || (0, isSeparator_1.isSeparator)(item);
}
//# sourceMappingURL=shouldSkipItemNavigation.js.map
