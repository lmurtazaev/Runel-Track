"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(count, pluralForms) {
    if (count === 0) {
        return pluralForms.None;
    }
    if (count === 1 || count === -1) {
        return pluralForms.One;
    }
    return pluralForms.Many;
}
exports.default = default_1;
