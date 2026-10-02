import type * as React from 'react';
import "./OuterAdditionalContent.css";
interface OuterAdditionalContentProps {
    note?: React.ReactNode;
    errorMessage?: React.ReactNode;
    noteId?: string;
    errorMessageId?: string;
}
export declare const OuterAdditionalContent: ({ errorMessage, note, noteId, errorMessageId, }: OuterAdditionalContentProps) => import("react/jsx-runtime").JSX.Element | null;
export {};
