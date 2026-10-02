"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListContainer = ListContainer;
const jsx_runtime_1 = require("react/jsx-runtime");
const ListContainerView_1 = require("../ListContainerView/index.js");
const ListRecursiveRenderer_1 = require("../ListRecursiveRenderer/ListRecursiveRenderer.js");
function ListContainer({ containerRef, renderItem, list, ...props }) {
    return (
    /*
     * TODO: Remove casting in React 19 (https://github.com/gravity-ui/uikit/issues/2537)
     */
    (0, jsx_runtime_1.jsx)(ListContainerView_1.ListContainerView, { ref: containerRef, ...props, children: list.structure.items.map((item, index) => ((0, jsx_runtime_1.jsx)(ListRecursiveRenderer_1.ListItemRecursiveRenderer, { itemSchema: item, id: list.structure.rootIds[index], list: list, children: renderItem }, index))) }));
}
//# sourceMappingURL=ListContainer.js.map
