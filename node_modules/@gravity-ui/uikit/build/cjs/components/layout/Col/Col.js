'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Col = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../../utils/cn.js");
const useLayoutContext_1 = require("../hooks/useLayoutContext.js");
const utils_1 = require("../utils/index.js");
require("./Col.css");
const b = (0, cn_1.block)('col');
/**
 * How many columns of you 12-th column layout will take content.
 * Must be used as a child of `Row` component.
 *
 * By default, component takes all available space.
 * If you want to specify static size use `size` prop.
 *
 * ```tsx
 * <Col size="6">some content</Col>
 * ```
 * If you want responsive column use provide media sizes.
 *
 * ```tsx
 * <Col size={[12, {m: 6}]}>some content</Col>
 * ```
 * ---
 *
 * Note: you can use empty <Col/> component for spacing:
 *
 * ```tsx
 * <Row>
 *   <Col size="4">col 1</Col>
 *   <Col/>
 *   <Col size="4">col 2</Col>
 * </Row>
 * ```
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/components-layout--docs#col
 */
const Col = ({ size, children, style, className, qa, ...mediaConfigProp }) => {
    const { getClosestMediaProps } = (0, useLayoutContext_1.useLayoutContext)();
    let mediaConfig;
    let defaultSizeMod;
    if (Array.isArray(size)) {
        [defaultSizeMod, mediaConfig] = size;
    }
    else if (typeof size === 'object') {
        mediaConfig = size || mediaConfigProp;
    }
    else {
        defaultSizeMod = size;
        mediaConfig = mediaConfigProp;
    }
    const sizeModValue = getClosestMediaProps(mediaConfig);
    return ((0, jsx_runtime_1.jsx)("div", { style: style, className: b({
            size: typeof sizeModValue === 'undefined'
                ? defaultSizeMod
                : (0, utils_1.makeCssMod)(sizeModValue),
        }, className), "data-qa": qa, children: children }));
};
exports.Col = Col;
//# sourceMappingURL=Col.js.map
