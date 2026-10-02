import type * as React from 'react';
import type { SelectOption, SelectProps } from "../../types.js";
type OptionWrapProps = {
    renderOption?: (option: SelectOption) => React.ReactElement;
    value: NonNullable<SelectProps['value']>;
    option: SelectOption;
    multiple?: boolean;
};
export declare const OptionWrap: (props: OptionWrapProps) => import("react/jsx-runtime").JSX.Element;
export {};
