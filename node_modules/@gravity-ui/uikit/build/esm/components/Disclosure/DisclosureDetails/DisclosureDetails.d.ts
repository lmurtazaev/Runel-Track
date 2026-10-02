import * as React from 'react';
import type { QAProps } from "../../types.js";
export interface DisclosureDetailsProps extends QAProps {
    children: React.ReactNode;
    className?: string;
}
export declare function DisclosureDetails({ children, qa, className }: DisclosureDetailsProps): import("react/jsx-runtime").JSX.Element;
export declare namespace DisclosureDetails {
    var displayName: string;
}
