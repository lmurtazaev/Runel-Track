import * as React from 'react';
import type { TableDataItem, TableProps } from "../../Table.js";
import { SortIndicator } from "./SortIndicator/SortIndicator.js";
import "./withTableSorting.css";
type ColumnSortOrder = 'asc' | 'desc';
interface ColumnSortState {
    column: string;
    order: ColumnSortOrder;
}
type SortState = ColumnSortState[];
export type TableSortState = SortState;
export type TableColumnSortState = ColumnSortState;
export declare const TableSortIndicator: typeof SortIndicator;
export interface WithTableSortingProps {
    defaultSortState?: SortState;
    sortState?: SortState;
    onSortStateChange?: (sortState: SortState) => void;
    disableDataSorting?: boolean;
}
export declare function withTableSorting<I extends TableDataItem, E extends {} = {}>(TableComponent: React.ComponentType<TableProps<I> & E>): React.ComponentType<TableProps<I> & WithTableSortingProps & E>;
export {};
