'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import get from "lodash/get.js";
import memoize from "lodash/memoize.js";
import { createOnKeyDownHandler } from "../../../../hooks/useActionHandlers/useActionHandlers.js";
import { block } from "../../../utils/cn.js";
import { getComponentName } from "../../../utils/getComponentName.js";
import { Table } from "../../Table.js";
import { SortIndicator } from "./SortIndicator/SortIndicator.js";
import "./withTableSorting.css";
export const TableSortIndicator = SortIndicator;
const b = block('table');
export function withTableSorting(TableComponent) {
    const componentName = getComponentName(TableComponent);
    const displayName = `withTableSorting(${componentName})`;
    function defaultCompareFunction(itemA, itemB, columnId) {
        if (get(itemA, columnId) === get(itemB, columnId)) {
            return 0;
        }
        else {
            return get(itemA, columnId) > get(itemB, columnId) ? 1 : -1;
        }
    }
    return class extends React.Component {
        static displayName = displayName;
        state = {
            sort: this.props.defaultSortState ?? [],
        };
        render() {
            const { columns, ...restTableProps } = this.props;
            return (_jsx(TableComponent, { ...restTableProps, data: this.getSortedData(), columns: this.enhanceColumns(columns) }));
        }
        getSortedData() {
            const { data, columns, disableDataSorting = this.isControlledState() } = this.props;
            const sortState = this.getSortState();
            if (disableDataSorting || sortState.length === 0) {
                return data;
            }
            return data.slice().sort((itemA, itemB) => {
                let i = 0;
                while (i < sortState.length) {
                    const state = sortState[i++];
                    const column = columns.find((c) => c.id === state.column);
                    const compareFunction = column?.meta?.sort;
                    if (!compareFunction) {
                        continue;
                    }
                    const compareValue = typeof compareFunction === 'function'
                        ? compareFunction(itemA, itemB)
                        : defaultCompareFunction(itemA, itemB, state.column);
                    if (compareValue !== 0) {
                        return state.order === 'asc' ? compareValue : -compareValue;
                    }
                }
                return 0;
            });
        }
        // eslint-disable-next-line @typescript-eslint/member-ordering
        enhanceColumns = memoize((columns) => {
            return columns.map((column) => {
                const meta = column.meta;
                if (meta && meta.sort) {
                    return {
                        ...column,
                        meta: {
                            ...column.meta,
                            _originalName: column.name,
                        },
                        name: () => {
                            const sortState = this.getSortState();
                            let sortOrder;
                            if (sortState.length > 0) {
                                const state = sortState.find((s) => s.column === column.id);
                                if (state) {
                                    sortOrder = state.order;
                                }
                            }
                            const originContent = Table.getHeadCellContent(column);
                            const content = [
                                _jsx("div", { className: b('sort-content'), children: originContent }, "content"),
                                _jsx("div", { className: b('sort-indicator'), children: _jsx(SortIndicator, { order: sortOrder }) }, "indicator"),
                            ];
                            if (column.align === 'right' || column.align === 'end') {
                                content.reverse();
                            }
                            const onClick = this.handleColumnSortClick.bind(this, column);
                            const onKeyDown = createOnKeyDownHandler(onClick);
                            return (_jsx("div", { role: "button", tabIndex: 0, className: b('sort', { active: Boolean(sortOrder) }), onClick: onClick, onKeyDown: onKeyDown, children: content }));
                        },
                    };
                }
                else {
                    return column;
                }
            });
        });
        handleColumnSortClick = (column, event) => {
            const sortState = this.getSortState();
            const currentStateIndex = sortState.findIndex((state) => state.column === column.id);
            const currentState = sortState[currentStateIndex];
            const nextColumnSort = this.getNextSortForColumn(column, currentState);
            if (!event.shiftKey) {
                this.handleSortStateChange(nextColumnSort);
                return;
            }
            if (currentState) {
                this.handleSortStateChange([
                    ...sortState.slice(0, currentStateIndex),
                    ...sortState.slice(currentStateIndex + 1),
                    ...nextColumnSort,
                ]);
            }
            else {
                this.handleSortStateChange([...sortState, ...nextColumnSort]);
            }
        };
        getSortState() {
            const { sortState } = this.props;
            const { sort } = this.state;
            return this.isControlledState() ? sortState : sort;
        }
        handleSortStateChange(newSortState) {
            const { onSortStateChange } = this.props;
            if (!this.isControlledState()) {
                this.setState({ sort: newSortState });
            }
            if (onSortStateChange) {
                onSortStateChange(newSortState);
            }
        }
        isControlledState() {
            const { sortState, onSortStateChange } = this.props;
            return Boolean(sortState && onSortStateChange);
        }
        getColumnDefaultSortOrder(column) {
            return column.meta?.defaultSortOrder || 'asc';
        }
        getNextSortForColumn(column, currentState) {
            const defaultOrder = this.getColumnDefaultSortOrder(column);
            const orderStack = defaultOrder === 'desc' ? ['desc', 'asc', undefined] : ['asc', 'desc', undefined];
            const currentIndex = orderStack.indexOf(currentState?.order);
            const nextIndex = (currentIndex + 1) % orderStack.length;
            const nextOrder = orderStack[nextIndex];
            if (!nextOrder) {
                return [];
            }
            return [{ column: column.id, order: nextOrder }];
        }
    };
}
//# sourceMappingURL=withTableSorting.js.map
