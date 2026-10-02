"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Links = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const Link_1 = require("../../../../Link/index.js");
const Popover_classname_1 = require("../../Popover.classname.js");
const Links = ({ links }) => {
    if (links.length === 0) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, Popover_classname_1.cnPopover)('tooltip-links'), children: links.map((link, index) => {
            const { text, href, target = '_blank', onClick } = link;
            return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsx)(Link_1.Link, { href: href, target: target, onClick: onClick, className: (0, Popover_classname_1.cnPopover)('tooltip-link'), children: text }), (0, jsx_runtime_1.jsx)("br", {})] }, `link-${index}`));
        }) }));
};
exports.Links = Links;
//# sourceMappingURL=Links.js.map
