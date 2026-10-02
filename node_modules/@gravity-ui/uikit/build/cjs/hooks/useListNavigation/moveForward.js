"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveForward = moveForward;
function moveForward(items, activeItemIndex, steps = 1, skip) {
    const newActiveItemIndex = (activeItemIndex + steps) % items.length;
    if (skip && skip(items[newActiveItemIndex])) {
        return moveForward(items, newActiveItemIndex, 1, skip);
    }
    return newActiveItemIndex;
}
//# sourceMappingURL=moveForward.js.map
