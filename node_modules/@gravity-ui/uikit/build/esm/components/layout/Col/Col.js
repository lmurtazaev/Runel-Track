'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { block } from "../../utils/cn.js";
import { useLayoutContext } from "../hooks/useLayoutContext.js";
import { makeCssMod } from "../utils/index.js";
import "./Col.css";
const b = block('col');
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
export const Col = ({ size, children, style, className, qa, ...mediaConfigProp }) => {
    const { getClosestMediaProps } = useLayoutContext();
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
    return (_jsx("div", { style: style, className: b({
            size: typeof sizeModValue === 'undefined'
                ? defaultSizeMod
                : makeCssMod(sizeModValue),
        }, className), "data-qa": qa, children: children }));
};
//# sourceMappingURL=Col.js.map
