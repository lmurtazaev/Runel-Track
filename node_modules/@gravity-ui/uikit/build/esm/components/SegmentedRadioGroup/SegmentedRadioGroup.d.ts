import * as React from 'react';
import type { ControlGroupOption, ControlGroupProps, DOMProps, QAProps } from "../types.js";
import { SegmentedRadioGroupOption as Option } from "./SegmentedRadioGroupOption.js";
import "./SegmentedRadioGroup.css";
export type SegmentedRadioGroupSize = 's' | 'm' | 'l' | 'xl';
export type SegmentedRadioGroupWidth = 'auto' | 'max';
export interface SegmentedRadioGroupProps<T extends string = string> extends ControlGroupProps<T>, DOMProps, QAProps {
    size?: SegmentedRadioGroupSize;
    width?: SegmentedRadioGroupWidth;
    children?: React.ReactElement<ControlGroupOption<T>> | React.ReactElement<ControlGroupOption<T>>[];
}
type SegmentedRadioGroupComponentType = (<T extends string>(props: SegmentedRadioGroupProps<T> & {
    ref?: React.ForwardedRef<HTMLDivElement>;
}) => React.JSX.Element) & {
    Option: typeof Option;
};
export declare const SegmentedRadioGroup: SegmentedRadioGroupComponentType;
export {};
