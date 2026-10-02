import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { block } from "../../utils/cn.js";
import { sp } from "../spacing/spacing.js";
import "./Box.css";
const b = block('box');
/**
 * Basic block to build other components and for standalone usage as a smart block with build in support of most usable css properties and shortcut `spacing` properties.
 * ```tsx
 * <Box width={300} height={200} spacing={{mb: 2}}>
 *      some content
 * </Box>
 * <Box width={300} height={200} >
 *      some content
 * </Box>
 * ```
 */
export const Box = React.forwardRef(function Box({ as, children, qa, className, width, height, minWidth, minHeight, maxHeight, maxWidth, position, style: outerStyle, spacing, overflow, ...props }, ref) {
    const Tag = as || 'div';
    const style = {
        width,
        height,
        minWidth,
        minHeight,
        maxHeight,
        maxWidth,
        position,
        ...outerStyle,
    };
    return (_jsx(Tag, { ...props, "data-qa": qa, style: style, ref: ref, className: b({ overflow }, spacing ? sp(spacing, className) : className), children: children }));
});
//# sourceMappingURL=Box.js.map
