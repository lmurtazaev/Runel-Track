import type { Space } from "../types.js";
import "./spacing.css";
export interface SpacingProps {
    /**
     * margin-right
     */
    mr?: Space;
    /**
     * margin-left
     */
    ml?: Space;
    /**
     * margin-top
     */
    mt?: Space;
    /**
     * margin-bottom
     */
    mb?: Space;
    /**
     * margin-left
     * margin-right
     */
    mx?: Space;
    /**
     * margin-top
     * margin-bottom
     */
    my?: Space;
    /**
     * margin
     */
    m?: Space;
    /**
     * padding-right
     */
    pr?: Space;
    /**
     * padding-left
     */
    pl?: Space;
    /**
     * padding-top
     */
    pt?: Space;
    /**
     * padding-bottom
     */
    pb?: Space;
    /**
     * padding-left
     * padding-right
     */
    px?: Space;
    /**
     * padding-top
     * padding-bottom
     */
    py?: Space;
    /**
     * padding
     */
    p?: Space;
}
/**
 * Utility to generate predefined css classes to describe position between components
 * ---
 * Storybook - https://preview.gravity-ui.com/uikit/?path=/docs/layout--playground#spacing-utility
 */
export declare const spacing: (props: SpacingProps, className?: string) => string;
export declare const sp: (props: SpacingProps, className?: string) => string;
