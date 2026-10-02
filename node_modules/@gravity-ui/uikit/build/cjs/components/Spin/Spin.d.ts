import * as React from 'react';
import type { DOMProps, QAProps } from "../types.js";
import "./Spin.css";
export type SpinSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export interface SpinProps extends DOMProps, QAProps {
    size?: SpinSize;
}
export declare const Spin: React.ForwardRefExoticComponent<SpinProps & React.RefAttributes<HTMLDivElement>>;
