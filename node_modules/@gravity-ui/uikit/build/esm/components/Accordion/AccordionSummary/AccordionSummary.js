'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { KeyCode } from "../../../constants.js";
import { useUniqId } from "../../../hooks/index.js";
import { isOfType } from "../../utils/isOfType.js";
import { useAccordion } from "../AccordionContext.js";
import { accordionSummaryBlock } from "../constants.js";
import "./AccordionSummary.css";
/**
 * Marker component for detecting AccordionSummary in AccordionItem.
 * The actual rendering is done by AccordionSummaryContent inside Disclosure.Summary.
 */
export function AccordionSummary(_props) {
    return null;
}
export function AccordionSummaryContent(props) {
    const { children, disclosureProps, defaultSummary } = props;
    const { registerSummary, unregisterSummary, getSummaryRefs, arrowPosition, size, ariaLevel } = useAccordion();
    const summaryId = useUniqId();
    const [buttonElement, setButtonElement] = React.useState(null);
    React.useEffect(() => {
        if (buttonElement) {
            const summaryRef = {
                element: buttonElement,
                disabled: buttonElement.disabled,
            };
            registerSummary(summaryId, summaryRef);
        }
        return () => {
            unregisterSummary(summaryId);
        };
    }, [summaryId, buttonElement, registerSummary, unregisterSummary]);
    const handleKeyDown = (e) => {
        if (e.key === KeyCode.ARROW_DOWN ||
            e.key === KeyCode.ARROW_UP ||
            e.key === KeyCode.HOME ||
            e.key === KeyCode.END) {
            e.preventDefault();
            const summaryRefs = getSummaryRefs();
            if (summaryRefs.length === 0) {
                return;
            }
            if (e.key === KeyCode.HOME) {
                summaryRefs[0]?.element.focus();
                return;
            }
            if (e.key === KeyCode.END) {
                summaryRefs[summaryRefs.length - 1]?.element.focus();
                return;
            }
            const currentIndex = summaryRefs.findIndex((ref) => ref.element === e.currentTarget);
            if (currentIndex === -1) {
                return;
            }
            const nextIndex = e.key === KeyCode.ARROW_DOWN
                ? (currentIndex + 1) % summaryRefs.length
                : (currentIndex - 1 + summaryRefs.length) % summaryRefs.length;
            summaryRefs?.[nextIndex]?.element.focus();
        }
    };
    const enhancedProps = {
        ...disclosureProps,
        onKeyDown: (e) => {
            handleKeyDown(e);
            if (disclosureProps.onKeyDown) {
                disclosureProps.onKeyDown(e);
            }
        },
        ref: (element) => {
            setButtonElement(element);
        },
    };
    return (_jsx("div", { role: 'heading', "aria-level": ariaLevel, className: accordionSummaryBlock({ size, arrow_position: arrowPosition }), children: children(enhancedProps, defaultSummary) }));
}
export const isAccordionSummaryComponent = isOfType(AccordionSummary);
AccordionSummary.displayName = 'AccordionSummary';
//# sourceMappingURL=AccordionSummary.js.map
