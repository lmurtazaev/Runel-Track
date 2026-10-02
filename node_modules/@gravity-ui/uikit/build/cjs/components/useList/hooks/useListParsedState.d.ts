import type { GetListParsedStateProps } from "../utils/getListParsedState.js";
export interface UseListParsedStateProps<T> extends GetListParsedStateProps<T> {
}
/**
 * From the tree structure of list items we get meta information and
 * flatten list in right order without taking elements that hidden in expanded groups
 */
export declare function useListParsedState<T>({ items, getItemId: propsGetItemId, defaultExpandedState, }: UseListParsedStateProps<T>): import("../index.js").ParsedState<T> & {
    initialState: import("../index.js").InitialListParsedState;
};
