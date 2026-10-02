"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFlattenListItems = useFlattenListItems;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const flattenItems_1 = require("../utils/flattenItems.js");
/**
 * Pick ids from items and flatten children.
 * Returns flatten ids list tree structure representation.
 * Not included items if they in `expandedById` map
 */
function useFlattenListItems({ items, expandedById, getItemId, }) {
    const order = React.useMemo(() => {
        return (0, flattenItems_1.flattenItems)({ items, expandedById, getItemId });
    }, [items, expandedById, getItemId]);
    return order;
}
//# sourceMappingURL=useFlattenListItems.js.map
