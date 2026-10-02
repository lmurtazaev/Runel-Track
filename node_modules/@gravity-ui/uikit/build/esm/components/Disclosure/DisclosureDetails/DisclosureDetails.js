'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { getCSSTransitionClassNames } from "../../utils/transition.js";
import { useDisclosureAttributes } from "../DisclosureContext.js";
import { DisclosureQa, b } from "../constants.js";
export function DisclosureDetails({ children, qa, className }) {
    const containerRef = React.useRef(null);
    const { ariaControls, ariaLabelledby, keepMounted, expanded } = useDisclosureAttributes();
    return (_jsx(CSSTransition, { nodeRef: containerRef, in: expanded, addEndListener: (done) => containerRef.current?.addEventListener('animationend', done), classNames: getCSSTransitionClassNames(b), mountOnEnter: !keepMounted, unmountOnExit: !keepMounted, appear: true, children: _jsx("div", { ref: containerRef, id: ariaControls, role: "region", "aria-labelledby": ariaLabelledby, className: b('content', { visible: expanded }, className), "data-qa": qa || DisclosureQa.DETAILS, children: children }) }));
}
DisclosureDetails.displayName = 'DisclosureDetails';
//# sourceMappingURL=DisclosureDetails.js.map
