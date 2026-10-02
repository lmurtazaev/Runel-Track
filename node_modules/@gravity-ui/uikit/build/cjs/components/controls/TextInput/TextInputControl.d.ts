import type * as React from 'react';
import type { TextInputProps } from "./TextInput.js";
type Props = Omit<TextInputProps, 'autoComplete' | 'controlProps'> & {
    autoComplete?: React.TextareaHTMLAttributes<HTMLInputElement>['autoComplete'];
    controlProps: NonNullable<TextInputProps['controlProps']>;
};
export declare function TextInputControl(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
