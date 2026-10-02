'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCollapseActions = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useDropdownActions_1 = require("./useDropdownActions.js");
const useObserveIntersection_1 = require("./useObserveIntersection.js");
const DEFAULT_MAX_BUTTON_ACTIONS = 4;
const useCollapseActions = (actions, maxRowActions) => {
    const maxActions = Math.max(0, typeof maxRowActions === 'undefined' ? DEFAULT_MAX_BUTTON_ACTIONS : maxRowActions);
    const allActionsCollapsed = React.useMemo(() => {
        return actions.every((action) => action.collapsed);
    }, [actions]);
    const updateObserveKey = React.useMemo(() => actions.map(({ id }) => id).join('/') + maxActions, [actions, maxActions]);
    const [buttonActions, restActions] = React.useMemo(() => {
        const buttonItems = [];
        const restItems = [];
        actions.forEach((action) => {
            if (buttonItems.length < maxActions && !action.collapsed) {
                buttonItems.push(action);
            }
            else {
                restItems.push(action);
            }
        });
        return [buttonItems, restItems];
    }, [actions, maxActions]);
    const { parentRef, visibilityMap, offset } = (0, useObserveIntersection_1.useObserveIntersection)(updateObserveKey);
    const dropdownItems = (0, useDropdownActions_1.useDropdownActions)({ buttonActions, restActions, visibilityMap });
    const isDefaultOffset = allActionsCollapsed || maxActions === 0;
    const showDropdown = (Object.keys(visibilityMap).length > 0 || isDefaultOffset) && dropdownItems.length > 0;
    return {
        buttonActions,
        dropdownItems,
        parentRef,
        offset: isDefaultOffset ? 0 : offset,
        visibilityMap,
        showDropdown,
    };
};
exports.useCollapseActions = useCollapseActions;
//# sourceMappingURL=useCollapseActions.js.map
