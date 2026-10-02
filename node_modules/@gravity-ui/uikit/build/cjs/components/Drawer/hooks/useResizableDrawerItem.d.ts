import * as React from 'react';
import type { DrawerPlacement } from "../index.js";
import type { OnResizeHandler } from "./useResizeHandlers.js";
export interface UseResizableDrawerItemParams {
    placement?: DrawerPlacement;
    size?: number;
    minSize?: number;
    maxSize?: number;
    onResizeStart?: OnResizeHandler;
    onResizeEnd?: OnResizeHandler;
    onResize?: OnResizeHandler;
    overlayRef: React.RefObject<HTMLElement>;
}
export declare function useResizableDrawerItem(params: UseResizableDrawerItemParams): {
    currentSize: number;
    onResizerPointerDown: (e: React.PointerEvent) => void;
};
