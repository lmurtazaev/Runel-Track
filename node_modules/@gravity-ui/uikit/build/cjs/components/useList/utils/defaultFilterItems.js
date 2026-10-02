"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultFilterItems = defaultFilterItems;
const isTreeItemGuard_1 = require("./isTreeItemGuard.js");
function defaultFilterItems(items, filterFn) {
    const getChildren = (result, item) => {
        if ((0, isTreeItemGuard_1.isTreeItemGuard)(item) && item.children) {
            const children = item.children.reduce(getChildren, []);
            if (children.length) {
                result.push({ ...item, data: item.data, children });
            }
            else if (filterFn(item.data)) {
                result.push({ ...item, data: item.data, children: [] });
            }
        }
        else if ((0, isTreeItemGuard_1.isTreeItemGuard)(item) && filterFn(item.data)) {
            const { children: _children, ...newItem } = item;
            result.push(newItem);
        }
        else if (!(0, isTreeItemGuard_1.isTreeItemGuard)(item) && filterFn(item)) {
            result.push(item);
        }
        return result;
    };
    const res = items.reduce(getChildren, []);
    return res;
}
//# sourceMappingURL=defaultFilterItems.js.map
