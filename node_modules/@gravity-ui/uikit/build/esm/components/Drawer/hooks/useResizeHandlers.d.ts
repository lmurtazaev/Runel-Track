import * as React from 'react';
export type DrawerPlacement = 'right' | 'left' | 'top' | 'bottom';
export type OnResizeHandler = (size: number) => void;
export interface UseResizeHandlersParams {
    onStart: () => void;
    onMove: (delta: number) => void;
    onEnd: (delta: number, event: MouseEvent | TouchEvent) => void;
    arrangement?: 'horizontal' | 'vertical';
}
export declare function useResizeHandlers({ onStart, onMove, onEnd, arrangement, }: UseResizeHandlersParams): {
    onPointerDown: (e: React.PointerEvent) => void;
};
