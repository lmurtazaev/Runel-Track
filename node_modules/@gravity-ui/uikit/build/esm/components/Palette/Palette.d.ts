import * as React from 'react';
import type { ButtonProps } from "../Button/index.js";
import type { AriaLabelingProps, DOMProps, QAProps } from "../types.js";
import "./Palette.css";
export type PaletteOption = Pick<ButtonProps, 'disabled' | 'title'> & {
    /**
     * Option value, which you can use in state or send to back-end and so on.
     */
    value: string;
    /**
     * Content inside the option (emoji/image/GIF/symbol etc).
     *
     * Uses `value` as default, if `value` is a number, then it is treated as a unicode symbol (emoji for example).
     * @default props.value
     */
    content?: React.ReactNode;
};
export interface PaletteProps extends AriaLabelingProps, Pick<ButtonProps, 'disabled' | 'size'>, DOMProps, QAProps {
    /**
     * Allows selecting multiple options.
     * @default true
     */
    multiple?: boolean;
    /**
     * Current value (which options are selected).
     */
    value?: string[];
    /**
     * The control's default value. Use when the component is not controlled.
     */
    defaultValue?: string[];
    /**
     * List of Palette options (the grid).
     */
    options?: PaletteOption[];
    /**
     * How many options are there per row.
     * @default 6
     */
    columns?: number;
    /**
     * HTML class attribute for a grid row.
     */
    rowClassName?: string;
    /**
     * HTML class attribute for a grid option.
     */
    optionClassName?: string;
    /**
     * Fires when a user (un)selects an option.
     */
    onUpdate?: (value: string[]) => void;
    /**
     * Fires when a user focuses on the Palette.
     */
    onFocus?: (event: React.FocusEvent) => void;
    /**
     * Fires when a user blurs from the Palette.
     */
    onBlur?: (event: React.FocusEvent) => void;
}
interface PaletteComponent extends React.ForwardRefExoticComponent<PaletteProps & React.RefAttributes<HTMLDivElement>> {
}
export declare const Palette: PaletteComponent;
export {};
