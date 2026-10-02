import * as React from 'react';
import type { ControlProps } from "../../../components/types.js";
export type UseCheckboxProps = ControlProps;
export type UseCheckboxResult = {
    checked: boolean;
    inputProps: React.InputHTMLAttributes<HTMLInputElement> & React.RefAttributes<HTMLInputElement>;
};
export declare function useCheckbox({ name, value, id, defaultChecked, checked, indeterminate, onUpdate, onChange, controlRef, controlProps, onFocus, onBlur, disabled, }: UseCheckboxProps): UseCheckboxResult;
