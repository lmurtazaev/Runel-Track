"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveBack = moveBack;
function moveBack(items, activeItemIndex, steps = 1, skip) {
    const newActiveItemIndex = (items.length + activeItemIndex - (steps % items.length)) % items.length;
    if (skip && skip(items[newActiveItemIndex])) {
        return moveBack(items, newActiveItemIndex, 1, skip);
    }
    return newActiveItemIndex;
}
//# sourceMappingURL=moveBack.js.map
