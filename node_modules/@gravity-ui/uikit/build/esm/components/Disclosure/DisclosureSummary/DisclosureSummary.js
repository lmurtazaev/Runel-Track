'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { ArrowToggle } from "../../ArrowToggle/index.js";
import { warnOnce } from "../../utils/warn.js";
import { useDisclosureAttributes, useToggleDisclosure } from "../DisclosureContext.js";
import { DisclosureQa, b } from "../constants.js";
const ComponentSizeToIconSizeMap = {
    m: 14,
    l: 16,
    xl: 20,
};
function warnAboutPhysicalValues() {
    warnOnce('[Disclosure] Physical values (left, right) of "arrowPosition" property are deprecated. Use logical values (start, end) instead.');
}
export function DisclosureSummary({ children: renderFunction, qa }) {
    const handleToggle = useToggleDisclosure();
    const { ariaControls, ariaLabelledby: id, expanded, disabled, onSummaryKeyDown: onKeyDown, } = useDisclosureAttributes();
    const props = { onClick: handleToggle, ariaControls, id, expanded, disabled, qa, onKeyDown };
    return renderFunction(props, _jsx(DefaultDisclosureSummary, { ...props }));
}
export const DefaultDisclosureSummary = React.forwardRef(function DefaultDisclosureSummary({ onClick, ariaControls, id, expanded, disabled, qa, onKeyDown, className }, ref) {
    const { size, summary, arrowPosition } = useDisclosureAttributes();
    let arrowMod = arrowPosition;
    if (arrowMod === 'left') {
        warnAboutPhysicalValues();
        arrowMod = 'start';
    }
    if (arrowMod === 'right') {
        warnAboutPhysicalValues();
        arrowMod = 'end';
    }
    return (_jsxs("button", { type: "button", "aria-expanded": expanded, className: b('trigger', { disabled, arrow: arrowMod }, className), "aria-controls": ariaControls, id: id, onClick: onClick, disabled: disabled, "data-qa": qa || DisclosureQa.SUMMARY, onKeyDown: onKeyDown, ref: ref, children: [_jsx(ArrowToggle, { size: ComponentSizeToIconSizeMap[size], direction: expanded ? 'top' : 'bottom' }), summary] }));
});
DisclosureSummary.displayName = 'DisclosureSummary';
//# sourceMappingURL=DisclosureSummary.js.map
