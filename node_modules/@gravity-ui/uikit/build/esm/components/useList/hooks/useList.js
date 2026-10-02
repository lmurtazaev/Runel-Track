import * as React from 'react';
import { useFlattenListItems } from "./useFlattenListItems.js";
import { useListParsedState } from "./useListParsedState.js";
import { useListState } from "./useListState.js";
/**
 * Take array of items as a argument with params described what type of list initial data represents.
 */
export const useList = ({ items, getItemId, defaultExpandedState = 'expanded', withExpandedState = true, initialState: initialValues, controlledState, }) => {
    const { itemsById, groupsState, itemsState, initialState } = useListParsedState({
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
    const innerState = useListState({
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
    const { visibleFlattenIds, idToFlattenIndex, rootIds } = useFlattenListItems({
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
//# sourceMappingURL=useList.js.map
