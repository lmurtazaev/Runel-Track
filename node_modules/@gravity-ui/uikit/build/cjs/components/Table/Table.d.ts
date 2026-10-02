import * as React from 'react';
import type { AriaLabelingProps, QAProps } from "../types.js";
import "./Table.css";
export interface TableDataItem {
    [key: string]: any;
}
type ActiveScrollElementType = 'scrollBar' | 'scrollContainer';
interface TableState {
    activeScrollElement: ActiveScrollElementType;
    columnsStyles: React.CSSProperties[];
    columnHeaderRefs: React.RefObject<HTMLTableCellElement | null>[];
}
export interface TableColumnConfig<I> {
    /** Column ID */
    id: string;
    /** Column name (header). By default: column ID */
    name?: string | (() => React.ReactNode);
    /** CSS-class that will be added to all cells in the column. */
    className?: string;
    /** Stub in the event there is no data in a cell. By default: — (&mdash;) */
    placeholder?: string | ((item: I, index: number) => React.ReactNode);
    /** Cell contents. If you pass a row, the cell contents will be the value of the field named the same as this row. By default: The value of the field with the name equal to the column ID */
    template?: string | ((item: I, index: number) => React.ReactNode);
    /** Content alignment. */
    align?: 'start' | 'end' | 'center' | 'left' | 'right';
    /** Sticky column. */
    sticky?: 'start' | 'end' | 'left' | 'right';
    /** Distinguishes a column among other. */
    primary?: boolean;
    /** Column width in px or in %. Width can behave unexpectedly (it's more like min-width in block-elements). Sometimes you want to use `table-layout: fixed` */
    width?: number | string;
    /** Various data, HOC settings. */
    meta?: Record<string, any>;
}
export interface DescriptorType {
    /**
     * Row ID.
     * Used when selecting and sorting rows.
     */
    id?: string;
    /**
     * Row CSS classes.
     */
    classNames?: string[];
    /**
     * Condition for disabling columns.
     */
    disabled?: boolean;
    /** Show row hover */
    interactive?: boolean;
}
export type TableWidth = 'auto' | 'max';
export interface TableProps<I> extends AriaLabelingProps, QAProps {
    /** Data */
    data: I[];
    /** Column parameters */
    columns: TableColumnConfig<I>[];
    /** Vertical alignment of contents  */
    verticalAlign?: 'top' | 'middle';
    /** Break long text to lines instead of cutting with hellip */
    wordWrap?: boolean;
    /**
     * Horizontal sticky scroll.
     * Note: table cannot be with fixed height and with sticky scroll at the same time.
     * Sticky scroll wont work if table has overflow.
     * @default false
     */
    stickyHorizontalScroll?: boolean;
    /**
     * Threshold when sticky scroll is enabled.
     *  @default 0
     */
    stickyHorizontalScrollBreakpoint?: number;
    /**
     * @deprecated Use getRowDescriptor instead
     *
     * Row ID.
     * Used when selecting and sorting rows. If you pass a row,
     * its ID will be the value of the field in the row data named the same as the column ID.
     */
    getRowId?: string | ((item: I, index: number) => string);
    /**
     * @deprecated Use getRowDescriptor instead
     *
     * Row CSS classes.
     */
    getRowClassNames?: (item: I, index: number) => string[];
    /**
     * @deprecated Use getRowDescriptor instead
     *
     * Condition for disabling columns.
     */
    isRowDisabled?: (item: I, index: number) => boolean;
    /**
     *
     * @returns {DescriptorType} {@link DescriptorType}
     */
    getRowDescriptor?: (item: I, index: number) => DescriptorType | undefined;
    /** Row click handler. When passed row's hover is visible. */
    onRowClick?: (item: I, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void;
    /** Row mouseenter handler. */
    onRowMouseEnter?: (item: I, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void;
    /** Row mouseleave handler. */
    onRowMouseLeave?: (item: I, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void;
    /** Row mousedown handler. */
    onRowMouseDown?: (item: I, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void;
    /** Message returned if data is missing. By default: "No data". */
    emptyMessage?: string;
    /** Table CSS-class. */
    className?: string;
    /** Adds horizontal padding for edge cells. */
    edgePadding?: boolean;
    width?: TableWidth;
}
interface TableDefaultProps {
    edgePadding: boolean;
}
export declare class Table<I extends TableDataItem = Record<string, string>> extends React.Component<TableProps<I>, TableState> {
    static defaultProps: TableDefaultProps;
    static getRowId<I extends TableDataItem>(props: TableProps<I>, item: I, rowIndex?: number): string;
    static getHeadCellContent<I extends TableDataItem>(column: TableColumnConfig<I>): React.ReactNode;
    static getBodyCellContent<I extends TableDataItem>(column: TableColumnConfig<I>, item: I, rowIndex: number): React.ReactNode;
    static getDerivedStateFromProps<I extends TableDataItem>(props: Readonly<TableProps<I>>, state: Readonly<TableState>): Partial<typeof state> | null;
    state: TableState;
    private tableRef;
    private scrollContainerRef;
    private horizontalScrollBarRef;
    private horizontalScrollBarInnerRef;
    private tableResizeObserver;
    private columnsResizeObserver;
    componentDidMount(): void;
    componentDidUpdate(prevProps: TableProps<I>): void;
    componentWillUnmount(): void;
    render(): import("react/jsx-runtime").JSX.Element;
    private renderHead;
    private renderBody;
    private renderTable;
    private renderRow;
    private renderEmptyRow;
    private renderHorizontalScrollBar;
    private updateColumnStyles;
    private getColumnStyles;
    private handleScrollContainerMouseenter;
    private handleScrollContainerScroll;
    private handleHorizontalScrollBarMouseenter;
    private handleHorizontalScrollBarScroll;
}
export {};
