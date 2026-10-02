"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleWithTooltip = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const SliderTooltip_1 = require("../SliderTooltip/SliderTooltip.js");
const HandleWithTooltip = ({ originHandle, originHandleProps, stateModifiers, tooltipFormat, className, }) => {
    const autoVisible = stateModifiers['tooltip-display'] === 'auto';
    const alwaysVisible = stateModifiers['tooltip-display'] === 'on';
    const [tooltipVisible, setTooltipVisible] = React.useState(false);
    const [focused, setFocused] = React.useState(false);
    const [hovered, setHovered] = React.useState(false);
    if (alwaysVisible && !tooltipVisible) {
        setTooltipVisible(true);
    }
    //to show tooltip on mobile devices on touch
    if (autoVisible && !tooltipVisible && originHandleProps.dragging) {
        setTooltipVisible(true);
    }
    const styleProp = stateModifiers.rtl ? 'right' : 'left';
    const tooltipContent = tooltipFormat
        ? tooltipFormat(originHandleProps.value)
        : originHandleProps.value;
    const handleTooltipVisibility = ({ currentHovered, currentFocused, }) => {
        if (autoVisible) {
            const handleHovered = currentHovered === undefined ? hovered : currentHovered;
            const handleFocused = currentFocused === undefined ? focused : currentFocused;
            setTooltipVisible(handleHovered || handleFocused);
        }
    };
    const handle = alwaysVisible
        ? originHandle
        : React.cloneElement(originHandle, {
            onMouseEnter: (event) => {
                originHandle.props.onMouseEnter?.(event);
                setHovered(true);
                handleTooltipVisibility({ currentHovered: true });
            },
            onMouseLeave: (event) => {
                originHandle.props.onMouseLeave?.(event);
                setHovered(false);
                handleTooltipVisibility({ currentHovered: false });
            },
            onFocus: (event) => {
                originHandle.props.onFocus?.(event);
                setFocused(true);
                handleTooltipVisibility({ currentFocused: true });
            },
            onBlur: (event) => {
                originHandle.props.onBlur?.(event);
                setFocused(false);
                handleTooltipVisibility({ currentFocused: false });
            },
        });
    return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [handle, tooltipVisible && ((0, jsx_runtime_1.jsx)(SliderTooltip_1.SliderTooltip, { className: className, style: {
                    insetInlineStart: originHandle.props.style?.[styleProp],
                }, stateModifiers: stateModifiers, children: tooltipContent }))] }));
};
exports.HandleWithTooltip = HandleWithTooltip;
//# sourceMappingURL=HandleWithTooltip.js.map
