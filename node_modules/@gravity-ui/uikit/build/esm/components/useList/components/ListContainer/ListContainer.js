import { jsx as _jsx } from "react/jsx-runtime";
import { ListContainerView } from "../ListContainerView/index.js";
import { ListItemRecursiveRenderer } from "../ListRecursiveRenderer/ListRecursiveRenderer.js";
export function ListContainer({ containerRef, renderItem, list, ...props }) {
    return (
    /*
     * TODO: Remove casting in React 19 (https://github.com/gravity-ui/uikit/issues/2537)
     */
    _jsx(ListContainerView, { ref: containerRef, ...props, children: list.structure.items.map((item, index) => (_jsx(ListItemRecursiveRenderer, { itemSchema: item, id: list.structure.rootIds[index], list: list, children: renderItem }, index))) }));
}
//# sourceMappingURL=ListContainer.js.map
