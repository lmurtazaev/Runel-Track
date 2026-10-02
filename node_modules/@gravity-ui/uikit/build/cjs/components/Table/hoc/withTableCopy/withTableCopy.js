'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTableCopy = withTableCopy;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const memoize_1 = tslib_1.__importDefault(require("lodash/memoize.js"));
const ClipboardButton_1 = require("../../../ClipboardButton/index.js");
const cn_1 = require("../../../utils/cn.js");
const getComponentName_1 = require("../../../utils/getComponentName.js");
const Table_1 = require("../../Table.js");
require("./withTableCopy.css");
const b = (0, cn_1.block)('table');
function withTableCopy(TableComponent) {
    const componentName = (0, getComponentName_1.getComponentName)(TableComponent);
    const displayName = `withTableCopy(${componentName})`;
    return class extends React.Component {
        static displayName = displayName;
        render() {
            const { columns, onRowClick, ...restTableProps } = this.props;
            return ((0, jsx_runtime_1.jsx)(TableComponent, { ...restTableProps, columns: this.enhanceColumns(columns), onRowClick: this.enhanceOnRowClick(onRowClick) }));
        }
        // eslint-disable-next-line @typescript-eslint/member-ordering
        enhanceColumns = (0, memoize_1.default)((columns) => {
            return columns.map((column) => {
                const meta = column.meta;
                if (!meta || !meta.copy) {
                    return column;
                }
                return {
                    ...column,
                    template: (item, index) => {
                        const originContent = Table_1.Table.getBodyCellContent({
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
                        return ((0, jsx_runtime_1.jsxs)("div", { className: b('copy'), children: [(0, jsx_runtime_1.jsx)("div", { className: b('copy-content'), children: originContent }), (0, jsx_runtime_1.jsx)("div", { className: b('copy-button'), children: (0, jsx_runtime_1.jsx)(ClipboardButton_1.ClipboardButton, { text: copyText, size: "xs" }) })] }));
                    },
                };
            });
        });
        // eslint-disable-next-line @typescript-eslint/member-ordering
        enhanceOnRowClick = (0, memoize_1.default)((onRowClick) => {
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
