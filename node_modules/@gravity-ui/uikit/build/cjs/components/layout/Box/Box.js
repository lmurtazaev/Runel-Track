"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const cn_1 = require("../../utils/cn.js");
const spacing_1 = require("../spacing/spacing.js");
require("./Box.css");
const b = (0, cn_1.block)('box');
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
exports.Box = React.forwardRef(function Box({ as, children, qa, className, width, height, minWidth, minHeight, maxHeight, maxWidth, position, style: outerStyle, spacing, overflow, ...props }, ref) {
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
    return ((0, jsx_runtime_1.jsx)(Tag, { ...props, "data-qa": qa, style: style, ref: ref, className: b({ overflow }, spacing ? (0, spacing_1.sp)(spacing, className) : className), children: children }));
});
//# sourceMappingURL=Box.js.map
