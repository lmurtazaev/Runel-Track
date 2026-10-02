import * as React from 'react';
import type { QAProps } from "../../types.js";
export interface DisclosureSummaryRenderFunctionProps extends QAProps {
    onClick: (e: React.SyntheticEvent) => void;
    ariaControls: string;
    id: string;
    expanded: boolean;
    onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    className?: string;
}
export interface DisclosureSummaryProps extends QAProps {
    children: (props: DisclosureSummaryRenderFunctionProps, defaultSummary: React.ReactElement) => React.ReactElement;
}
export declare function DisclosureSummary({ children: renderFunction, qa }: DisclosureSummaryProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export declare namespace DisclosureSummary {
    var displayName: string;
}
export declare const DefaultDisclosureSummary: React.ForwardRefExoticComponent<DisclosureSummaryRenderFunctionProps & React.RefAttributes<HTMLButtonElement>>;
