import * as React from 'react';
import type { StepperProps } from "./Stepper.js";
export type StepperContextProps = Pick<StepperProps, 'size' | 'onUpdate' | 'value'>;
export declare const StepperContext: React.Context<StepperContextProps>;
export declare const useStepperContext: () => StepperContextProps;
