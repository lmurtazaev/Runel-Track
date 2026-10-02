"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListItemId = void 0;
const isTreeItemGuard_1 = require("./isTreeItemGuard.js");
const getListItemId = ({ item, groupedId, getItemId }) => {
    let id = groupedId;
    if (typeof getItemId === 'function') {
        id = getItemId((0, isTreeItemGuard_1.isTreeItemGuard)(item) ? item.data : item);
    }
    else if (item && typeof item === 'object' && 'id' in item && item.id) {
        id = item.id;
    }
    return id;
};
exports.getListItemId = getListItemId;
//# sourceMappingURL=getListItemId.js.map
