import type { ControlGroupOption, ControlGroupProps } from "../../../components/types.js";
import type { RadioGroupContextProps } from "./types.js";
interface OptionsProps<ValueType extends string = string> extends Omit<ControlGroupProps<ValueType>, 'options' | 'defaultValue' | 'aria-label' | 'aria-labelledby' | 'onUpdate' | 'value'> {
    value: ValueType;
    checked: boolean;
    content: ControlGroupOption['content'];
}
export type UseRadioGroupProps<ValueType extends string = string> = ControlGroupProps<ValueType>;
export type UseRadioGroupResult<ValueType extends string = string> = {
    containerProps: Pick<ControlGroupProps, 'aria-label' | 'aria-labelledby'> & {
        role: string;
        'aria-disabled': ControlGroupProps['disabled'];
    };
    optionsProps: OptionsProps<ValueType>[];
    contextProps: RadioGroupContextProps;
};
export declare function useRadioGroup<ValueType extends string = string>(props: UseRadioGroupProps<ValueType>): UseRadioGroupResult<ValueType>;
export {};
