import * as React from 'react';
import { Radio } from "../Radio/index.js";
import type { RadioProps, RadioSize } from "../Radio/index.js";
import type { ControlGroupOption, ControlGroupProps, DOMProps, QAProps } from "../types.js";
import "./RadioGroup.css";
export type RadioGroupOption = ControlGroupOption;
export type RadioGroupSize = RadioSize;
export type RadioGroupDirection = 'vertical' | 'horizontal';
export interface RadioGroupProps extends ControlGroupProps, DOMProps, QAProps {
    size?: RadioGroupSize;
    direction?: RadioGroupDirection;
    children?: React.ReactElement<RadioProps, typeof Radio> | React.ReactElement<RadioProps, typeof Radio>[];
    optionClassName?: string;
}
interface RadioGroupComponent extends React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>> {
    Option: typeof Radio;
}
export declare const RadioGroup: RadioGroupComponent;
export {};
