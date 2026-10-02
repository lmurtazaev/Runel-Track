"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toItemList = toItemList;
function toItemList(items, separator, path = [], startIndex = 0) {
    const updatedItems = [];
    let addedGroup = false;
    let index = startIndex;
    for (const item of items) {
        if (Array.isArray(item)) {
            const groupItems = toItemList(item, separator, path, index);
            if (updatedItems.length !== 0 && groupItems.length !== 0) {
                updatedItems.push(separator);
            }
            updatedItems.push(...groupItems);
            index += groupItems.length;
            addedGroup = true;
        }
        else {
            if (item.hidden) {
                continue;
            }
            if (addedGroup) {
                updatedItems.push(separator);
            }
            const updatedItem = {
                ...item,
                path: [...path, index++],
            };
            if (item.items) {
                updatedItem.items = toItemList(item.items, separator, updatedItem.path);
            }
            updatedItems.push(updatedItem);
            addedGroup = false;
        }
    }
    return updatedItems;
}
//# sourceMappingURL=toItemList.js.map
