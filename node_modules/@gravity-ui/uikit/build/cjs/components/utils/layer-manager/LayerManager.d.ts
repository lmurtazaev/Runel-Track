import type { VirtualElement } from '@floating-ui/react';
export type LayerCloseReason = 'outsideClick' | 'escapeKeyDown';
export interface LayerExtendableProps {
    /**
     * Do not handle click outside
     */
    disableOutsideClick?: boolean;
    /**
     * Do not handle Escape key press on keyboard
     */
    disableEscapeKeyDown?: boolean;
    /**
     * This callback will be called when Escape key pressed on keyboard
     * This behaviour could be disabled with `disableEscapeKeyDown` option
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    /**
     * This callback will be called when Enter key is pressed on keyboard
     */
    onEnterKeyDown?: (event: KeyboardEvent) => void;
    /**
     * This callback will be called when click is outside of elements of "top layer"
     * This behaviour could be disabled with `disableOutsideClick` option
     */
    onOutsideClick?: (event: MouseEvent) => void;
    /**
     * This callback will be called when Escape key pressed on keyboard, or click outside was made
     * This behaviour could be disabled with `disableEscapeKeyDown`
     * and `disableOutsideClick` options
     */
    onClose?: (event: MouseEvent | KeyboardEvent, reason: LayerCloseReason) => void;
    /**
     * Type of layer, returns from `getLayers`
     */
    type?: string;
}
type ContentElement = Element | (VirtualElement & {
    contains?: (other: Node | null) => boolean;
});
export interface LayerConfig extends LayerExtendableProps {
    contentRefs?: Array<React.RefObject<ContentElement | null> | undefined>;
}
declare class LayerManager {
    private stack;
    private mouseDownLayerTarget?;
    add(config: LayerConfig): void;
    remove(config: LayerConfig): void;
    getLayersCount(): number;
    getLayers(): {
        type: string | undefined;
    }[];
    private addListeners;
    private removeListeners;
    private notifyLayersChange;
    private handleDocumentKeyDown;
    private handleDocumentClick;
    private handleDocumentMouseDown;
    private getTopLayer;
    private isOutsideClick;
    private isToastClick;
}
export declare const layerManager: LayerManager;
export declare const getLayersCount: () => number;
export {};
