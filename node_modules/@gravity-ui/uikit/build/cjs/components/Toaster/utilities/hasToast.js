"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasToast = hasToast;
const getToastIndex_1 = require("./getToastIndex.js");
function hasToast(toasts, name) {
    return (0, getToastIndex_1.getToastIndex)(toasts, name) !== -1;
}
//# sourceMappingURL=hasToast.js.map
