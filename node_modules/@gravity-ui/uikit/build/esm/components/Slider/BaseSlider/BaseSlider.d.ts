import * as React from 'react';
import type { SliderProps, SliderRef } from 'rc-slider';
import type { StateModifiers } from "../types.js";
import "./BaseSlider.css";
type BaseSliderProps<T = number | number[]> = {
    stateModifiers: StateModifiers;
} & Omit<SliderProps<T>, 'classNames' | 'prefixCls' | 'className' | 'pushable' | 'keyboard'>;
export declare const BaseSlider: <T>(p: BaseSliderProps<T> & {
    ref?: React.Ref<SliderRef>;
}) => React.ReactElement;
export {};
