import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { block } from "../../utils/cn.js";
import { TocItem } from "../TocItem/index.js";
import "./TocSections.css";
const b = block('toc');
export function TocSections(props) {
    const { value: activeValue, items, onUpdate, childItem, depth = 1, onItemClick } = props;
    if (depth > 6) {
        return null;
    }
    return (_jsx("ul", { className: b('sections'), children: items.map(({ value, content, href, items: childrenItems }) => (_jsxs("li", { "aria-current": activeValue === value, children: [_jsx(TocItem, { content: content, href: href, active: activeValue === value, onClick: (event) => {
                        onItemClick?.(event);
                        if (value === undefined || !onUpdate) {
                            return;
                        }
                        onUpdate?.(value);
                    }, childItem: childItem, depth: depth }), childrenItems && childrenItems.length > 0 && (_jsx(TocSections, { items: childrenItems, onUpdate: onUpdate, childItem: true, depth: depth + 1, value: activeValue }))] }, value ?? href))) }));
}
//# sourceMappingURL=TocSections.js.map
