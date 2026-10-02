import type { QAProps } from "../../types.js";
import type { ListItemViewCommonProps } from "../components/ListItemView/index.js";
import type { ListItemId, ListItemListContextProps, ListItemSize, ListItemViewContentType, ListOnItemClick, UseListResult } from "../types.js";
type ItemRendererProps<T> = QAProps & {
    size?: ListItemSize;
    /**
     * Affects the view of the selected items
     */
    multiple?: boolean;
    id: ListItemId;
    mapItemDataToContentProps(data: T): ListItemViewContentType;
    onItemClick?: ListOnItemClick;
    list: UseListResult<T>;
};
/**
 * Map list state and parsed list state to item render props
 */
export declare const getItemRenderState: <T>({ qa, list, onItemClick, mapItemDataToContentProps, size, multiple, id, }: ItemRendererProps<T>) => {
    data: T;
    props: ListItemViewCommonProps<"li">;
    context: ListItemListContextProps;
};
export {};
