"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListItemRecursiveRenderer = ListItemRecursiveRenderer;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../../../utils/cn.js");
const isTreeItemGuard_1 = require("../../utils/isTreeItemGuard.js");
require("./ListRecursiveRenderer.css");
const b = (0, cn_1.block)('list-recursive-renderer');
// Saves the nested html structure for tree data structure
function ListItemRecursiveRenderer({ id, itemSchema, list, ...props }) {
    const node = props.children(id, list.structure.idToFlattenIndex[id]);
    if ((0, isTreeItemGuard_1.isTreeItemGuard)(itemSchema) && itemSchema.children) {
        const isExpanded = list.state.expandedById && id in list.state.expandedById
            ? list.state.expandedById[id]
            : true;
        return ((0, jsx_runtime_1.jsxs)("ul", { style: props.style, className: b(null, props.className), role: "group", children: [node, isExpanded &&
                    Boolean(list.structure.groupsState[id]?.childrenIds) &&
                    itemSchema.children.map((item, index) => ((0, jsx_runtime_1.jsx)(ListItemRecursiveRenderer, { list: list, id: list.structure.groupsState[id].childrenIds[index], itemSchema: item, ...props }, index)))] }));
    }
    return node;
}
//# sourceMappingURL=ListRecursiveRenderer.js.map
