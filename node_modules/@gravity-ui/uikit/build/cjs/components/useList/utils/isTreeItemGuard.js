"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTreeItemGuard = void 0;
const isTreeItemGuard = (item) => {
    return item !== null && typeof item === 'object' && 'data' in item;
};
exports.isTreeItemGuard = isTreeItemGuard;
//# sourceMappingURL=isTreeItemGuard.js.map
