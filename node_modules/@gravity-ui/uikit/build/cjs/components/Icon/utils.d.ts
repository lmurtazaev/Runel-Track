import type { SVGIconComponentData, SVGIconData, SVGIconSpriteData, SVGIconStringData, SVGIconSvgrData } from "./types.js";
export declare function isSpriteData(data: SVGIconData): data is SVGIconSpriteData;
export declare function isSvgrData(data: SVGIconData): data is SVGIconSvgrData;
export declare function isComponentSvgData(data: SVGIconData): data is SVGIconComponentData;
export declare function isStringSvgData(data: SVGIconData): data is SVGIconStringData;
export declare function prepareStringData(data: SVGIconStringData): string;
export declare function getStringViewBox(data: SVGIconStringData): string | undefined;
