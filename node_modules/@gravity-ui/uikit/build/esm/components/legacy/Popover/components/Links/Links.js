import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Link } from "../../../../Link/index.js";
import { cnPopover } from "../../Popover.classname.js";
export const Links = ({ links }) => {
    if (links.length === 0) {
        return null;
    }
    return (_jsx("div", { className: cnPopover('tooltip-links'), children: links.map((link, index) => {
            const { text, href, target = '_blank', onClick } = link;
            return (_jsxs(React.Fragment, { children: [_jsx(Link, { href: href, target: target, onClick: onClick, className: cnPopover('tooltip-link'), children: text }), _jsx("br", {})] }, `link-${index}`));
        }) }));
};
//# sourceMappingURL=Links.js.map
