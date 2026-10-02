import * as React from 'react';
import type { ControlProps, DOMProps, QAProps } from "../types.js";
import "./Switch.css";
export type SwitchSize = 's' | 'm' | 'l';
export interface SwitchProps extends ControlProps, DOMProps, QAProps {
    size?: SwitchSize;
    loading?: boolean;
    content?: React.ReactNode;
    children?: React.ReactNode;
    title?: string;
}
export declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLLabelElement>>;
