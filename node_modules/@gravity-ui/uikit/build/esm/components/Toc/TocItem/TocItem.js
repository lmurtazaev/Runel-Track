'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useActionHandlers } from "../../../hooks/index.js";
import { block } from "../../utils/cn.js";
import "./TocItem.css";
const b = block('toc-item');
export const TocItem = (props) => {
    const { active = false, childItem = false, content, href, onClick, depth } = props;
    const { onKeyDown } = useActionHandlers(onClick);
    const item = href === undefined ? (_jsx("div", { role: "button", tabIndex: 0, className: b('section-link'), onClick: onClick, onKeyDown: onKeyDown, children: content })) : (_jsx("a", { href: href, onClick: onClick, className: b('section-link'), children: content }));
    return _jsx("div", { className: b('section', { child: childItem, depth, active }), children: item });
};
//# sourceMappingURL=TocItem.js.map
