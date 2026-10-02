'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flex = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const cn_1 = require("../../utils/cn.js");
const Box_1 = require("../Box/Box.js");
const useLayoutContext_1 = require("../hooks/useLayoutContext.js");
const utils_1 = require("../utils/index.js");
require("./Flex.css");
const b = (0, cn_1.block)('flex');
/**
 * Flexbox model utility component.
 *
 * ```tsx
 * import {Flex, Button} from '@gravity-ui/uikit';
 *
 * <Flex
 *  // take value from theme depends of current media query
 *  space
 * >
 *  <Button>
 *      Button 1
 *  </Button>
 *  <Button>
 *      Button 2
 *  </Button>
 * </Flex>
 * ```
 *
 * Use build in media goods via props
 *
 * ```tsx
 * <Flex
 *  // space dynamically changes instead of current media query
 *  space={{s: '1', m: '5'}}
 *  // `flex-direction: column` will be applied to `l`, 'xl', 'xxl' and `xxxl` media queries
 *  direction={{'s': 'column', 'm': 'row'}}
 * >
 *  {...}
 * </Flex>
 * ```
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#flex
 */
exports.Flex = React.forwardRef(function Flex(props, ref) {
    const { as: propsAs, direction, grow, basis, children, style, alignContent, alignItems, alignSelf, justifyContent, justifyItems, justifySelf, shrink, wrap, inline, gap, gapRow, className, space, centerContent, ...restProps } = props;
    const as = propsAs || 'div';
    const { getClosestMediaProps, theme: { spaceBaseSize }, } = (0, useLayoutContext_1.useLayoutContext)();
    const applyMediaProps = (property) => typeof property === 'object' && property !== null
        ? getClosestMediaProps(property)
        : property;
    const gapSpaceSize = applyMediaProps(gap);
    const columnGap = typeof gapSpaceSize === 'undefined' ? undefined : spaceBaseSize * Number(gapSpaceSize);
    const gapRowSpaceSize = applyMediaProps(gapRow) || gapSpaceSize;
    const rowGap = typeof gapRowSpaceSize === 'undefined'
        ? undefined
        : spaceBaseSize * Number(gapRowSpaceSize);
    const spaceSize = applyMediaProps(space);
    const s = typeof gap === 'undefined' &&
        typeof gapRow === 'undefined' &&
        typeof spaceSize !== 'undefined'
        ? (0, utils_1.makeCssMod)(spaceSize)
        : undefined;
    return ((0, jsx_runtime_1.jsx)(Box_1.Box, { as: as, className: b({
            'center-content': centerContent,
            inline,
            s,
        }, className), ref: ref, style: {
            flexDirection: applyMediaProps(direction),
            flexGrow: grow === true ? 1 : grow,
            flexWrap: wrap === true ? 'wrap' : wrap,
            flexBasis: basis,
            flexShrink: shrink,
            columnGap,
            rowGap,
            alignContent: applyMediaProps(alignContent),
            alignItems: applyMediaProps(alignItems),
            alignSelf: applyMediaProps(alignSelf),
            justifyContent: applyMediaProps(justifyContent),
            justifyItems: applyMediaProps(justifyItems),
            justifySelf: applyMediaProps(justifySelf),
            ...style,
        }, ...restProps, children: space
            ? React.Children.map(children, (child) => 
            // `space` uses negative margins under the hood. This is hack to prevent wrong background position appearance.
            child ? (0, jsx_runtime_1.jsx)("div", { className: b('wr'), children: child }) : child)
            : children }));
});
//# sourceMappingURL=Flex.js.map
