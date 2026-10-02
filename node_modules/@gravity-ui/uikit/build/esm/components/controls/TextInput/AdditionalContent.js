import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { block } from "../../utils/cn.js";
const b = block('text-input');
export const AdditionalContent = React.forwardRef(function AdditionalContent({ placement, children, onClick }, ref) {
    if (!children) {
        return null;
    }
    return (
    // It is used to focus the control input if non-interaction element is provided.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    _jsx("div", { ref: ref, className: b('additional-content', { placement }), onClick: onClick, children: children }));
});
//# sourceMappingURL=AdditionalContent.js.map
