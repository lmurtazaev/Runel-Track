import * as React from 'react';
import type { BaseInputControlProps, InputControlPin, InputControlSize, InputControlView } from "../types.js";
import "./TextArea.css";
export type TextAreaProps = BaseInputControlProps<HTMLTextAreaElement> & {
    /** The control's html attributes */
    controlProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    /** The number of visible text lines for the control. If not specified, the hight will be automatically calculated based on the content */
    rows?: number;
    /** The number of minimum visible text lines for the control. Ignored if `rows` is specified */
    minRows?: number;
    /** The number of maximum visible text lines for the control. Ignored if `rows` is specified */
    maxRows?: number;
    /** An optional element displayed under the lower right corner of the control and sharing the place with the error container */
    note?: React.ReactNode;
};
export type TextAreaPin = InputControlPin;
export type TextAreaSize = InputControlSize;
export type TextAreaView = InputControlView;
export declare const TextArea: React.ForwardRefExoticComponent<import("../../index.js").DOMProps & import("../../index.js").QAProps & {
    autoComplete?: boolean | "on" | "off" | string;
    autoFocus?: boolean;
    controlRef?: React.Ref<HTMLTextAreaElement> | undefined;
    defaultValue?: string;
    disabled?: boolean;
    error?: string | boolean;
    errorMessage?: React.ReactNode;
    errorPlacement?: "outside" | "inside";
    validationState?: "invalid";
    hasClear?: boolean;
    id?: string;
    name?: string;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement> | undefined;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement> | undefined;
    onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement> | undefined;
    onKeyPress?: React.KeyboardEventHandler<HTMLTextAreaElement> | undefined;
    onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement> | undefined;
    onUpdate?: (value: string) => void;
    pin?: InputControlPin;
    placeholder?: string;
    readOnly?: boolean;
    size?: InputControlSize;
    tabIndex?: number;
    value?: string;
    view?: InputControlView;
} & {
    /** The control's html attributes */
    controlProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    /** The number of visible text lines for the control. If not specified, the hight will be automatically calculated based on the content */
    rows?: number;
    /** The number of minimum visible text lines for the control. Ignored if `rows` is specified */
    minRows?: number;
    /** The number of maximum visible text lines for the control. Ignored if `rows` is specified */
    maxRows?: number;
    /** An optional element displayed under the lower right corner of the control and sharing the place with the error container */
    note?: React.ReactNode;
} & React.RefAttributes<HTMLSpanElement>>;
