import type * as React from 'react';
import type { FlexProps } from "../../Flex/Flex.js";
interface BoxProps extends FlexProps<'div'> {
    style?: React.CSSProperties;
    children?: React.ReactNode;
    minHeight?: number;
    w?: number | string;
    h?: number | string;
    grow?: true;
    bc?: React.CSSProperties['borderColor'];
    bgc?: React.CSSProperties['backgroundColor'];
}
export declare function Box({ children, w, h, minHeight, bgc, bc, ...props }: BoxProps): import("react/jsx-runtime").JSX.Element;
export {};
