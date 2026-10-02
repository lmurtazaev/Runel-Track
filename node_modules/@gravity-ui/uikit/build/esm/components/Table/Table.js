'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import get from "lodash/get.js";
import has from "lodash/has.js";
import { block } from "../utils/cn.js";
import { filterDOMProps } from "../utils/filterDOMProps.js";
import { warnOnce } from "../utils/warn.js";
import i18n from "./i18n/index.js";
import "./Table.css";
const DASH = '\u2014';
function warnAboutPhysicalValues(propName) {
    warnOnce(`[Table] Physical values (left, right) of "${propName}" property are deprecated. Use logical values (start, end) instead.`);
}
function normalizeSides(side, propName) {
    if (side === 'left') {
        warnAboutPhysicalValues(propName);
        return 'start';
    }
    if (side === 'right') {
        warnAboutPhysicalValues(propName);
        return 'end';
    }
    return side;
}
const b = block('table');
const EMPTY_VALUES = [undefined, null, ''];
export class Table extends React.Component {
    static defaultProps = {
        edgePadding: true,
    };
    // Static methods may be used by HOCs
    static getRowId(props, item, rowIndex) {
        const { data, getRowId, getRowDescriptor } = props;
        const index = rowIndex ?? data.indexOf(item);
        const descriptor = getRowDescriptor?.(item, index);
        if (descriptor?.id !== undefined) {
            return descriptor.id;
        }
        if (typeof getRowId === 'function') {
            return getRowId(item, index);
        }
        if (getRowId && getRowId in item) {
            return String(item[getRowId]);
        }
        return String(index);
    }
    static getHeadCellContent(column) {
        const { id, name } = column;
        let content;
        if (typeof name === 'function') {
            content = name();
        }
        else if (typeof name === 'string') {
            content = name;
        }
        else {
            content = id;
        }
        return content;
    }
    static getBodyCellContent(column, item, rowIndex) {
        const { id, template, placeholder } = column;
        let placeholderValue;
        if (typeof placeholder === 'function') {
            placeholderValue = placeholder(item, rowIndex);
        }
        else {
            placeholderValue = placeholder ?? DASH;
        }
        let value;
        if (typeof template === 'function') {
            value = template(item, rowIndex);
        }
        else if (typeof template === 'string') {
            value = get(item, template);
        }
        else if (has(item, id)) {
            value = get(item, id);
        }
        if (EMPTY_VALUES.includes(value) && placeholderValue) {
            return placeholderValue;
        }
        return value;
    }
    static getDerivedStateFromProps(props, state) {
        if (props.columns.length === state.columnHeaderRefs.length) {
            return null;
        }
        return {
            columnHeaderRefs: Array.from(props.columns, () => React.createRef()),
        };
    }
    state = {
        activeScrollElement: 'scrollContainer',
        columnsStyles: Array.from(this.props.columns, () => ({})),
        columnHeaderRefs: Array.from(this.props.columns, () => React.createRef()),
    };
    tableRef = React.createRef();
    scrollContainerRef = React.createRef();
    horizontalScrollBarRef = React.createRef();
    horizontalScrollBarInnerRef = React.createRef();
    tableResizeObserver;
    columnsResizeObserver;
    componentDidMount() {
        if (this.props.stickyHorizontalScroll) {
            this.tableResizeObserver = new ResizeObserver((entries) => {
                const { contentRect } = entries[0];
                // Sync scrollbar width with table width
                this.horizontalScrollBarInnerRef.current?.style.setProperty('width', `${contentRect.width}px`);
            });
            if (this.tableRef.current) {
                this.tableResizeObserver.observe(this.tableRef.current);
            }
            if (this.scrollContainerRef.current) {
                this.scrollContainerRef.current.addEventListener('scroll', this.handleScrollContainerScroll);
                this.scrollContainerRef.current.addEventListener('mouseenter', this.handleScrollContainerMouseenter);
            }
            if (this.horizontalScrollBarRef.current) {
                this.horizontalScrollBarRef.current.addEventListener('scroll', this.handleHorizontalScrollBarScroll);
                this.horizontalScrollBarRef.current.addEventListener('mouseenter', this.handleHorizontalScrollBarMouseenter);
            }
        }
        this.columnsResizeObserver = new ResizeObserver((entries) => {
            // fix ResizeObserver loop error
            window.requestAnimationFrame(() => {
                if (!Array.isArray(entries) || !entries.length) {
                    return;
                }
                this.updateColumnStyles();
            });
        });
        if (this.tableRef.current) {
            this.columnsResizeObserver.observe(this.tableRef.current);
        }
        this.updateColumnStyles();
    }
    componentDidUpdate(prevProps) {
        if (this.props.columns !== prevProps.columns) {
            this.updateColumnStyles();
        }
    }
    componentWillUnmount() {
        if (this.props.stickyHorizontalScroll) {
            if (this.tableResizeObserver) {
                this.tableResizeObserver.disconnect();
            }
            if (this.scrollContainerRef.current) {
                this.scrollContainerRef.current.removeEventListener('scroll', this.handleScrollContainerScroll);
                this.scrollContainerRef.current.removeEventListener('mouseenter', this.handleScrollContainerMouseenter);
            }
            if (this.horizontalScrollBarRef.current) {
                this.horizontalScrollBarRef.current.removeEventListener('scroll', this.handleHorizontalScrollBarScroll);
                this.horizontalScrollBarRef.current.removeEventListener('mouseenter', this.handleHorizontalScrollBarMouseenter);
            }
        }
        if (this.columnsResizeObserver) {
            this.columnsResizeObserver.disconnect();
        }
    }
    render() {
        const { columns, stickyHorizontalScroll, className, qa } = this.props;
        const withPrimary = columns.some(({ primary }) => primary);
        return (_jsx("div", { className: b({
                'with-primary': withPrimary,
                'with-sticky-scroll': stickyHorizontalScroll,
            }, className), "data-qa": qa, children: stickyHorizontalScroll ? (_jsxs(React.Fragment, { children: [_jsx("div", { ref: this.scrollContainerRef, className: b('scroll-container'), children: this.renderTable() }), this.renderHorizontalScrollBar()] })) : (this.renderTable()) }));
    }
    renderHead() {
        const { columns, edgePadding, wordWrap } = this.props;
        const { columnsStyles } = this.state;
        return (_jsx("thead", { className: b('head'), children: _jsx("tr", { className: b('row'), children: columns.map((column, index) => {
                    const { id, align: rawAlign, primary, sticky: rawSticky, className } = column;
                    const align = normalizeSides(rawAlign, 'column.align');
                    const sticky = normalizeSides(rawSticky, 'column.sticky');
                    const content = Table.getHeadCellContent(column);
                    return (_jsx("th", { ref: this.state.columnHeaderRefs[index], style: columnsStyles[index], className: b('cell', {
                            align,
                            primary,
                            sticky,
                            ['edge-padding']: edgePadding,
                            ['word-wrap']: wordWrap,
                        }, className), children: content }, id));
                }) }) }));
    }
    renderBody() {
        const { data } = this.props;
        return (_jsx("tbody", { className: b('body'), children: data.length > 0 ? data.map(this.renderRow) : this.renderEmptyRow() }));
    }
    renderTable() {
        const { width = 'auto' } = this.props;
        return (_jsxs("table", { ...filterDOMProps(this.props, { labelable: true }), ref: this.tableRef, className: b('table', { width }), children: [this.renderHead(), this.renderBody()] }));
    }
    renderRow = (item, rowIndex) => {
        const { columns, isRowDisabled, onRowClick, onRowMouseEnter, onRowMouseLeave, onRowMouseDown, getRowClassNames, verticalAlign, edgePadding, wordWrap, getRowDescriptor, qa, } = this.props;
        const { columnsStyles } = this.state;
        const descriptor = getRowDescriptor?.(item, rowIndex);
        const disabled = descriptor?.disabled || isRowDisabled?.(item, rowIndex) || false;
        const additionalClassNames = descriptor?.classNames || getRowClassNames?.(item, rowIndex) || [];
        const interactive = Boolean(!disabled && (descriptor?.interactive || onRowClick));
        return (_jsx("tr", { onClick: !disabled && onRowClick ? onRowClick.bind(null, item, rowIndex) : undefined, onMouseEnter: !disabled && onRowMouseEnter
                ? onRowMouseEnter.bind(null, item, rowIndex)
                : undefined, onMouseLeave: !disabled && onRowMouseLeave
                ? onRowMouseLeave.bind(null, item, rowIndex)
                : undefined, onMouseDown: !disabled && onRowMouseDown
                ? onRowMouseDown.bind(null, item, rowIndex)
                : undefined, className: b('row', { disabled, interactive, 'vertical-align': verticalAlign }, additionalClassNames.join(' ')), "data-qa": qa && `${qa}-row-${rowIndex}`, children: columns.map((column, colIndex) => {
                const { id, align: rawAlign, primary, className, sticky: rawSticky } = column;
                const content = Table.getBodyCellContent(column, item, rowIndex);
                const align = normalizeSides(rawAlign, 'column.align');
                const sticky = normalizeSides(rawSticky, 'column.sticky');
                return (_jsx("td", { style: columnsStyles[colIndex], className: b('cell', {
                        align,
                        primary,
                        sticky,
                        ['edge-padding']: edgePadding,
                        ['word-wrap']: wordWrap,
                    }, className), children: content }, id));
            }) }, Table.getRowId(this.props, item, rowIndex)));
    };
    renderEmptyRow() {
        const { columns, emptyMessage } = this.props;
        return (_jsx("tr", { className: b('row', { empty: true }), children: _jsx("td", { className: b('cell'), colSpan: columns.length, children: _jsx(i18n.Translation, { children: ({ t }) => (emptyMessage ? emptyMessage : t('label_empty')) }) }) }));
    }
    renderHorizontalScrollBar() {
        const { stickyHorizontalScroll, stickyHorizontalScrollBreakpoint = 0 } = this.props;
        return (_jsx("div", { ref: this.horizontalScrollBarRef, className: b('horizontal-scroll-bar', {
                'sticky-horizontal-scroll': stickyHorizontalScroll,
            }), style: { bottom: `${stickyHorizontalScrollBreakpoint}px` }, "data-qa": "sticky-horizontal-scroll-breakpoint-qa", children: _jsx("div", { ref: this.horizontalScrollBarInnerRef, className: b('horizontal-scroll-bar-inner') }) }));
    }
    updateColumnStyles() {
        this.setState((prevState) => {
            const columnsWidth = prevState.columnHeaderRefs.map((ref) => ref.current === null ? undefined : ref.current.getBoundingClientRect().width);
            const columnsStyles = this.props.columns.map((_, index) => this.getColumnStyles(index, columnsWidth));
            return { columnsStyles };
        });
    }
    getColumnStyles(index, columnsWidth) {
        const { columns } = this.props;
        const column = columns[index];
        const style = {};
        if (typeof column.width === 'string') {
            return { maxWidth: 0, width: column.width };
        }
        if (typeof column.width !== 'undefined') {
            style.width = column.width;
        }
        if (!column.sticky) {
            return style;
        }
        const filteredColumns = column.sticky === 'left' || column.sticky === 'start'
            ? columnsWidth.slice(0, index)
            : columnsWidth.slice(index + 1);
        const styleName = column.sticky === 'left' || column.sticky === 'start'
            ? 'insetInlineStart'
            : 'insetInlineEnd';
        style[styleName] = filteredColumns.reduce((start, width) => {
            return typeof width === 'number' ? start + width : start;
        }, 0);
        return style;
    }
    handleScrollContainerMouseenter = () => {
        this.setState({ activeScrollElement: 'scrollContainer' });
    };
    handleScrollContainerScroll = () => {
        if (this.state.activeScrollElement === 'scrollContainer' &&
            this.horizontalScrollBarRef.current &&
            this.scrollContainerRef.current) {
            this.horizontalScrollBarRef.current.scrollLeft =
                this.scrollContainerRef.current.scrollLeft;
        }
    };
    handleHorizontalScrollBarMouseenter = () => {
        this.setState({ activeScrollElement: 'scrollBar' });
    };
    handleHorizontalScrollBarScroll = () => {
        if (this.state.activeScrollElement === 'scrollBar' &&
            this.horizontalScrollBarRef.current &&
            this.scrollContainerRef.current) {
            this.scrollContainerRef.current.scrollLeft =
                this.horizontalScrollBarRef.current.scrollLeft;
        }
    };
}
//# sourceMappingURL=Table.js.map
