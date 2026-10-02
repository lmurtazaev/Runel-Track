'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../../utils/cn.js");
const spacing_1 = require("../spacing/spacing.js");
const utils_1 = require("../utils/index.js");
const useContainerThemeProps_1 = require("./useContainerThemeProps.js");
require("./Container.css");
const b = (0, cn_1.block)('container');
/**
 * Center you content in horizontal direction.
 *
 * > In most cases must be one on the page.
 *
 * ```tsx
 * import {Container, Row, Col} from '@gravity-ui/uikit';
 *
 * <Container masWidth="m">
 *   <Row>
 *     <Col>
 *       Col 1
 *    </Col>
 *    <Col>
 *       Col 2
 *    </Col>
 *  </Row>
 * </Container>
 * ```
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#container
 */
const Container = ({ children, style: propsStyle, as: Tag = 'div', className, maxWidth, gutters, spaceRow, qa, }) => {
    const { getClosestMediaProps, containerThemeProps, breakpoints } = (0, useContainerThemeProps_1.useContainerThemeProps)();
    const style = {
        ...(maxWidth
            ? {
                maxWidth: breakpoints[maxWidth],
            }
            : {}),
        ...propsStyle,
    };
    let sr;
    if (typeof spaceRow === 'object') {
        const propsCandidate = getClosestMediaProps(spaceRow);
        if (propsCandidate) {
            sr = (0, utils_1.makeCssMod)(propsCandidate);
        }
    }
    else if (typeof spaceRow !== 'undefined') {
        sr = (0, utils_1.makeCssMod)(spaceRow);
    }
    return ((0, jsx_runtime_1.jsx)(Tag, { style: style, className: b({
            sr,
        }, gutters === false
            ? className
            : (0, spacing_1.sp)({
                px: gutters ?? containerThemeProps.gutters,
            }, className)), "data-qa": qa, children: children }));
};
exports.Container = Container;
//# sourceMappingURL=Container.js.map
