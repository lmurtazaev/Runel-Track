import type { ListOnItemClick, UseListResult } from "../types.js";
interface GetListItemClickHandlerProps<T> {
    multiple?: boolean;
    list: UseListResult<T>;
}
export declare const getListItemClickHandler: <T = unknown>({ list, multiple, }: GetListItemClickHandlerProps<T>) => ListOnItemClick;
export {};
