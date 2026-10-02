import * as React from 'react';
import type { TextInputProps, TextInputSize } from "../controls/index.js";
import type { AriaLabelingProps, DOMProps, FocusEventHandlers, QAProps } from "../types.js";
import "./PinInput.css";
export type PinInputSize = TextInputSize;
export type PinInputType = 'numeric' | 'alphanumeric';
export interface PinInputApi {
    focus: () => void;
}
export interface PinInputProps extends DOMProps, AriaLabelingProps, QAProps, FocusEventHandlers {
    value?: string[];
    defaultValue?: string[];
    onUpdate?: (value: string[]) => void;
    onUpdateComplete?: (value: string[]) => void;
    length?: number;
    size?: PinInputSize;
    type?: PinInputType;
    id?: string;
    name?: string;
    form?: string;
    placeholder?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    otp?: boolean;
    mask?: boolean;
    responsive?: boolean;
    note?: TextInputProps['note'];
    validationState?: TextInputProps['validationState'];
    errorMessage?: TextInputProps['errorMessage'];
    apiRef?: React.RefObject<PinInputApi | null>;
}
export declare const PinInput: React.ForwardRefExoticComponent<PinInputProps & React.RefAttributes<HTMLDivElement>>;
