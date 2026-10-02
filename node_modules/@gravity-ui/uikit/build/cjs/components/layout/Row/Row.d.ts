import type * as React from 'react';
import type { QAProps } from "../../types.js";
import type { MediaPartial, Space } from "../types.js";
import "./Row.css";
export interface RowProps extends QAProps {
    style?: React.CSSProperties;
    /**
     * Vertical and horizontal `space` between children `<Col />` components.
     */
    space?: Space | MediaPartial<Space>;
    /**
     * Override default (space) vertical gaps between children if it wrap on next line
     */
    spaceRow?: Space | MediaPartial<Space>;
    className?: string;
    children?: React.ReactNode;
}
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
export declare const Row: ({ children, style, className, space, spaceRow, qa }: RowProps) => import("react/jsx-runtime").JSX.Element;
