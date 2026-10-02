'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TocItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const hooks_1 = require("../../../hooks/index.js");
const cn_1 = require("../../utils/cn.js");
require("./TocItem.css");
const b = (0, cn_1.block)('toc-item');
const TocItem = (props) => {
    const { active = false, childItem = false, content, href, onClick, depth } = props;
    const { onKeyDown } = (0, hooks_1.useActionHandlers)(onClick);
    const item = href === undefined ? ((0, jsx_runtime_1.jsx)("div", { role: "button", tabIndex: 0, className: b('section-link'), onClick: onClick, onKeyDown: onKeyDown, children: content })) : ((0, jsx_runtime_1.jsx)("a", { href: href, onClick: onClick, className: b('section-link'), children: content }));
    return (0, jsx_runtime_1.jsx)("div", { className: b('section', { child: childItem, depth, active }), children: item });
};
exports.TocItem = TocItem;
//# sourceMappingURL=TocItem.js.map
