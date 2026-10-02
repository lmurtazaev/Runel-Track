import * as React from 'react';
import type { DisclosureProps } from "./Disclosure.js";
interface DisclosureProviderProps extends Required<Omit<DisclosureProps, 'className' | 'expanded' | 'qa' | 'onSummaryKeyDown'>> {
    expanded: DisclosureProps['expanded'];
    onSummaryKeyDown?: DisclosureProps['onSummaryKeyDown'];
}
export declare const DisclosureAttributesContext: React.Context<(Required<Omit<DisclosureProps, "onUpdate" | "className" | "children" | "qa" | "onSummaryKeyDown" | "defaultExpanded">> & {
    expanded: boolean;
    ariaControls: string;
    ariaLabelledby: string;
    onSummaryKeyDown?: DisclosureProps["onSummaryKeyDown"];
}) | undefined>;
export declare const DisclosureToggleContext: React.Context<((e: React.SyntheticEvent) => void) | undefined>;
export declare function DisclosureProvider(props: DisclosureProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useDisclosureAttributes(): Required<Omit<DisclosureProps, "onUpdate" | "className" | "children" | "qa" | "onSummaryKeyDown" | "defaultExpanded">> & {
    expanded: boolean;
    ariaControls: string;
    ariaLabelledby: string;
    onSummaryKeyDown?: DisclosureProps["onSummaryKeyDown"];
};
export declare function useToggleDisclosure(): (e: React.SyntheticEvent) => void;
export {};
