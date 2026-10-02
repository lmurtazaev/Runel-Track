'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDropdownActions = void 0;
const tslib_1 = require("tslib");
const groupBy_1 = tslib_1.__importDefault(require("lodash/groupBy.js"));
const useDropdownActions = ({ buttonActions, restActions, visibilityMap, }) => {
    const actions = [
        ...buttonActions.filter((action) => !visibilityMap[action.id]),
        ...restActions,
    ];
    const groups = (0, groupBy_1.default)(actions, (action) => action.dropdown.group);
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
exports.useDropdownActions = useDropdownActions;
//# sourceMappingURL=useDropdownActions.js.map
