import * as React from 'react';
import type { ControlProps, DOMProps, QAProps } from "../types.js";
import "./Checkbox.css";
export type CheckboxSize = 'm' | 'l' | 'xl';
export interface CheckboxProps extends ControlProps, DOMProps, QAProps {
    size?: CheckboxSize;
    content?: React.ReactNode;
    children?: React.ReactNode;
    title?: string;
}
export declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLLabelElement>>;
