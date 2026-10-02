'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popover = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const icons_1 = require("@gravity-ui/icons");
const useUniqId_1 = require("../../../hooks/useUniqId/index.js");
const Button_1 = require("../../Button/index.js");
const Icon_1 = require("../../Icon/index.js");
const Popup_1 = require("../../Popup/index.js");
const theme_1 = require("../../theme/index.js");
const warn_1 = require("../../utils/warn.js");
const Popover_classname_1 = require("./Popover.classname.js");
const Buttons_1 = require("./components/Buttons/Buttons.js");
const Content_1 = require("./components/Content/Content.js");
const Links_1 = require("./components/Links/Links.js");
const Trigger_1 = require("./components/Trigger/Trigger.js");
const config_1 = require("./config.js");
const useOpen_1 = require("./hooks/useOpen.js");
require("./Popover.css");
/**
 * @deprecated
 */
exports.Popover = React.forwardRef(function ({ initialOpen = false, disabled = false, autoclosable = true, openOnHover = true, delayOpening, delayClosing, behavior = config_1.PopoverBehavior.Delayed, placement, offset = {}, tooltipOffset, tooltipClassName, theme = 'info', size = 's', hasArrow = true, hasClose = false, className, children, title, content, htmlContent, contentClassName, links, forceLinksAppearance = false, tooltipActionButton, tooltipCancelButton, onOpenChange, onCloseClick, onClick, anchorRef, anchorElement, strategy, qa, disablePortal = false, tooltipId, focusTrap, autoFocus, restoreFocusRef, }, ref) {
    const direction = (0, theme_1.useDirection)();
    const controlRef = React.useRef(null);
    const closedManually = React.useRef(false);
    const shouldBeOpen = React.useRef(initialOpen);
    const { isOpen, closingTimeout, openTooltip, openTooltipDelayed, unsetOpeningTimeout, closeTooltip, closeTooltipDelayed, unsetClosingTimeout, } = (0, useOpen_1.useOpen)({
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
    const popoverTitleId = `popover-${tooltipId ?? ''}-title-${(0, useUniqId_1.useUniqId)()}`;
    const tooltip = ((0, jsx_runtime_1.jsx)(Popup_1.Popup, { id: tooltipId, role: openOnHover ? 'tooltip' : 'dialog', strategy: strategy, anchorElement: anchorElement, anchorRef: anchorRef || controlRef, className: (0, Popover_classname_1.cnPopover)('tooltip', {
            theme,
            size,
            ['with-close']: hasClose,
            'force-links-appearance': forceLinksAppearance,
        }, tooltipClassName), open: isOpen, placement: popupPlacement, hasArrow: hasArrow, offset: tooltipOffset, onClose: hasAnchor ? undefined : closeTooltip, qa: qa ? `${qa}-tooltip` : '', disablePortal: disablePortal, initialFocus: autoFocus ? 0 : undefined, modal: focusTrap, returnFocus: restoreFocusRef, "aria-labelledby": title ? popoverTitleId : undefined, children: (0, jsx_runtime_1.jsxs)(React.Fragment, { children: [title && ((0, jsx_runtime_1.jsx)("h3", { id: popoverTitleId, className: (0, Popover_classname_1.cnPopover)('tooltip-title'), children: title })), (0, jsx_runtime_1.jsx)(Content_1.Content, { secondary: hasTitle ? theme !== 'announcement' : false, content: content, htmlContent: htmlContent, className: contentClassName }), links && (0, jsx_runtime_1.jsx)(Links_1.Links, { links: links }), (0, jsx_runtime_1.jsx)(Buttons_1.Buttons, { theme: theme, tooltipActionButton: tooltipActionButton, tooltipCancelButton: tooltipCancelButton }), hasClose && ((0, jsx_runtime_1.jsx)("div", { className: (0, Popover_classname_1.cnPopover)('tooltip-close'), children: (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "s", view: "flat-secondary", onClick: handleCloseClick, "aria-label": "Close", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { data: icons_1.Xmark, size: 16 }) }) }))] }) }));
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
        (0, warn_1.warnOnce)('[Popover] Physical names (top, left) of "offset" property are deprecated. Use logical names (block, inline) instead.');
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: controlRef, className: (0, Popover_classname_1.cnPopover)({ disabled }, className), onMouseEnter: openOnHover ? onMouseEnter : undefined, onMouseLeave: openOnHover ? onMouseLeave : undefined, onFocus: openOnHover ? onMouseEnter : undefined, onBlur: openOnHover ? onMouseLeave : undefined, style: {
            top: offset.top,
            left: offset.left,
            insetBlockStart: offset.block,
            insetInlineStart: offset.inline,
        }, "data-qa": qa, children: [(0, jsx_runtime_1.jsx)(Trigger_1.Trigger, { closeTooltip: closeTooltip, openTooltip: openTooltip, open: isOpen, openOnHover: openOnHover, className: (0, Popover_classname_1.cnPopover)('handler'), disabled: disabled, onClick: onClick, closedManually: closedManually, children: children }), tooltip] }));
});
exports.Popover.displayName = 'Popover';
//# sourceMappingURL=Popover.js.map
