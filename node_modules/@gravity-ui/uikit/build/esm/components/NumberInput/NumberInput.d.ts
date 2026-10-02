import * as React from 'react';
import type { BaseInputControlProps } from "../controls/types.js";
import "./NumberInput.css";
export interface NumberInputProps extends Omit<BaseInputControlProps<HTMLInputElement>, 'error' | 'value' | 'defaultValue' | 'onUpdate'> {
    /** The control's html attributes */
    controlProps?: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'min' | 'max' | 'onChange' | 'onInput'>;
    /** Help text rendered to the left of the input node */
    label?: string;
    /** Indicates that the user cannot change control's value */
    readOnly?: boolean;
    /** User`s node rendered before label and input node */
    startContent?: React.ReactNode;
    /** User`s node rendered after input node and clear button */
    endContent?: React.ReactNode;
    /** An optional element displayed under the lower right corner of the control and sharing the place with the error container */
    note?: React.ReactNode;
    /**
      Hides increment/decrement buttons at the end of control
     */
    hiddenControls?: boolean;
    /**
     * min allowed value. It is used for clamping entered value to allowed range
     * @default Number.MAX_SAFE_INTEGER
     */
    min?: number;
    /**
     * max allowed value. It is used for clamping entered value to allowed range
     * @default Number.MIN_SAFE_INTEGER
     */
    max?: number;
    /**
     * Delta for incrementing/decrementing entered value with arrow keyboard buttons or component controls
     * @default 1
     */
    step?: number;
    /**
     * Step multiplier when shift button is pressed
     * @default 10
     */
    shiftMultiplier?: number;
    /**
     * Enables ability to enter decimal numbers
     * @default false
     */
    allowDecimal?: boolean;
    /** The control's value */
    value?: number | null;
    /** The control's default value. Use when the component is not controlled */
    defaultValue?: number | null;
    /** Fires when the input’s value is changed by the user. Provides new value as an callback's argument */
    onUpdate?: (value: number | null) => void;
}
export declare const NumberInput: React.ForwardRefExoticComponent<NumberInputProps & React.RefAttributes<HTMLSpanElement>>;
