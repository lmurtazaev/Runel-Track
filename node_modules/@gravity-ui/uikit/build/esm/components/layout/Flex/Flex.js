'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { block } from "../../utils/cn.js";
import { Box } from "../Box/Box.js";
import { useLayoutContext } from "../hooks/useLayoutContext.js";
import { makeCssMod } from "../utils/index.js";
import "./Flex.css";
const b = block('flex');
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
export const Flex = React.forwardRef(function Flex(props, ref) {
    const { as: propsAs, direction, grow, basis, children, style, alignContent, alignItems, alignSelf, justifyContent, justifyItems, justifySelf, shrink, wrap, inline, gap, gapRow, className, space, centerContent, ...restProps } = props;
    const as = propsAs || 'div';
    const { getClosestMediaProps, theme: { spaceBaseSize }, } = useLayoutContext();
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
        ? makeCssMod(spaceSize)
        : undefined;
    return (_jsx(Box, { as: as, className: b({
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
            child ? _jsx("div", { className: b('wr'), children: child }) : child)
            : children }));
});
//# sourceMappingURL=Flex.js.map
