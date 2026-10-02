'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Xmark } from '@gravity-ui/icons';
import { useUniqId } from "../../../hooks/useUniqId/index.js";
import { Button } from "../../Button/index.js";
import { Icon } from "../../Icon/index.js";
import { Popup } from "../../Popup/index.js";
import { useDirection } from "../../theme/index.js";
import { warnOnce } from "../../utils/warn.js";
import { cnPopover } from "./Popover.classname.js";
import { Buttons } from "./components/Buttons/Buttons.js";
import { Content } from "./components/Content/Content.js";
import { Links } from "./components/Links/Links.js";
import { Trigger } from "./components/Trigger/Trigger.js";
import { PopoverBehavior } from "./config.js";
import { useOpen } from "./hooks/useOpen.js";
import "./Popover.css";
/**
 * @deprecated
 */
export const Popover = React.forwardRef(function ({ initialOpen = false, disabled = false, autoclosable = true, openOnHover = true, delayOpening, delayClosing, behavior = PopoverBehavior.Delayed, placement, offset = {}, tooltipOffset, tooltipClassName, theme = 'info', size = 's', hasArrow = true, hasClose = false, className, children, title, content, htmlContent, contentClassName, links, forceLinksAppearance = false, tooltipActionButton, tooltipCancelButton, onOpenChange, onCloseClick, onClick, anchorRef, anchorElement, strategy, qa, disablePortal = false, tooltipId, focusTrap, autoFocus, restoreFocusRef, }, ref) {
    const direction = useDirection();
    const controlRef = React.useRef(null);
    const closedManually = React.useRef(false);
    const shouldBeOpen = React.useRef(initialOpen);
    const { isOpen, closingTimeout, openTooltip, openTooltipDelayed, unsetOpeningTimeout, closeTooltip, closeTooltipDelayed, unsetClosingTimeout, } = useOpen({
        initialOpen,
        disabled,
        autoclosable,
        onOpenChange,
        delayOpening,
        delayClosing,
        behavior,
        shouldBeOpen,
    });
    const popupPlacement = React.useMemo(() => {
        if (placement) {
            return placement;
        }
        return direction === 'rtl' ? ['left', 'bottom'] : ['right', 'bottom'];
    }, [direction, placement]);
    React.useImperativeHandle(ref, () => ({
        openTooltip,
        closeTooltip,
    }), [openTooltip, closeTooltip]);
    const handleCloseClick = async (event) => {
        closeTooltip();
        onCloseClick?.(event);
    };
    const hasTitle = Boolean(title);
    const hasAnchor = Boolean(anchorRef || anchorElement);
    const popoverTitleId = `popover-${tooltipId ?? ''}-title-${useUniqId()}`;
    const tooltip = (_jsx(Popup, { id: tooltipId, role: openOnHover ? 'tooltip' : 'dialog', strategy: strategy, anchorElement: anchorElement, anchorRef: anchorRef || controlRef, className: cnPopover('tooltip', {
            theme,
            size,
            ['with-close']: hasClose,
            'force-links-appearance': forceLinksAppearance,
        }, tooltipClassName), open: isOpen, placement: popupPlacement, hasArrow: hasArrow, offset: tooltipOffset, onClose: hasAnchor ? undefined : closeTooltip, qa: qa ? `${qa}-tooltip` : '', disablePortal: disablePortal, initialFocus: autoFocus ? 0 : undefined, modal: focusTrap, returnFocus: restoreFocusRef, "aria-labelledby": title ? popoverTitleId : undefined, children: _jsxs(React.Fragment, { children: [title && (_jsx("h3", { id: popoverTitleId, className: cnPopover('tooltip-title'), children: title })), _jsx(Content, { secondary: hasTitle ? theme !== 'announcement' : false, content: content, htmlContent: htmlContent, className: contentClassName }), links && _jsx(Links, { links: links }), _jsx(Buttons, { theme: theme, tooltipActionButton: tooltipActionButton, tooltipCancelButton: tooltipCancelButton }), hasClose && (_jsx("div", { className: cnPopover('tooltip-close'), children: _jsx(Button, { size: "s", view: "flat-secondary", onClick: handleCloseClick, "aria-label": "Close", children: _jsx(Icon, { data: Xmark, size: 16 }) }) }))] }) }));
    if (hasAnchor) {
        return tooltip;
    }
    const onMouseEnter = () => {
        unsetClosingTimeout();
        if (!isOpen && !disabled && !closedManually.current) {
            openTooltipDelayed();
        }
        else {
            shouldBeOpen.current = true;
        }
    };
    const onMouseLeave = () => {
        if (autoclosable && !closedManually.current && !closingTimeout.current) {
            unsetOpeningTimeout();
            closeTooltipDelayed();
        }
        else {
            shouldBeOpen.current = false;
        }
        closedManually.current = false;
    };
    if (offset && (typeof offset.top === 'number' || typeof offset.left === 'number')) {
        warnOnce('[Popover] Physical names (top, left) of "offset" property are deprecated. Use logical names (block, inline) instead.');
    }
    return (_jsxs("div", { ref: controlRef, className: cnPopover({ disabled }, className), onMouseEnter: openOnHover ? onMouseEnter : undefined, onMouseLeave: openOnHover ? onMouseLeave : undefined, onFocus: openOnHover ? onMouseEnter : undefined, onBlur: openOnHover ? onMouseLeave : undefined, style: {
            top: offset.top,
            left: offset.left,
            insetBlockStart: offset.block,
            insetInlineStart: offset.inline,
        }, "data-qa": qa, children: [_jsx(Trigger, { closeTooltip: closeTooltip, openTooltip: openTooltip, open: isOpen, openOnHover: openOnHover, className: cnPopover('handler'), disabled: disabled, onClick: onClick, closedManually: closedManually, children: children }), tooltip] }));
});
Popover.displayName = 'Popover';
//# sourceMappingURL=Popover.js.map
