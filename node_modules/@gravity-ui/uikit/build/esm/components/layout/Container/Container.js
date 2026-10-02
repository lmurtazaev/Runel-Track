'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { block } from "../../utils/cn.js";
import { sp } from "../spacing/spacing.js";
import { makeCssMod } from "../utils/index.js";
import { useContainerThemeProps } from "./useContainerThemeProps.js";
import "./Container.css";
const b = block('container');
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
export const Container = ({ children, style: propsStyle, as: Tag = 'div', className, maxWidth, gutters, spaceRow, qa, }) => {
    const { getClosestMediaProps, containerThemeProps, breakpoints } = useContainerThemeProps();
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
            sr = makeCssMod(propsCandidate);
        }
    }
    else if (typeof spaceRow !== 'undefined') {
        sr = makeCssMod(spaceRow);
    }
    return (_jsx(Tag, { style: style, className: b({
            sr,
        }, gutters === false
            ? className
            : sp({
                px: gutters ?? containerThemeProps.gutters,
            }, className)), "data-qa": qa, children: children }));
};
//# sourceMappingURL=Container.js.map
