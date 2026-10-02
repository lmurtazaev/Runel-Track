import * as React from 'react';
import type { ElementProps, FloatingFocusManagerProps, FloatingRootContext, Middleware, OpenChangeReason, ReferenceType, Strategy, UseRoleProps } from '@floating-ui/react';
import type { PortalProps } from "../Portal/index.js";
import type { AriaLabelingProps, DOMProps, QAProps } from "../types.js";
import type { PopupAnchorElement, PopupAnchorRef, PopupOffset, PopupPlacement } from "./types.js";
import "./Popup.css";
export type PopupCloseReason = 'outsideClick' | 'escapeKeyDown' | string | undefined;
export interface PopupProps extends Pick<PortalProps, 'container' | 'disablePortal'>, DOMProps, AriaLabelingProps, QAProps {
    children?: React.ReactNode;
    /** Manages `Popup` visibility */
    open?: boolean;
    /** Callback for open state changes, when dismiss happens for example */
    onOpenChange?: (open: boolean, event?: Event, reason?: OpenChangeReason) => void;
    /** `Popup` will not be removed from the DOM upon hiding */
    keepMounted?: boolean;
    /** Render an arrow pointing to the anchor */
    hasArrow?: boolean;
    /** Floating UI strategy */
    strategy?: Strategy;
    /** floating element placement */
    placement?: PopupPlacement;
    /** floating element offset relative to anchor */
    offset?: PopupOffset;
    /** floating element anchor */
    anchorElement?: PopupAnchorElement | null;
    /**
     * floating element anchor ref object
     * @deprecated Use `anchorElement` instead
     */
    anchorRef?: PopupAnchorRef;
    /** Floating UI middlewares. If set, they will completely overwrite the default middlewares. */
    floatingMiddlewares?: Middleware[];
    /** Floating UI context to provide interactions */
    floatingContext?: FloatingRootContext<ReferenceType>;
    /** Additional floating element props to provide interactions */
    floatingInteractions?: ElementProps[];
    /** React ref floating element is attached to */
    floatingRef?: React.Ref<HTMLDivElement>;
    /** Styles to apply to the `Floating UI` element */
    floatingStyles?: React.CSSProperties;
    /** Additional class to apply to the `Floating UI` element */
    floatingClassName?: string;
    /** If true `Popup` act like a modal dialog */
    modal?: boolean;
    /** The initial element to be focused */
    initialFocus?: FloatingFocusManagerProps['initialFocus'];
    /** Element which focus should be returned to */
    returnFocus?: FloatingFocusManagerProps['returnFocus'];
    /** The order in which focus circle */
    focusOrder?: FloatingFocusManagerProps['order'];
    /** Do not add a11y dismiss buttons when managing focus in modal */
    disableVisuallyHiddenDismiss?: boolean;
    /**
     * This callback will be called when Escape key pressed on keyboard, or click outside was made
     * This behaviour could be disabled with `disableEscapeKeyDown`
     * and `disableOutsideClick` options
     * @deprecated Use `onOpenChange` instead
     */
    onClose?: (event: MouseEvent | KeyboardEvent, reason: PopupCloseReason) => void;
    /**
     * This callback will be called when Escape key pressed on keyboard
     * This behaviour could be disabled with `disableEscapeKeyDown` option
     * @deprecated Use `onOpenChange` instead
     */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
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
    /** Do not dismiss on focusout */
    disableFocusOut?: boolean;
    /**
     * Do not use as layer
     */
    disableLayer?: boolean;
    /** Disables animation of popup appearing/disappearing */
    disableTransition?: boolean;
    /** ARIA role or special component role (select, combobox) */
    role?: UseRoleProps['role'];
    /** HTML `id` attribute */
    id?: string;
    /** CSS property `z-index` */
    zIndex?: number;
    /** Callback called when `Popup` is opened and "in" transition is started */
    onTransitionIn?: () => void;
    /** Callback called when `Popup` is opened and "in" transition is completed */
    onTransitionInComplete?: () => void;
    /** Callback called when `Popup` is closed and "out" transition is started */
    onTransitionOut?: () => void;
    /** Callback called when `Popup` is closed and "out" transition is completed */
    onTransitionOutComplete?: () => void;
}
export declare function Popup(props: PopupProps): import("react/jsx-runtime").JSX.Element;
