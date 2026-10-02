import * as React from 'react';
import type { BaseInputControlProps, InputControlPin, InputControlSize, InputControlView } from "../types.js";
import "./TextInput.css";
export type TextInputProps = BaseInputControlProps<HTMLInputElement> & {
    /** The control's [type](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types) */
    type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
    /** The control's html attributes */
    controlProps?: React.InputHTMLAttributes<HTMLInputElement>;
    /** Help text rendered to the left of the input node */
    label?: string;
    /** User`s node rendered before label and input node */
    startContent?: React.ReactNode;
    /** User`s node rendered after input node, clear button and error icon */
    endContent?: React.ReactNode;
    /** An optional element displayed under the lower right corner of the control and sharing the place with the error container */
    note?: React.ReactNode;
};
export type TextInputPin = InputControlPin;
export type TextInputSize = InputControlSize;
export type TextInputView = InputControlView;
export declare const TextInput: React.ForwardRefExoticComponent<import("../../index.js").DOMProps & import("../../index.js").QAProps & {
    autoComplete?: boolean | "on" | "off" | string;
    autoFocus?: boolean;
    controlRef?: React.Ref<HTMLInputElement> | undefined;
    defaultValue?: string;
    disabled?: boolean;
    error?: string | boolean;
    errorMessage?: React.ReactNode;
    errorPlacement?: "outside" | "inside";
    validationState?: "invalid";
    hasClear?: boolean;
    id?: string;
    name?: string;
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
    onKeyPress?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
    onUpdate?: (value: string) => void;
    pin?: InputControlPin;
    placeholder?: string;
    readOnly?: boolean;
    size?: InputControlSize;
    tabIndex?: number;
    value?: string;
    view?: InputControlView;
} & {
    /** The control's [type](https://developer.mozilla.org/en-US/docs/Learn/Forms/HTML5_input_types) */
    type?: "email" | "number" | "password" | "search" | "tel" | "text" | "url";
    /** The control's html attributes */
    controlProps?: React.InputHTMLAttributes<HTMLInputElement>;
    /** Help text rendered to the left of the input node */
    label?: string;
    /** User`s node rendered before label and input node */
    startContent?: React.ReactNode;
    /** User`s node rendered after input node, clear button and error icon */
    endContent?: React.ReactNode;
    /** An optional element displayed under the lower right corner of the control and sharing the place with the error container */
    note?: React.ReactNode;
} & React.RefAttributes<HTMLSpanElement>>;
