import * as React from 'react';
import type { PopoverBehavior } from "../config.js";
export type UseOpenProps = {
    initialOpen: boolean;
    disabled: boolean;
    autoclosable: boolean;
    onOpenChange?: (open: boolean) => void;
    delayOpening?: number;
    delayClosing?: number;
    behavior: `${PopoverBehavior}`;
    shouldBeOpen: React.MutableRefObject<boolean>;
};
export declare const useOpen: ({ initialOpen, disabled, autoclosable, onOpenChange, delayOpening, delayClosing, behavior, shouldBeOpen, }: UseOpenProps) => {
    isOpen: boolean;
    closingTimeout: React.MutableRefObject<NodeJS.Timeout | null>;
    openTooltip: () => void;
    openTooltipDelayed: () => void;
    unsetOpeningTimeout: () => void;
    closeTooltip: () => void;
    closeTooltipDelayed: () => void;
    unsetClosingTimeout: () => void;
};
