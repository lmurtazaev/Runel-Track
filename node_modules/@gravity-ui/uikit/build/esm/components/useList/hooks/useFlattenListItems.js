import * as React from 'react';
import { flattenItems } from "../utils/flattenItems.js";
/**
 * Pick ids from items and flatten children.
 * Returns flatten ids list tree structure representation.
 * Not included items if they in `expandedById` map
 */
export function useFlattenListItems({ items, expandedById, getItemId, }) {
    const order = React.useMemo(() => {
        return flattenItems({ items, expandedById, getItemId });
    }, [items, expandedById, getItemId]);
    return order;
}
//# sourceMappingURL=useFlattenListItems.js.map
