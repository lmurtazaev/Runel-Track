import { isTreeItemGuard } from "./isTreeItemGuard.js";
export const getListItemId = ({ item, groupedId, getItemId }) => {
    let id = groupedId;
    if (typeof getItemId === 'function') {
        id = getItemId(isTreeItemGuard(item) ? item.data : item);
    }
    else if (item && typeof item === 'object' && 'id' in item && item.id) {
        id = item.id;
    }
    return id;
};
//# sourceMappingURL=getListItemId.js.map
