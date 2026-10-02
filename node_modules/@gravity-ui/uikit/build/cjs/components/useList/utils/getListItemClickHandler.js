"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListItemClickHandler = void 0;
const getListItemClickHandler = ({ list, multiple, }) => {
    const onItemClick = ({ id }) => {
        if (list.state.disabledById[id])
            return;
        // always activate selected item
        list.state.setActiveItemId(id);
        if (list.state.expandedById && id in list.state.expandedById && list.state.setExpanded) {
            list.state.setExpanded((prevState) => ({
                ...prevState,
                [id]: !prevState[id], // expanded by id
            }));
        }
        else {
            list.state.setSelected((prevState) => ({
                ...(multiple ? prevState : {}),
                [id]: multiple ? !prevState[id] : true, // always select on click in single select variant
            }));
        }
    };
    return onItemClick;
};
exports.getListItemClickHandler = getListItemClickHandler;
//# sourceMappingURL=getListItemClickHandler.js.map
