import * as React from 'react';
import type { AriaLabelingProps, DOMProps, QAProps } from "../types.js";
import "./Divider.css";
export type DividerOrientation = 'vertical' | 'horizontal';
export type DividerAlign = 'start' | 'center' | 'end';
export interface DividerProps extends AriaLabelingProps, DOMProps, QAProps {
    orientation?: DividerOrientation;
    align?: DividerAlign;
    children?: React.ReactNode;
}
export declare const Divider: React.ForwardRefExoticComponent<DividerProps & React.RefAttributes<HTMLDivElement>>;
