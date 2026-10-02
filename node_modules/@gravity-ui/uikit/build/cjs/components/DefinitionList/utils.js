"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnbreakableOver = isUnbreakableOver;
function isUnbreakableOver(limit) {
    return function (value) {
        const posibleLines = value.split(/\s+/);
        return posibleLines.some((line) => line.length > limit);
    };
}
//# sourceMappingURL=utils.js.map
