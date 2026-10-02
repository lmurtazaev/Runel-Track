"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useList = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useFlattenListItems_1 = require("./useFlattenListItems.js");
const useListParsedState_1 = require("./useListParsedState.js");
const useListState_1 = require("./useListState.js");
/**
 * Take array of items as a argument with params described what type of list initial data represents.
 */
const useList = ({ items, getItemId, defaultExpandedState = 'expanded', withExpandedState = true, initialState: initialValues, controlledState, }) => {
    const { itemsById, groupsState, itemsState, initialState } = (0, useListParsedState_1.useListParsedState)({
        items,
        getItemId,
        defaultExpandedState,
    });
    const initValues = React.useMemo(() => {
        return {
            expandedById: { ...initialState.expandedById, ...initialValues?.expandedById },
            selectedById: { ...initialState.selectedById, ...initialValues?.selectedById },
            disabledById: { ...initialState.disabledById, ...initialValues?.disabledById },
            activeItemId: initialValues?.activeItemId,
        };
    }, [
        initialState.disabledById,
        initialState.expandedById,
        initialState.selectedById,
        initialValues?.activeItemId,
        initialValues?.disabledById,
        initialValues?.expandedById,
        initialValues?.selectedById,
    ]);
    const innerState = (0, useListState_1.useListState)({
        initialState: initValues,
        withExpandedState,
    });
    const realState = React.useMemo(() => {
        if (controlledState) {
            return {
                ...innerState,
                ...controlledState,
            };
        }
        return innerState;
    }, [controlledState, innerState]);
    const { visibleFlattenIds, idToFlattenIndex, rootIds } = (0, useFlattenListItems_1.useFlattenListItems)({
        items,
        /**
         * By default controlled from list items declaration state
         */
        expandedById: realState.expandedById,
        getItemId,
    });
    return {
        state: realState,
        structure: {
            rootIds,
            items,
            visibleFlattenIds,
            idToFlattenIndex,
            itemsById,
            groupsState,
            itemsState,
        },
    };
};
exports.useList = useList;
//# sourceMappingURL=useList.js.map
