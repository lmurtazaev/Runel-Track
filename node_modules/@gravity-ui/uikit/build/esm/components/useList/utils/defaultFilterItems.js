import { isTreeItemGuard } from "./isTreeItemGuard.js";
export function defaultFilterItems(items, filterFn) {
    const getChildren = (result, item) => {
        if (isTreeItemGuard(item) && item.children) {
            const children = item.children.reduce(getChildren, []);
            if (children.length) {
                result.push({ ...item, data: item.data, children });
            }
            else if (filterFn(item.data)) {
                result.push({ ...item, data: item.data, children: [] });
            }
        }
        else if (isTreeItemGuard(item) && filterFn(item.data)) {
            const { children: _children, ...newItem } = item;
            result.push(newItem);
        }
        else if (!isTreeItemGuard(item) && filterFn(item)) {
            result.push(item);
        }
        return result;
    };
    const res = items.reduce(getChildren, []);
    return res;
}
//# sourceMappingURL=defaultFilterItems.js.map
