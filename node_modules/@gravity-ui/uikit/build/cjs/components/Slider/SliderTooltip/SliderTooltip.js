'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderTooltip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../../utils/cn.js");
const SliderTooltipPin_1 = require("./SliderTooltipPin.js");
require("./SliderTooltip.css");
const b = (0, cn_1.block)('slider-tooltip');
const SliderTooltip = ({ className, style, stateModifiers, children }) => ((0, jsx_runtime_1.jsx)("div", { className: b(stateModifiers, className), style: style, children: (0, jsx_runtime_1.jsxs)("div", { className: b('card', stateModifiers), children: [children, stateModifiers.disabled && (
            //use this element to prevent crossing effect
            (0, jsx_runtime_1.jsx)(SliderTooltipPin_1.SliderTooltipPin, { className: b('pin', { background: true }) })), (0, jsx_runtime_1.jsx)(SliderTooltipPin_1.SliderTooltipPin, { className: b('pin') })] }) }));
exports.SliderTooltip = SliderTooltip;
//# sourceMappingURL=SliderTooltip.js.map
