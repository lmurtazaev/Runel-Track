'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { block } from "../../utils/cn.js";
import { useLayoutContext } from "../hooks/useLayoutContext.js";
import { makeCssMod } from "../utils/index.js";
import "./Row.css";
const b = block('row');
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
export const Row = ({ children, style, className, space, spaceRow, qa }) => {
    const { getClosestMediaProps } = useLayoutContext();
    let s;
    let sr;
    if (typeof space === 'object') {
        const res = getClosestMediaProps(space);
        if (typeof res !== 'undefined') {
            s = makeCssMod(res);
        }
    }
    else if (typeof space !== 'undefined') {
        s = makeCssMod(space);
    }
    if (typeof spaceRow === 'object') {
        const res = getClosestMediaProps(spaceRow);
        if (typeof res !== 'undefined') {
            sr = makeCssMod(res);
        }
    }
    else if (typeof spaceRow !== 'undefined') {
        sr = String(spaceRow);
    }
    return (_jsx("div", { style: style, className: b({
            s,
            sr,
        }, className), "data-qa": qa, children: children }));
};
//# sourceMappingURL=Row.js.map
