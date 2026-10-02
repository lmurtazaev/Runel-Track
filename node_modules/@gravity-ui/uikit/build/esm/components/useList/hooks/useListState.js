import * as React from 'react';
export const useListState = ({ initialState, withExpandedState }) => {
    const initialStateRef = React.useRef(initialState);
    const needToUpdateInitValues = initialStateRef.current !== initialState;
    initialStateRef.current = initialState;
    const [disabledById, setDisabled] = React.useState(() => initialState?.disabledById ?? {});
    const [selectedById, setSelected] = React.useState(() => initialState?.selectedById ?? {});
    const [expandedById, setExpanded] = React.useState(() => initialState?.expandedById ?? {});
    const [activeItemId, setActiveItemId] = React.useState(() => initialState?.activeItemId);
    if (needToUpdateInitValues) {
        if (initialState?.disabledById) {
            setDisabled((prevValues) => ({ ...initialState.disabledById, ...prevValues }));
        }
        if (initialState?.selectedById) {
            setSelected((prevValues) => ({ ...initialState.selectedById, ...prevValues }));
        }
        if (initialState?.expandedById) {
            setExpanded((prevValues) => ({ ...initialState.expandedById, ...prevValues }));
        }
        setActiveItemId((prevValue) => prevValue ?? initialState?.activeItemId);
    }
    const result = {
        disabledById,
        selectedById,
        activeItemId,
        setDisabled,
        setSelected,
        setActiveItemId,
    };
    if (withExpandedState) {
        result.expandedById = expandedById;
        result.setExpanded = setExpanded;
    }
    return result;
};
//# sourceMappingURL=useListState.js.map
