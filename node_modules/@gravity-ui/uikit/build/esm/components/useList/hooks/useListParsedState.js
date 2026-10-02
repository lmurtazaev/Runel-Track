import * as React from 'react';
import { getListParsedState } from "../utils/getListParsedState.js";
/**
 * From the tree structure of list items we get meta information and
 * flatten list in right order without taking elements that hidden in expanded groups
 */
export function useListParsedState({ items, getItemId: propsGetItemId, defaultExpandedState, }) {
    const getItemId = React.useRef(propsGetItemId).current;
    const result = React.useMemo(() => {
        return getListParsedState({ items, getItemId, defaultExpandedState });
    }, [getItemId, defaultExpandedState, items]);
    return result;
}
//# sourceMappingURL=useListParsedState.js.map
