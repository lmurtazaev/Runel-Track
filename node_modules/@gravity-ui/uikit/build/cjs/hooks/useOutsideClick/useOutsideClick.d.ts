import * as React from 'react';
export interface UseOutsideClickProps<T> {
    ref: React.RefObject<T | null>;
    handler?: (e: MouseEvent | TouchEvent) => void;
}
type UseOutsideClickType = <K extends HTMLElement>(props: UseOutsideClickProps<K>) => void;
/**
 * Hook for observing clicks outside a given target
 * @param ref - purpose of observation
 * @param handler - callback when a click is triggered outside the observation target
 * @returns - nothing
 */
export declare const useOutsideClick: UseOutsideClickType;
export {};
