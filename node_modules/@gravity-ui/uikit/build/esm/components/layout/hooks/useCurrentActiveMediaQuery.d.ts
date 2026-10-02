import type { MediaProps, MediaType } from "../types.js";
export declare const mockMediaQueryList: MediaQueryList;
export declare const makeCurrentActiveMediaExpressions: (mediaToValue: MediaProps<number>) => MediaProps<string>;
/**
 * @private
 */
export declare const useCurrentActiveMediaQuery: (breakpointsMap: MediaProps<number>, fixBreakpoints: boolean, initialMediaQuery?: MediaType) => MediaType;
