import * as React from 'react';
import type { QAProps } from "../types.js";
import { DisclosureDetails } from "./DisclosureDetails/DisclosureDetails.js";
import { DisclosureSummary } from "./DisclosureSummary/DisclosureSummary.js";
import "./Disclosure.css";
export type DisclosureSize = 'm' | 'l' | 'xl';
export type DisclosureArrowPosition = 'left' | 'right' | 'start' | 'end';
export interface DisclosureComposition {
    Summary: typeof DisclosureSummary;
    Details: typeof DisclosureDetails;
}
export interface DisclosureProps extends QAProps {
    /** Disclosure size */
    size?: DisclosureSize;
    /** Disabled state */
    disabled?: boolean;
    /** Default opening state */
    defaultExpanded?: boolean;
    /** Controlled opening state */
    expanded?: boolean;
    /** Control position */
    arrowPosition?: DisclosureArrowPosition;
    /** Content summary */
    summary?: React.ReactNode;
    /** Class name */
    className?: string;
    /** Content */
    children?: React.ReactNode;
    /** Keep content in DOM */
    keepMounted?: boolean;
    /** Callback fired when the expand/collapse state is changed  */
    onUpdate?: (expanded: boolean) => void;
    /** Callback fires on keyboard events when summary is focused */
    onSummaryKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
}
export declare const Disclosure: React.FunctionComponent<DisclosureProps> & DisclosureComposition;
