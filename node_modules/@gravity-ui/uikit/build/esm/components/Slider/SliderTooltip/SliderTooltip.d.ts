import type * as React from 'react';
import type { StateModifiers } from "../types.js";
import "./SliderTooltip.css";
type SliderTooltipProps = {
    className?: string;
    style?: React.CSSProperties;
    stateModifiers: Omit<StateModifiers, 'hasTooltip'>;
} & React.PropsWithChildren;
export declare const SliderTooltip: ({ className, style, stateModifiers, children }: SliderTooltipProps) => import("react/jsx-runtime").JSX.Element;
export {};
