import * as React from 'react';
import type { FloatingFocusManagerProps, OpenChangeReason } from '@floating-ui/react';
import type { PortalProps } from "../Portal/index.js";
import type { AriaLabelingProps, DOMProps, QAProps } from "../types.js";
import "./Modal.css";
export type ModalCloseReason = 'outsideClick' | 'escapeKeyDown' | string | undefined;
export interface ModalProps extends Pick<PortalProps, 'container' | 'disablePortal'>, DOMProps, AriaLabelingProps, QAProps {
    open?: boolean;
    /** Callback for open state changes, when dismiss happens for example */
    onOpenChange?: (open: boolean, event?: Event, reason?: OpenChangeReason) => void;
    keepMounted?: boolean;
    disableBodyScrollLock?: boolean;
    /**
     * FloatingFocusManager `initialFocus` property
     */
    initialFocus?: FloatingFocusManagerProps['initialFocus'];
    /**
     * FloatingFocusManager `returnFocus` property
     */
    returnFocus?: FloatingFocusManagerProps['returnFocus'];
    /** Do not add a11y dismiss buttons when managing focus */
    disableVisuallyHiddenDismiss?: boolean;
    children?: React.ReactNode;
    /**
     * This callback will be called when Escape key pressed on keyboard, or click outside was made
     * This behaviour could be disabled with `disableEscapeKeyDown`
     * and `disableOutsideClick` options
     * @deprecated Use `onOpenChange` instead
     */
    onClose?: (event: MouseEvent | KeyboardEvent, reason: ModalCloseReason) => void;
    /**
     * This callback will be called when Escape key pressed on keyboard
     * This behaviour could be disabled with `disableEscapeKeyDown` option
     * @deprecated Use `onOpenChange` instead
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    /**
     * This callback will be called when Enter key is pressed on keyboard
     * @deprecated It is not recommended to use this callback.
     * Consider using the submit event in case of a form content or using initialFocus property on the confirm button in case of non-interactive content
     */
    onEnterKeyDown?: (event: KeyboardEvent) => void;
    /**
     * This callback will be called when click is outside of elements of "top layer"
     * This behaviour could be disabled with `disableOutsideClick` option
     * @deprecated Use `onOpenChange` instead
     */
    onOutsideClick?: (event: MouseEvent) => void;
    /** Do not dismiss on escape key press */
    disableEscapeKeyDown?: boolean;
    /** Do not dismiss on outside click */
    disableOutsideClick?: boolean;
    contentClassName?: string;
    /** Callback called when `Modal` is opened and "in" transition is started */
    onTransitionIn?: () => void;
    /** Callback called when `Modal` is opened and "in" transition is completed */
    onTransitionInComplete?: () => void;
    /** Callback called when `Modal` is closed and "out" transition is started */
    onTransitionOut?: () => void;
    /** Callback called when `Popup` is closed and "out" transition is completed */
    onTransitionOutComplete?: () => void;
    contentOverflow?: 'visible' | 'auto';
    floatingRef?: React.RefObject<HTMLDivElement | null>;
    disableHeightTransition?: boolean;
}
export declare function Modal(props: ModalProps): import("react/jsx-runtime").JSX.Element;
