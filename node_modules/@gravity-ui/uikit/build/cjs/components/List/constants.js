"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listNavigationIgnoredKeys = exports.ListQa = void 0;
const constants_1 = require("../../constants.js");
exports.ListQa = {
    ACTIVE_ITEM: 'list-active-item',
};
exports.listNavigationIgnoredKeys = [
    // Tab key should focus the next element
    constants_1.KeyCode.TAB,
];
//# sourceMappingURL=constants.js.map
