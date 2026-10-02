'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSlider = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const rc_slider_1 = tslib_1.__importDefault(require("rc-slider"));
const cn_1 = require("../../utils/cn.js");
require("./BaseSlider.css");
const b = (0, cn_1.block)('base-slider');
exports.BaseSlider = React.forwardRef(function BaseSlider({ stateModifiers, ...restProps }, ref) {
    return ((0, jsx_runtime_1.jsx)(rc_slider_1.default, { ...restProps, ref: ref, className: b(stateModifiers), classNames: {
            handle: b('handle', stateModifiers),
            rail: b('rail', stateModifiers),
            track: b('track', stateModifiers),
        }, pushable: false, dots: false, keyboard: true }));
});
//# sourceMappingURL=BaseSlider.js.map
