import type { OffsetOptions, Placement, VirtualElement } from '@floating-ui/react';
import type { AUTO_PLACEMENTS } from "./constants.js";
export type AutoPlacement = (typeof AUTO_PLACEMENTS)[number];
export type PopupPlacement = AutoPlacement | Placement | Placement[];
export type PopupAnchorElement = Element | VirtualElement;
export type PopupAnchorRef = React.RefObject<PopupAnchorElement | null>;
type RemoveFunction<T> = T extends Function ? never : T;
export type PopupOffset = RemoveFunction<OffsetOptions>;
export {};
