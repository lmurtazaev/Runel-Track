import * as React from 'react';
export interface UseElementSizeResult {
    width: number;
    height: number;
}
export declare function useElementSize<T extends HTMLElement = HTMLDivElement>(ref: React.MutableRefObject<T | null> | null, key?: string): UseElementSizeResult;
