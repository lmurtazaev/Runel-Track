import * as React from 'react';
import type { ColorTextBaseProps } from "../Text/colorText/colorText.js";
import type { DOMProps, QAProps } from "../types.js";
import type { SVGIconData } from "./types.js";
import "./Icon.css";
export type IconData = SVGIconData;
interface IconComposition {
    prefix?: string;
}
export interface IconProps extends QAProps, DOMProps {
    data: IconData;
    width?: number | string;
    height?: number | string;
    size?: number | string;
    fill?: string;
    stroke?: string;
    color?: ColorTextBaseProps['color'];
}
export declare const Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>> & IconComposition;
export {};
