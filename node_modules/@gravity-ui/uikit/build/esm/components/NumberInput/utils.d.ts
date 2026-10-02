export declare const INCREMENT_BUTTON_QA = "increment-button-qa";
export declare const DECREMENT_BUTTON_QA = "decrement-button-qa";
export declare const CONTROL_BUTTONS_QA = "control-buttons-qa";
export declare function getInputPattern(withoutFraction: boolean, positiveOnly?: boolean): string;
export declare function prepareStringValue(value: string): string;
export declare function getPossibleNumberSubstring(value: string, allowDecimal: boolean): string | undefined;
export declare function getParsedValue(value: string | undefined): {
    valid: boolean;
    value: number | null;
};
interface VariablesProps {
    min: number | undefined;
    max: number | undefined;
    step: number | undefined;
    shiftMultiplier: number;
    value: number | null | undefined;
    defaultValue: number | null | undefined;
    allowDecimal: boolean;
}
export declare function getInternalState(props: VariablesProps): {
    min: number | undefined;
    max: number | undefined;
    step: number;
    shiftMultiplier: number;
    value: number | null | undefined;
    defaultValue: number | null | undefined;
};
export declare function clampToNearestStepValue({ value, step, min: originalMin, max, direction, }: {
    value: number;
    step: number;
    min: number | undefined;
    max: number | undefined;
    direction?: 'up' | 'down';
}): number;
export declare function updateCursorPosition(inputRef: React.RefObject<HTMLInputElement | null>, eventRawValue?: string | undefined, computedEventValue?: string | undefined): void;
export declare function areStringRepresentationOfNumbersEqual(v1: string, v2: string): boolean;
export {};
