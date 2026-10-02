"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMenuActive = isMenuActive;
const stringifyNavigationPath_1 = require("./stringifyNavigationPath.js");
function isMenuActive(path, activeMenuPath) {
    return (0, stringifyNavigationPath_1.stringifyNavigationPath)(path) === (0, stringifyNavigationPath_1.stringifyNavigationPath)(activeMenuPath);
}
//# sourceMappingURL=isMenuActive.js.map
