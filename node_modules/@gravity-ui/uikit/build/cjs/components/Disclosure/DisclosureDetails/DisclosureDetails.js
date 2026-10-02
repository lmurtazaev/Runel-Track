'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisclosureDetails = DisclosureDetails;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const react_transition_group_1 = require("react-transition-group");
const transition_1 = require("../../utils/transition.js");
const DisclosureContext_1 = require("../DisclosureContext.js");
const constants_1 = require("../constants.js");
function DisclosureDetails({ children, qa, className }) {
    const containerRef = React.useRef(null);
    const { ariaControls, ariaLabelledby, keepMounted, expanded } = (0, DisclosureContext_1.useDisclosureAttributes)();
    return ((0, jsx_runtime_1.jsx)(react_transition_group_1.CSSTransition, { nodeRef: containerRef, in: expanded, addEndListener: (done) => containerRef.current?.addEventListener('animationend', done), classNames: (0, transition_1.getCSSTransitionClassNames)(constants_1.b), mountOnEnter: !keepMounted, unmountOnExit: !keepMounted, appear: true, children: (0, jsx_runtime_1.jsx)("div", { ref: containerRef, id: ariaControls, role: "region", "aria-labelledby": ariaLabelledby, className: (0, constants_1.b)('content', { visible: expanded }, className), "data-qa": qa || constants_1.DisclosureQa.DETAILS, children: children }) }));
}
DisclosureDetails.displayName = 'DisclosureDetails';
//# sourceMappingURL=DisclosureDetails.js.map
