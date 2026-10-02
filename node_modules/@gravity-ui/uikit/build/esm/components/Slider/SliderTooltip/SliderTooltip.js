'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { block } from "../../utils/cn.js";
import { SliderTooltipPin } from "./SliderTooltipPin.js";
import "./SliderTooltip.css";
const b = block('slider-tooltip');
export const SliderTooltip = ({ className, style, stateModifiers, children }) => (_jsx("div", { className: b(stateModifiers, className), style: style, children: _jsxs("div", { className: b('card', stateModifiers), children: [children, stateModifiers.disabled && (
            //use this element to prevent crossing effect
            _jsx(SliderTooltipPin, { className: b('pin', { background: true }) })), _jsx(SliderTooltipPin, { className: b('pin') })] }) }));
//# sourceMappingURL=SliderTooltip.js.map
