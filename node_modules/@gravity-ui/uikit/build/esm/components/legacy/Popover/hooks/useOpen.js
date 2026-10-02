import * as React from 'react';
import { useUpdateEffect } from "../../../../hooks/private/index.js";
import { delayByBehavior } from "../config.js";
export const useOpen = ({ initialOpen, disabled, autoclosable, onOpenChange, delayOpening, delayClosing, behavior, shouldBeOpen, }) => {
    const openingTimeout = React.useRef(null);
    const closingTimeout = React.useRef(null);
    const [isOpen, setIsOpen] = React.useState(initialOpen);
    const unsetOpeningTimeout = React.useCallback(() => {
        if (openingTimeout.current) {
            clearTimeout(openingTimeout.current);
            openingTimeout.current = null;
        }
    }, []);
    const unsetClosingTimeout = React.useCallback(() => {
        if (closingTimeout.current) {
            clearTimeout(closingTimeout.current);
            closingTimeout.current = null;
        }
    }, []);
    React.useEffect(() => {
        return () => {
            unsetOpeningTimeout();
            unsetClosingTimeout();
        };
    }, [unsetClosingTimeout, unsetOpeningTimeout]);
    const setTooltipOpen = React.useCallback((open) => {
        setIsOpen(open);
        shouldBeOpen.current = open;
        onOpenChange?.(open);
    }, [onOpenChange, shouldBeOpen]);
    const openTooltip = React.useCallback(() => {
        unsetOpeningTimeout();
        setTooltipOpen(true);
    }, [setTooltipOpen, unsetOpeningTimeout]);
    const closeTooltip = React.useCallback(() => {
        unsetClosingTimeout();
        setTooltipOpen(false);
    }, [setTooltipOpen, unsetClosingTimeout]);
    React.useEffect(() => {
        if (disabled) {
            closeTooltip();
        }
    }, [disabled, closeTooltip]);
    useUpdateEffect(() => {
        if (autoclosable && !shouldBeOpen.current) {
            closeTooltip();
        }
    }, [autoclosable, closeTooltip, shouldBeOpen]);
    const [defaultDelayOpening, defaultDelayClosing] = delayByBehavior[behavior];
    const openTooltipDelayed = React.useCallback(() => {
        openingTimeout.current = setTimeout(() => {
            openingTimeout.current = null;
            openTooltip();
        }, delayOpening ?? defaultDelayOpening);
    }, [defaultDelayOpening, delayOpening, openTooltip]);
    const closeTooltipDelayed = React.useCallback(() => {
        closingTimeout.current = setTimeout(() => {
            closingTimeout.current = null;
            closeTooltip();
        }, delayClosing ?? defaultDelayClosing);
    }, [closeTooltip, defaultDelayClosing, delayClosing]);
    return {
        isOpen,
        closingTimeout,
        openTooltip,
        openTooltipDelayed,
        unsetOpeningTimeout,
        closeTooltip,
        closeTooltipDelayed,
        unsetClosingTimeout,
    };
};
//# sourceMappingURL=useOpen.js.map
