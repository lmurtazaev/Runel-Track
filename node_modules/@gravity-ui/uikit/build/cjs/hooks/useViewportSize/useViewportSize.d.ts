export interface UseViewportSizeResult {
    width?: number;
    height?: number;
}
/**
 * A hook to get the size of the viewport when resizing
 * @returns - {width, height}
 */
export declare const useViewportSize: () => UseViewportSizeResult;
