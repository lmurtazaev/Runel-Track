import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { block } from "../../../utils/cn.js";
import { isTreeItemGuard } from "../../utils/isTreeItemGuard.js";
import "./ListRecursiveRenderer.css";
const b = block('list-recursive-renderer');
// Saves the nested html structure for tree data structure
export function ListItemRecursiveRenderer({ id, itemSchema, list, ...props }) {
    const node = props.children(id, list.structure.idToFlattenIndex[id]);
    if (isTreeItemGuard(itemSchema) && itemSchema.children) {
        const isExpanded = list.state.expandedById && id in list.state.expandedById
            ? list.state.expandedById[id]
            : true;
        return (_jsxs("ul", { style: props.style, className: b(null, props.className), role: "group", children: [node, isExpanded &&
                    Boolean(list.structure.groupsState[id]?.childrenIds) &&
                    itemSchema.children.map((item, index) => (_jsx(ListItemRecursiveRenderer, { list: list, id: list.structure.groupsState[id].childrenIds[index], itemSchema: item, ...props }, index)))] }));
    }
    return node;
}
//# sourceMappingURL=ListRecursiveRenderer.js.map
