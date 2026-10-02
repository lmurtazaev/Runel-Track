export interface UseCloseOnTimeoutProps {
    onClose: VoidFunction;
    timeout?: number;
}
export interface UseCloseOnTimeoutResult {
    onMouseOver: React.MouseEventHandler;
    onMouseLeave: React.MouseEventHandler;
}
/**
 * Invokes callback after given amount of time unless mouse is on the element
 * @param onClose
 * @param timeout
 * @returns mouse event handlers
 */
export declare function useCloseOnTimeout<T = Element>({ onClose, timeout }: UseCloseOnTimeoutProps): {
    onMouseOver: import("react").MouseEventHandler<T>;
    onMouseLeave: import("react").MouseEventHandler<T>;
};
