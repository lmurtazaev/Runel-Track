'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Row = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../../utils/cn.js");
const useLayoutContext_1 = require("../hooks/useLayoutContext.js");
const utils_1 = require("../utils/index.js");
require("./Row.css");
const b = (0, cn_1.block)('row');
/**
 * Defines the margins between columns (`<Col />`).
 *
 * Required to use with `<Col />` component
 *
 * ```tsx
 * import {Row, Col} from '@gravity-ui/uikit';
 *
 * <Row space="5">
 *  <Col>col</Col>
 *  <Col>col</Col>
 * </Row>
 * ```
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/components-layout--docs#row
 */
const Row = ({ children, style, className, space, spaceRow, qa }) => {
    const { getClosestMediaProps } = (0, useLayoutContext_1.useLayoutContext)();
    let s;
    let sr;
    if (typeof space === 'object') {
        const res = getClosestMediaProps(space);
        if (typeof res !== 'undefined') {
            s = (0, utils_1.makeCssMod)(res);
        }
    }
    else if (typeof space !== 'undefined') {
        s = (0, utils_1.makeCssMod)(space);
    }
    if (typeof spaceRow === 'object') {
        const res = getClosestMediaProps(spaceRow);
        if (typeof res !== 'undefined') {
            sr = (0, utils_1.makeCssMod)(res);
        }
    }
    else if (typeof spaceRow !== 'undefined') {
        sr = String(spaceRow);
    }
    return ((0, jsx_runtime_1.jsx)("div", { style: style, className: b({
            s,
            sr,
        }, className), "data-qa": qa, children: children }));
};
exports.Row = Row;
//# sourceMappingURL=Row.js.map
