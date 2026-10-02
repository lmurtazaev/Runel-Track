import * as React from 'react';
import type { SliderProps } from "./types.js";
import "./Slider.css";
export declare const Slider: <T extends number | [number, number]>(p: SliderProps<T> & {
    ref?: React.Ref<HTMLDivElement>;
}) => React.ReactElement;
