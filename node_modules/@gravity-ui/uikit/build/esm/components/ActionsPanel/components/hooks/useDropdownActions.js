'use client';
import groupBy from "lodash/groupBy.js";
export const useDropdownActions = ({ buttonActions, restActions, visibilityMap, }) => {
    const actions = [
        ...buttonActions.filter((action) => !visibilityMap[action.id]),
        ...restActions,
    ];
    const groups = groupBy(actions, (action) => action.dropdown.group);
    const usedGroups = new Set();
    const dropdownItems = [];
    for (const action of actions) {
        const group = action.dropdown.group;
        if (typeof group === 'undefined') {
            dropdownItems.push(action.dropdown.item);
            continue;
        }
        if (usedGroups.has(group)) {
            continue;
        }
        usedGroups.add(group);
        dropdownItems.push(groups[group].map((groupedAction) => groupedAction.dropdown.item));
    }
    return dropdownItems;
};
//# sourceMappingURL=useDropdownActions.js.map
