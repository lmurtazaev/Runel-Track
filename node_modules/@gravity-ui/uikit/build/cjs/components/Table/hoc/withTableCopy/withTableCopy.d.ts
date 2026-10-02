import * as React from 'react';
import type { TableDataItem, TableProps } from "../../Table.js";
import "./withTableCopy.css";
export interface WithTableCopyProps {
}
export declare function withTableCopy<I extends TableDataItem, E extends {} = {}>(TableComponent: React.ComponentType<TableProps<I> & E>): React.ComponentType<TableProps<I> & E & WithTableCopyProps>;
