'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import difference from "lodash/difference.js";
import memoize from "lodash/memoize.js";
import union from "lodash/union.js";
import without from "lodash/without.js";
import { Checkbox } from "../../../Checkbox/index.js";
import { block } from "../../../utils/cn.js";
import { getComponentName } from "../../../utils/getComponentName.js";
import { Table } from "../../Table.js";
import i18n from "../../i18n/index.js";
import "./withTableSelection.css";
const b = block('table');
export const selectionColumnId = '_selection';
export function withTableSelection(TableComponent) {
    const componentName = getComponentName(TableComponent);
    const displayName = `withTableSelection(${componentName})`;
    return class extends React.Component {
        static displayName = displayName;
        lastCheckedIndex;
        render() {
            const { selectedIds, // eslint-disable-line @typescript-eslint/no-unused-vars
            onSelectionChange, // eslint-disable-line @typescript-eslint/no-unused-vars
            columns, onRowClick, getRowDescriptor, ...restTableProps } = this.props;
            return (_jsx(TableComponent, { ...restTableProps, columns: this.enhanceColumns(columns), onRowClick: this.enhanceOnRowClick(onRowClick), getRowDescriptor: this.enhanceGetRowDescriptor(getRowDescriptor) }));
        }
        renderHeadCell = () => {
            const { data, selectedIds } = this.props;
            let disabled = true;
            let indeterminate = false;
            let checked = true;
            data.forEach((item, index) => {
                if (this.isDisabled(item, index)) {
                    return;
                }
                else {
                    disabled = false;
                }
                const id = Table.getRowId(this.props, item, index);
                const itemChecked = selectedIds.includes(id);
                if (itemChecked) {
                    indeterminate = true;
                }
                else {
                    checked = false;
                }
            });
            if (checked) {
                indeterminate = false;
            }
            if (disabled) {
                checked = false;
                indeterminate = false;
            }
            return this.renderCheckBox({
                disabled,
                checked,
                handler: this.handleAllCheckBoxUpdate,
                indeterminate,
            });
        };
        renderBodyCell = (item, index) => {
            const { selectedIds } = this.props;
            const id = Table.getRowId(this.props, item, index);
            const checked = selectedIds.includes(id);
            return this.renderCheckBox({
                disabled: this.isDisabled(item, index),
                checked,
                handler: this.handleCheckBoxUpdate.bind(this, id, index),
            });
        };
        renderCheckBox({ disabled, checked, handler, indeterminate, }) {
            return (_jsx(i18n.Translation, { children: ({ t }) => (_jsx(Checkbox, { size: "l", checked: checked, indeterminate: indeterminate, disabled: disabled, onChange: handler, className: b('selection-checkbox', {
                        'vertical-align': this.props.verticalAlign,
                    }), controlProps: {
                        'aria-label': t('label-row-select'),
                    } })) }));
        }
        handleCheckBoxUpdate = (id, index, event) => {
            const { checked } = event.target;
            // @ts-expect-error shiftKey is defined for click events
            const isShiftPressed = event.nativeEvent.shiftKey;
            const { data, selectedIds, onSelectionChange } = this.props;
            if (isShiftPressed &&
                this.lastCheckedIndex !== undefined &&
                this.lastCheckedIndex >= 0) {
                const begin = Math.min(this.lastCheckedIndex, index);
                const end = Math.max(this.lastCheckedIndex, index);
                const dataIds = data.map((item, i) => Table.getRowId(this.props, item, i));
                const diffIds = dataIds.filter((_id, i) => begin <= i && i <= end && !this.isDisabled(data[i], i));
                onSelectionChange(checked ? union(selectedIds, diffIds) : without(selectedIds, ...diffIds));
            }
            else {
                onSelectionChange(checked ? [...selectedIds, id] : without(selectedIds, id));
            }
            this.lastCheckedIndex = index;
        };
        handleAllCheckBoxUpdate = (event) => {
            const { checked } = event.target;
            const { data, selectedIds, onSelectionChange } = this.props;
            const dataIds = data.map((item, index) => Table.getRowId(this.props, item, index));
            const notDisabledItemIds = dataIds.filter((_id, index) => !this.isDisabled(data[index], index));
            onSelectionChange(checked ? union(selectedIds, notDisabledItemIds) : difference(selectedIds, dataIds));
        };
        // eslint-disable-next-line @typescript-eslint/member-ordering, react/sort-comp
        enhanceColumns = memoize((columns) => {
            const selectionColumn = {
                id: selectionColumnId,
                name: this.renderHeadCell,
                template: this.renderBodyCell,
                className: b('checkbox_cell'),
                sticky: columns?.[0]?.sticky === 'start' ? 'start' : undefined,
            };
            return [selectionColumn, ...columns];
        });
        // eslint-disable-next-line @typescript-eslint/member-ordering
        enhanceOnRowClick = memoize((onRowClick) => {
            if (!onRowClick) {
                return onRowClick;
            }
            return (item, index, event) => {
                const checkboxClassName = b('selection-checkbox');
                if (
                // @ts-expect-error
                event.nativeEvent.target.matches(`.${checkboxClassName}, .${checkboxClassName} *`)) {
                    return undefined;
                }
                return onRowClick(item, index, event);
            };
        });
        // eslint-disable-next-line @typescript-eslint/member-ordering
        enhanceGetRowDescriptor = memoize((getRowDescriptor) => {
            const currentGetRowDescriptor = (item, index) => {
                const { selectedIds, getRowClassNames } = this.props;
                const descriptor = getRowDescriptor?.(item, index) || {};
                if (descriptor.classNames === undefined) {
                    descriptor.classNames = getRowClassNames?.(item, index) || [];
                }
                const id = Table.getRowId(this.props, item, index);
                const selected = selectedIds.includes(id);
                descriptor.classNames.push(b('row', { selected }));
                return descriptor;
            };
            return currentGetRowDescriptor;
        });
        isDisabled = (item, index) => {
            const { isRowDisabled, isRowSelectionDisabled, getRowDescriptor } = this.props;
            if (isRowSelectionDisabled && isRowSelectionDisabled(item, index)) {
                return true;
            }
            return (getRowDescriptor?.(item, index)?.disabled || isRowDisabled?.(item, index) || false);
        };
    };
}
//# sourceMappingURL=withTableSelection.js.map
