import * as React from 'react';
import type { ControlProps, DOMProps, QAProps } from "../types.js";
import "./Radio.css";
export type RadioSize = 'm' | 'l' | 'xl';
export interface RadioProps extends ControlProps, DOMProps, QAProps {
    value: string;
    size?: RadioSize;
    content?: React.ReactNode;
    children?: React.ReactNode;
    title?: string;
}
export declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLLabelElement>>;
