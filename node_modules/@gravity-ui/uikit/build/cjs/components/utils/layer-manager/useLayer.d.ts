import type { LayerCloseReason, LayerConfig, LayerExtendableProps } from "./LayerManager.js";
export type { LayerCloseReason, LayerExtendableProps };
export interface LayerProps extends LayerConfig {
    open?: boolean;
    enabled?: boolean;
}
export declare function useLayer({ open, disableEscapeKeyDown, disableOutsideClick, onEscapeKeyDown, onEnterKeyDown, onOutsideClick, onClose, contentRefs, enabled, type, }: LayerProps): void;
