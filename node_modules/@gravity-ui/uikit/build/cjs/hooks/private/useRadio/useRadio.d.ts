import * as React from 'react';
import type { ControlProps } from "../../../components/types.js";
export type UseRadioProps = ControlProps;
export type UseRadioResult = {
    checked: boolean;
    inputProps: React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>;
};
export declare function useRadio({ name, value, checked, defaultChecked, disabled, controlRef, controlProps, onUpdate, onChange, onFocus, onBlur, id, }: UseRadioProps): UseRadioResult;
