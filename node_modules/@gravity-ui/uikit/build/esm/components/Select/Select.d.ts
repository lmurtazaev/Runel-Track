import * as React from 'react';
import { Option, OptionGroup } from "./tech-components.js";
import type { SelectProps, SelectRenderPopup } from "./types.js";
import "./Select.css";
type SelectComponent = (<T = any>(p: SelectProps<T> & {
    ref?: React.Ref<HTMLButtonElement>;
}) => React.ReactElement) & {
    Option: typeof Option;
} & {
    OptionGroup: typeof OptionGroup;
};
export declare const DEFAULT_RENDER_POPUP: SelectRenderPopup;
export declare const Select: SelectComponent;
export {};
