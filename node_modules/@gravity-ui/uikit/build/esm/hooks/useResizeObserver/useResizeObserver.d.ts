import * as React from 'react';
interface UseResizeObserverProps<T> {
    ref: React.RefObject<T | null | undefined> | undefined;
    onResize: (info: ResizeInfo) => void;
    box?: ResizeObserverBoxOptions;
}
export interface ResizeInfo {
    observer?: ResizeObserver;
}
export declare function useResizeObserver<T extends Element>({ ref, onResize, box, }: UseResizeObserverProps<T>): void;
export {};
