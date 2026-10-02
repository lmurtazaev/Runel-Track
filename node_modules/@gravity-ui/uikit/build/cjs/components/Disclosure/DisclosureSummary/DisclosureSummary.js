'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultDisclosureSummary = void 0;
exports.DisclosureSummary = DisclosureSummary;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const ArrowToggle_1 = require("../../ArrowToggle/index.js");
const warn_1 = require("../../utils/warn.js");
const DisclosureContext_1 = require("../DisclosureContext.js");
const constants_1 = require("../constants.js");
const ComponentSizeToIconSizeMap = {
    m: 14,
    l: 16,
    xl: 20,
};
function warnAboutPhysicalValues() {
    (0, warn_1.warnOnce)('[Disclosure] Physical values (left, right) of "arrowPosition" property are deprecated. Use logical values (start, end) instead.');
}
function DisclosureSummary({ children: renderFunction, qa }) {
    const handleToggle = (0, DisclosureContext_1.useToggleDisclosure)();
    const { ariaControls, ariaLabelledby: id, expanded, disabled, onSummaryKeyDown: onKeyDown, } = (0, DisclosureContext_1.useDisclosureAttributes)();
    const props = { onClick: handleToggle, ariaControls, id, expanded, disabled, qa, onKeyDown };
    return renderFunction(props, (0, jsx_runtime_1.jsx)(exports.DefaultDisclosureSummary, { ...props }));
}
exports.DefaultDisclosureSummary = React.forwardRef(function DefaultDisclosureSummary({ onClick, ariaControls, id, expanded, disabled, qa, onKeyDown, className }, ref) {
    const { size, summary, arrowPosition } = (0, DisclosureContext_1.useDisclosureAttributes)();
    let arrowMod = arrowPosition;
    if (arrowMod === 'left') {
        warnAboutPhysicalValues();
        arrowMod = 'start';
    }
    if (arrowMod === 'right') {
        warnAboutPhysicalValues();
        arrowMod = 'end';
    }
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-expanded": expanded, className: (0, constants_1.b)('trigger', { disabled, arrow: arrowMod }, className), "aria-controls": ariaControls, id: id, onClick: onClick, disabled: disabled, "data-qa": qa || constants_1.DisclosureQa.SUMMARY, onKeyDown: onKeyDown, ref: ref, children: [(0, jsx_runtime_1.jsx)(ArrowToggle_1.ArrowToggle, { size: ComponentSizeToIconSizeMap[size], direction: expanded ? 'top' : 'bottom' }), summary] }));
});
DisclosureSummary.displayName = 'DisclosureSummary';
//# sourceMappingURL=DisclosureSummary.js.map
