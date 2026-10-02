import type { InitialListParsedState, ListItemId, ListItemType, ParsedState } from "../types.js";
type ListParsedStateResult<T> = ParsedState<T> & {
    initialState: InitialListParsedState;
};
export interface GetListParsedStateProps<T> {
    items: ListItemType<T>[];
    defaultExpandedState?: 'closed' | 'expanded';
    /**
     * For example T is entity type with id what represents db id
     * So now you can use it id as a list item id in internal state
     */
    getItemId?: (item: T) => ListItemId;
}
export declare function getListParsedState<T>({ items, defaultExpandedState, getItemId, }: GetListParsedStateProps<T>): ListParsedStateResult<T>;
export {};
