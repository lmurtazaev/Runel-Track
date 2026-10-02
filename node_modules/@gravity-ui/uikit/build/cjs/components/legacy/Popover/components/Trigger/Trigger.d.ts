import * as React from 'react';
interface TriggerArgs {
    onClick: React.MouseEventHandler;
    onKeyDown: React.KeyboardEventHandler;
    open: boolean;
}
export interface TriggerProps {
    /**
     * Tooltip's opened state
     */
    open: boolean;
    openOnHover?: boolean;
    /**
     * Css class for the control
     */
    className?: string;
    /**
     * click handler
     */
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => boolean | Promise<boolean>;
    /**
     * Disables open state changes
     */
    disabled: boolean;
    /**
     * Function, which opens tooltip
     */
    openTooltip: () => void;
    /**
     * Function, which closes tooltip
     */
    closeTooltip: () => void;
    /**
     * Indicates, that tooltip is closed manually
     */
    closedManually: React.MutableRefObject<boolean>;
    /**
     * Tooltip's trigger content
     */
    children?: React.ReactNode | ((triggerArgs: TriggerArgs) => React.ReactNode);
}
export declare const Trigger: ({ open, openOnHover, disabled, className, openTooltip, closeTooltip, closedManually, onClick, children, }: TriggerProps) => import("react/jsx-runtime").JSX.Element;
export {};
