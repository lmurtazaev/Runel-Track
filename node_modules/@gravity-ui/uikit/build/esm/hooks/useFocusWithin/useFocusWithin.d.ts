import * as React from 'react';
export interface UseFocusWithinProps<T extends Element = Element> {
    /** Whether the focus within events should be disabled. */
    isDisabled?: boolean;
    /** Handler that is called when the target element or a descendant receives focus. */
    onFocusWithin?: (e: React.FocusEvent<T>) => void;
    /** Handler that is called when the target element and all descendants lose focus. */
    onBlurWithin?: (e: React.FocusEvent<T>) => void;
    /** Handler that is called when the focus within state changes. */
    onFocusWithinChange?: (isFocusWithin: boolean) => void;
}
export interface UseFocusWithinResult<T extends Element = Element> {
    focusWithinProps: {
        onFocus?: (event: React.FocusEvent<T>) => void;
        onBlur?: (event: React.FocusEvent<T>) => void;
    };
}
/**
 * Callback on focus outside event.
 * @callback onFocusEventCallback
 * @param {FocusEvent} event
 */
/**
 * Callback on focus change event.
 * @callback onFocusChangeCallback
 * @param {boolean} isFocusWithin
 */
/**
 * Handles focus events for the target and its descendants.
 * @param {object} props
 * @param {boolean} [props.isDisabled] - whether the focus within events should be disabled.
 * @param {onFocusEventCallback} props.onFocusWithin - handler that is called when the target element or a descendant receives focus.
 * @param {onFocusEventCallback} props.onBlurWithin - handler that is called when the target element and all descendants lose focus.
 * @param {onFocusChangeCallback} props.onFocusChange - handler that is called when the the focus within state changes.
 * @returns container props
 * @example
 *
 * function Select() {
 *   const [open, setOpen] = React.useState(false);
 *
 *   const handleFocusOutside = React.useCallback(() => {setOpen(false);}, []);
 *
 *   const {focusWithinProps} = useFocusWithin({onBlurWithin: handleFocusOutside});
 *
 *   return (
 *     <span {...focusWithinProps}>
 *       <Button onClick={() => {setOpen(true)}}>Select</Button>
 *       <Popup open={open}>
 *          ...
 *       </Popup>
 *     </span>
 *   );
 *  }
 */
export declare function useFocusWithin<T extends Element = Element>(props: UseFocusWithinProps<T>): UseFocusWithinResult<T>;
