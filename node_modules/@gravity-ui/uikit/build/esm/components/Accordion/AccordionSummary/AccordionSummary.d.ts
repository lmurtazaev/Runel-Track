import * as React from 'react';
import type { DisclosureSummaryRenderFunctionProps } from "../../Disclosure/DisclosureSummary/DisclosureSummary.js";
import type { QAProps } from "../../types.js";
import "./AccordionSummary.css";
export type AccordionSummaryRenderProps = DisclosureSummaryRenderFunctionProps & {
    ref: (element: HTMLButtonElement | null) => void;
};
export type AccordionSummaryProps = QAProps & {
    children: (props: DisclosureSummaryRenderFunctionProps, defaultSummary: React.ReactElement) => React.ReactElement;
};
/**
 * Marker component for detecting AccordionSummary in AccordionItem.
 * The actual rendering is done by AccordionSummaryContent inside Disclosure.Summary.
 */
export declare function AccordionSummary(_props: AccordionSummaryProps): React.ReactNode;
export declare namespace AccordionSummary {
    var displayName: string;
}
export type AccordionSummaryContentProps = QAProps & {
    children: (props: AccordionSummaryRenderProps, defaultSummary: React.ReactElement) => React.ReactElement;
    disclosureProps: DisclosureSummaryRenderFunctionProps;
    defaultSummary: React.ReactElement;
};
export declare function AccordionSummaryContent(props: AccordionSummaryContentProps): import("react/jsx-runtime").JSX.Element;
export declare const isAccordionSummaryComponent: (component: unknown) => component is React.ReactElement<AccordionSummaryProps, string | React.ComponentType<AccordionSummaryProps>>;
