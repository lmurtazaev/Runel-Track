import type { PopoverButtonProps, PopoverTheme } from "../../types.js";
export type ButtonsProps = {
    /** Tooltip's theme */
    theme: PopoverTheme;
    /**
     * Action button properties
     * The button won't be rendered without them
     */
    tooltipActionButton?: PopoverButtonProps;
    /**
     * Cancel button properties
     * The button won't be rendered without them
     */
    tooltipCancelButton?: PopoverButtonProps;
};
export declare const Buttons: ({ theme, tooltipActionButton, tooltipCancelButton }: ButtonsProps) => import("react/jsx-runtime").JSX.Element | null;
