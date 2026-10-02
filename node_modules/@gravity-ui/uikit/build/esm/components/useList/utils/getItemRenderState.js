import { getListItemQa } from "./getListItemQa.js";
/**
 * Map list state and parsed list state to item render props
 */
export const getItemRenderState = ({ qa, list, onItemClick, mapItemDataToContentProps, size = 'm', multiple = false, id, }) => {
    const context = {
        ...list.structure.itemsState[id],
        ...list.structure.groupsState[id],
        isLastItem: id === list.structure.visibleFlattenIds[list.structure.visibleFlattenIds.length - 1],
    };
    const props = {
        id,
        size,
        selected: Boolean(list.state.selectedById[id]),
        disabled: Boolean(list.state.disabledById?.[id]),
        active: id === list.state.activeItemId,
        onClick: onItemClick ? (e) => onItemClick({ id }, e) : undefined,
        selectionViewType: Boolean(multiple) && !context.childrenIds ? 'multiple' : 'single', // no multiple selection at group nodes
        content: {
            expanded: list.state.expandedById?.[id],
            indentation: context.indentation,
            isGroup: list.state.expandedById && id in list.state.expandedById,
            ...mapItemDataToContentProps(list.structure.itemsById[id]),
        },
    };
    if (qa) {
        props.qa = getListItemQa(qa, id);
    }
    return { data: list.structure.itemsById[id], props, context };
};
//# sourceMappingURL=getItemRenderState.js.map
