import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { SliderTooltip } from "../SliderTooltip/SliderTooltip.js";
export const HandleWithTooltip = ({ originHandle, originHandleProps, stateModifiers, tooltipFormat, className, }) => {
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
    return (_jsxs(React.Fragment, { children: [handle, tooltipVisible && (_jsx(SliderTooltip, { className: className, style: {
                    insetInlineStart: originHandle.props.style?.[styleProp],
                }, stateModifiers: stateModifiers, children: tooltipContent }))] }));
};
//# sourceMappingURL=HandleWithTooltip.js.map
