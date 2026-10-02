import type { SliderInnerState, SliderProps } from "./types.js";
/**
 * Calculates the basic properties of the Slider component depending on the passed parameters
 * @returns {SliderInnerState} Properties to pass to the Slider
 */
export declare function prepareSliderInnerState({ max, min, defaultValue, step, value, markFormat, marks, tooltipDisplay, tooltipFormat, startPoint, }: {
    max: number;
    min: number;
} & Pick<SliderProps, 'defaultValue' | 'step' | 'value' | 'markFormat' | 'marks' | 'tooltipDisplay' | 'tooltipFormat' | 'startPoint'>): SliderInnerState;
