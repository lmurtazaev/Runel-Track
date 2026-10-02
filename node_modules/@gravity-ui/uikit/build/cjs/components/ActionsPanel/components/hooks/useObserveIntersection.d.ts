import * as React from 'react';
import type { VisibilityMap } from "./types.js";
export declare const OBSERVER_TARGET_ATTR = "data-observer-id";
export declare const useObserveIntersection: (updateObserveKey: string) => {
    parentRef: React.RefObject<HTMLDivElement>;
    visibilityMap: VisibilityMap;
    offset: number;
};
