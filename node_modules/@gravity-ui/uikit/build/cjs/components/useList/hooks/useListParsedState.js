"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useListParsedState = useListParsedState;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const getListParsedState_1 = require("../utils/getListParsedState.js");
/**
 * From the tree structure of list items we get meta information and
 * flatten list in right order without taking elements that hidden in expanded groups
 */
function useListParsedState({ items, getItemId: propsGetItemId, defaultExpandedState, }) {
    const getItemId = React.useRef(propsGetItemId).current;
    const result = React.useMemo(() => {
        return (0, getListParsedState_1.getListParsedState)({ items, getItemId, defaultExpandedState });
    }, [getItemId, defaultExpandedState, items]);
    return result;
}
//# sourceMappingURL=useListParsedState.js.map
