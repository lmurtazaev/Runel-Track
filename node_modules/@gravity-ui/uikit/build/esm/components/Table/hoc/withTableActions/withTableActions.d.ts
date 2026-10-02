import * as React from 'react';
import type { MenuItemProps } from "../../../Menu/index.js";
import type { TableColumnConfig, TableDataItem, TableProps } from "../../Table.js";
import "./withTableActions.css";
export declare const actionsColumnId = "_actions";
export declare function enhanceSystemColumn<I>(columns: TableColumnConfig<I>[], enhancer: (systemColumn: TableColumnConfig<I>) => void): TableColumnConfig<I>[];
export interface TableAction<I> {
    text: string;
    handler: (item: I, index: number, event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>) => void;
    href?: ((item: I, index: number) => string) | string;
    target?: string;
    rel?: string;
    disabled?: boolean;
    theme?: MenuItemProps['theme'];
    icon?: MenuItemProps['iconStart'];
    qa?: string;
}
export interface TableActionGroup<I> {
    title: string;
    items: TableActionConfig<I>[];
}
export type TableActionConfig<I> = TableAction<I> | TableActionGroup<I>;
/**
 * common sizes for Menu and Button
 */
export type TableRowActionsSize = 's' | 'm' | 'l' | 'xl';
export type RenderRowActionsProps<I> = {
    item: I;
    index: number;
};
export interface WithTableActionsProps<I> {
    getRowActions?: (item: I, index: number) => TableActionConfig<I>[];
    renderRowActions?: (props: RenderRowActionsProps<I>) => React.ReactNode;
    rowActionsSize?: TableRowActionsSize;
    rowActionsIcon?: React.ReactNode;
}
export declare function withTableActions<I extends TableDataItem, E extends {} = {}>(TableComponent: React.ComponentType<TableProps<I> & E>): React.ComponentType<TableProps<I> & WithTableActionsProps<I> & E>;
