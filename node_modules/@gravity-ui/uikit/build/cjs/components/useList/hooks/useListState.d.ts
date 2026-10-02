import type { ListState } from "../types.js";
export interface UseListStateProps {
    /**
     * Initial state values
     */
    initialState?: Partial<ListState>;
    withExpandedState?: boolean;
}
export declare const useListState: ({ initialState, withExpandedState }: UseListStateProps) => ListState;
