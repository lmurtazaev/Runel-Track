"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Popover_classname_1 = require("../../Popover.classname.js");
const Content = ({ secondary, htmlContent, content, className }) => {
    if (!htmlContent && !content) {
        return null;
    }
    if (htmlContent) {
        return ((0, jsx_runtime_1.jsx)("div", { className: (0, Popover_classname_1.cnPopover)('tooltip-content', { secondary }, className), dangerouslySetInnerHTML: {
                __html: htmlContent,
            } }));
    }
    if (content) {
        return ((0, jsx_runtime_1.jsx)("div", { className: (0, Popover_classname_1.cnPopover)('tooltip-content', { secondary }, className), children: content }));
    }
    return null;
};
exports.Content = Content;
//# sourceMappingURL=Content.js.map
