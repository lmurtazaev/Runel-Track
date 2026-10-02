'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectionColumnId = void 0;
exports.withTableSelection = withTableSelection;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const difference_1 = tslib_1.__importDefault(require("lodash/difference.js"));
const memoize_1 = tslib_1.__importDefault(require("lodash/memoize.js"));
const union_1 = tslib_1.__importDefault(require("lodash/union.js"));
const without_1 = tslib_1.__importDefault(require("lodash/without.js"));
const Checkbox_1 = require("../../../Checkbox/index.js");
const cn_1 = require("../../../utils/cn.js");
const getComponentName_1 = require("../../../utils/getComponentName.js");
const Table_1 = require("../../Table.js");
const i18n_1 = tslib_1.__importDefault(require("../../i18n/index.js"));
require("./withTableSelection.css");
const b = (0, cn_1.block)('table');
exports.selectionColumnId = '_selection';
function withTableSelection(TableComponent) {
    const componentName = (0, getComponentName_1.getComponentName)(TableComponent);
    const displayName = `withTableSelection(${componentName})`;
    return class extends React.Component {
        static displayName = displayName;
        lastCheckedIndex;
        render() {
            const { selectedIds, // eslint-disable-line @typescript-eslint/no-unused-vars
            onSelectionChange, // eslint-disable-line @typescript-eslint/no-unused-vars
            columns, onRowClick, getRowDescriptor, ...restTableProps } = this.props;
            return ((0, jsx_runtime_1.jsx)(TableComponent, { ...restTableProps, columns: this.enhanceColumns(columns), onRowClick: this.enhanceOnRowClick(onRowClick), getRowDescriptor: this.enhanceGetRowDescriptor(getRowDescriptor) }));
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
                const id = Table_1.Table.getRowId(this.props, item, index);
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
            const id = Table_1.Table.getRowId(this.props, item, index);
            const checked = selectedIds.includes(id);
            return this.renderCheckBox({
                disabled: this.isDisabled(item, index),
                checked,
                handler: this.handleCheckBoxUpdate.bind(this, id, index),
            });
        };
        renderCheckBox({ disabled, checked, handler, indeterminate, }) {
            return ((0, jsx_runtime_1.jsx)(i18n_1.default.Translation, { children: ({ t }) => ((0, jsx_runtime_1.jsx)(Checkbox_1.Checkbox, { size: "l", checked: checked, indeterminate: indeterminate, disabled: disabled, onChange: handler, className: b('selection-checkbox', {
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
                const dataIds = data.map((item, i) => Table_1.Table.getRowId(this.props, item, i));
                const diffIds = dataIds.filter((_id, i) => begin <= i && i <= end && !this.isDisabled(data[i], i));
                onSelectionChange(checked ? (0, union_1.default)(selectedIds, diffIds) : (0, without_1.default)(selectedIds, ...diffIds));
            }
            else {
                onSelectionChange(checked ? [...selectedIds, id] : (0, without_1.default)(selectedIds, id));
            }
            this.lastCheckedIndex = index;
        };
        handleAllCheckBoxUpdate = (event) => {
            const { checked } = event.target;
            const { data, selectedIds, onSelectionChange } = this.props;
            const dataIds = data.map((item, index) => Table_1.Table.getRowId(this.props, item, index));
            const notDisabledItemIds = dataIds.filter((_id, index) => !this.isDisabled(data[index], index));
            onSelectionChange(checked ? (0, union_1.default)(selectedIds, notDisabledItemIds) : (0, difference_1.default)(selectedIds, dataIds));
        };
        // eslint-disable-next-line @typescript-eslint/member-ordering, react/sort-comp
        enhanceColumns = (0, memoize_1.default)((columns) => {
            const selectionColumn = {
                id: exports.selectionColumnId,
                name: this.renderHeadCell,
                template: this.renderBodyCell,
                className: b('checkbox_cell'),
                sticky: columns?.[0]?.sticky === 'start' ? 'start' : undefined,
            };
            return [selectionColumn, ...columns];
        });
        // eslint-disable-next-line @typescript-eslint/member-ordering
        enhanceOnRowClick = (0, memoize_1.default)((onRowClick) => {
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
        enhanceGetRowDescriptor = (0, memoize_1.default)((getRowDescriptor) => {
            const currentGetRowDescriptor = (item, index) => {
                const { selectedIds, getRowClassNames } = this.props;
                const descriptor = getRowDescriptor?.(item, index) || {};
                if (descriptor.classNames === undefined) {
                    descriptor.classNames = getRowClassNames?.(item, index) || [];
                }
                const id = Table_1.Table.getRowId(this.props, item, index);
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
