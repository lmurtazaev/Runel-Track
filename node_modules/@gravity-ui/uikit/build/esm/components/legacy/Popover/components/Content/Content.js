import { jsx as _jsx } from "react/jsx-runtime";
import { cnPopover } from "../../Popover.classname.js";
export const Content = ({ secondary, htmlContent, content, className }) => {
    if (!htmlContent && !content) {
        return null;
    }
    if (htmlContent) {
        return (_jsx("div", { className: cnPopover('tooltip-content', { secondary }, className), dangerouslySetInnerHTML: {
                __html: htmlContent,
            } }));
    }
    if (content) {
        return (_jsx("div", { className: cnPopover('tooltip-content', { secondary }, className), children: content }));
    }
    return null;
};
//# sourceMappingURL=Content.js.map
