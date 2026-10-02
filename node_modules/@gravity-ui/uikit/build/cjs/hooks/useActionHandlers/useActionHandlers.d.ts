import * as React from 'react';
type AnyFunction = (...args: any[]) => any;
export type UseActionHandlersProps = AnyFunction;
export interface UseActionHandlersResult<T> {
    onKeyDown: React.KeyboardEventHandler<T>;
}
export declare function createOnKeyDownHandler<T>(callback?: AnyFunction): (event: React.KeyboardEvent<T>) => void;
/**
 * Emulates behaviour of system controls, that respond to Enter and Spacebar
 * @param callback
 * @returns {onKeyDown}
 */
export declare function useActionHandlers<T>(callback?: UseActionHandlersProps): UseActionHandlersResult<T>;
export {};
