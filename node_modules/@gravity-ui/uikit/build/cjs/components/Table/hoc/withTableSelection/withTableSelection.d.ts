import * as React from 'react';
import type { TableDataItem, TableProps } from "../../Table.js";
import "./withTableSelection.css";
export declare const selectionColumnId = "_selection";
export interface WithTableSelectionProps<I> {
    onSelectionChange: (ids: string[]) => void;
    selectedIds: string[];
    isRowSelectionDisabled?: (item: I, index: number) => boolean;
}
export declare function withTableSelection<I extends TableDataItem, E extends {} = {}>(TableComponent: React.ComponentType<TableProps<I> & E>): React.ComponentType<TableProps<I> & WithTableSelectionProps<I> & E>;
