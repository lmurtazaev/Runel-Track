'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import Slider from 'rc-slider';
import { block } from "../../utils/cn.js";
import "./BaseSlider.css";
const b = block('base-slider');
export const BaseSlider = React.forwardRef(function BaseSlider({ stateModifiers, ...restProps }, ref) {
    return (_jsx(Slider, { ...restProps, ref: ref, className: b(stateModifiers), classNames: {
            handle: b('handle', stateModifiers),
            rail: b('rail', stateModifiers),
            track: b('track', stateModifiers),
        }, pushable: false, dots: false, keyboard: true }));
});
//# sourceMappingURL=BaseSlider.js.map
