import type { InitialListParsedState, ListState, UseListResult } from "../types.js";
import type { UseListParsedStateProps } from "./useListParsedState.js";
import type { UseListStateProps } from "./useListState.js";
interface UseListProps<T> extends UseListParsedStateProps<T>, Omit<UseListStateProps, 'initialState'> {
    initialState?: Partial<InitialListParsedState>;
    controlledState?: Partial<ListState>;
}
/**
 * Take array of items as a argument with params described what type of list initial data represents.
 */
export declare const useList: <T>({ items, getItemId, defaultExpandedState, withExpandedState, initialState: initialValues, controlledState, }: UseListProps<T>) => UseListResult<T>;
export {};
