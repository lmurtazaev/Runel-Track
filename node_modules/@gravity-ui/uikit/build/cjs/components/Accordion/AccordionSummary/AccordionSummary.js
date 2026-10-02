'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAccordionSummaryComponent = void 0;
exports.AccordionSummary = AccordionSummary;
exports.AccordionSummaryContent = AccordionSummaryContent;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const constants_1 = require("../../../constants.js");
const hooks_1 = require("../../../hooks/index.js");
const isOfType_1 = require("../../utils/isOfType.js");
const AccordionContext_1 = require("../AccordionContext.js");
const constants_2 = require("../constants.js");
require("./AccordionSummary.css");
/**
 * Marker component for detecting AccordionSummary in AccordionItem.
 * The actual rendering is done by AccordionSummaryContent inside Disclosure.Summary.
 */
function AccordionSummary(_props) {
    return null;
}
function AccordionSummaryContent(props) {
    const { children, disclosureProps, defaultSummary } = props;
    const { registerSummary, unregisterSummary, getSummaryRefs, arrowPosition, size, ariaLevel } = (0, AccordionContext_1.useAccordion)();
    const summaryId = (0, hooks_1.useUniqId)();
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
        if (e.key === constants_1.KeyCode.ARROW_DOWN ||
            e.key === constants_1.KeyCode.ARROW_UP ||
            e.key === constants_1.KeyCode.HOME ||
            e.key === constants_1.KeyCode.END) {
            e.preventDefault();
            const summaryRefs = getSummaryRefs();
            if (summaryRefs.length === 0) {
                return;
            }
            if (e.key === constants_1.KeyCode.HOME) {
                summaryRefs[0]?.element.focus();
                return;
            }
            if (e.key === constants_1.KeyCode.END) {
                summaryRefs[summaryRefs.length - 1]?.element.focus();
                return;
            }
            const currentIndex = summaryRefs.findIndex((ref) => ref.element === e.currentTarget);
            if (currentIndex === -1) {
                return;
            }
            const nextIndex = e.key === constants_1.KeyCode.ARROW_DOWN
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
    return ((0, jsx_runtime_1.jsx)("div", { role: 'heading', "aria-level": ariaLevel, className: (0, constants_2.accordionSummaryBlock)({ size, arrow_position: arrowPosition }), children: children(enhancedProps, defaultSummary) }));
}
exports.isAccordionSummaryComponent = (0, isOfType_1.isOfType)(AccordionSummary);
AccordionSummary.displayName = 'AccordionSummary';
//# sourceMappingURL=AccordionSummary.js.map
