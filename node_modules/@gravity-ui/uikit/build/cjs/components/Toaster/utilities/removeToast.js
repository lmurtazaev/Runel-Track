"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeToast = removeToast;
const hasToast_1 = require("./hasToast.js");
function removeToast(toasts, name) {
    if (!(0, hasToast_1.hasToast)(toasts, name)) {
        return toasts;
    }
    return toasts.filter((toast) => toast.name !== name);
}
//# sourceMappingURL=removeToast.js.map
