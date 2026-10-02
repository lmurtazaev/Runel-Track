"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TocSections = TocSections;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../../utils/cn.js");
const TocItem_1 = require("../TocItem/index.js");
require("./TocSections.css");
const b = (0, cn_1.block)('toc');
function TocSections(props) {
    const { value: activeValue, items, onUpdate, childItem, depth = 1, onItemClick } = props;
    if (depth > 6) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("ul", { className: b('sections'), children: items.map(({ value, content, href, items: childrenItems }) => ((0, jsx_runtime_1.jsxs)("li", { "aria-current": activeValue === value, children: [(0, jsx_runtime_1.jsx)(TocItem_1.TocItem, { content: content, href: href, active: activeValue === value, onClick: (event) => {
                        onItemClick?.(event);
                        if (value === undefined || !onUpdate) {
                            return;
                        }
                        onUpdate?.(value);
                    }, childItem: childItem, depth: depth }), childrenItems && childrenItems.length > 0 && ((0, jsx_runtime_1.jsx)(TocSections, { items: childrenItems, onUpdate: onUpdate, childItem: true, depth: depth + 1, value: activeValue }))] }, value ?? href))) }));
}
//# sourceMappingURL=TocSections.js.map
