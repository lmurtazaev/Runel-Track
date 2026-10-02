'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import memoize from "lodash/memoize.js";
import { ClipboardButton } from "../../../ClipboardButton/index.js";
import { block } from "../../../utils/cn.js";
import { getComponentName } from "../../../utils/getComponentName.js";
import { Table } from "../../Table.js";
import "./withTableCopy.css";
const b = block('table');
export function withTableCopy(TableComponent) {
    const componentName = getComponentName(TableComponent);
    const displayName = `withTableCopy(${componentName})`;
    return class extends React.Component {
        static displayName = displayName;
        render() {
            const { columns, onRowClick, ...restTableProps } = this.props;
            return (_jsx(TableComponent, { ...restTableProps, columns: this.enhanceColumns(columns), onRowClick: this.enhanceOnRowClick(onRowClick) }));
        }
        // eslint-disable-next-line @typescript-eslint/member-ordering
        enhanceColumns = memoize((columns) => {
            return columns.map((column) => {
                const meta = column.meta;
                if (!meta || !meta.copy) {
                    return column;
                }
                return {
                    ...column,
                    template: (item, index) => {
                        const originContent = Table.getBodyCellContent({
                            ...column,
                            placeholder: '',
                        }, item, index);
                        if (!originContent) {
                            return originContent;
                        }
                        let copyText;
                        if (typeof meta.copy === 'function') {
                            copyText = String(meta.copy(item, index));
                        }
                        else if (typeof originContent === 'string' ||
                            typeof originContent === 'number') {
                            copyText = String(originContent);
                        }
                        if (!copyText) {
                            return originContent;
                        }
                        return (_jsxs("div", { className: b('copy'), children: [_jsx("div", { className: b('copy-content'), children: originContent }), _jsx("div", { className: b('copy-button'), children: _jsx(ClipboardButton, { text: copyText, size: "xs" }) })] }));
                    },
                };
            });
        });
        // eslint-disable-next-line @typescript-eslint/member-ordering
        enhanceOnRowClick = memoize((onRowClick) => {
            if (!onRowClick) {
                return onRowClick;
            }
            return (item, index, event) => {
                const buttonClassName = b('copy-button');
                if (
                // @ts-expect-error
                event.nativeEvent.target.matches(`.${buttonClassName}, .${buttonClassName} *`)) {
                    return undefined;
                }
                return onRowClick(item, index, event);
            };
        });
    };
}
//# sourceMappingURL=withTableCopy.js.map
