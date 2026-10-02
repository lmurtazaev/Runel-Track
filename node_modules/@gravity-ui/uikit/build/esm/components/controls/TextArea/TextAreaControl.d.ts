import * as React from 'react';
import type { TextAreaProps } from "./TextArea.js";
type Props = Omit<TextAreaProps, 'autoComplete' | 'onChange' | 'controlProps'> & {
    onChange: NonNullable<TextAreaProps['onChange']>;
    autoComplete?: React.TextareaHTMLAttributes<HTMLTextAreaElement>['autoComplete'];
    controlProps: NonNullable<TextAreaProps['controlProps']>;
};
export declare function TextAreaControl(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
