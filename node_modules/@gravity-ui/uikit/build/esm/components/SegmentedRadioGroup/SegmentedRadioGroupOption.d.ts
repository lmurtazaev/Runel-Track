import * as React from 'react';
import type { ControlProps } from "../types.js";
export interface SegmentedRadioGroupOptionProps<ValueType extends string = string> extends ControlProps {
    value: ValueType;
    content?: React.ReactNode;
    children?: React.ReactNode;
    title?: string;
}
type SegmentedRadioGroupOptionComponentType = <T extends string = string>(props: SegmentedRadioGroupOptionProps<T>) => React.JSX.Element;
export declare const SegmentedRadioGroupOption: SegmentedRadioGroupOptionComponentType;
export {};
