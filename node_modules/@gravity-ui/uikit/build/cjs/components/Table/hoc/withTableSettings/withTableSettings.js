'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterColumns = filterColumns;
exports.getColumnStringTitle = getColumnStringTitle;
exports.getActualItems = getActualItems;
exports.withTableSettings = withTableSettings;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const React = tslib_1.__importStar(require("react"));
const icons_1 = require("@gravity-ui/icons");
const Button_1 = require("../../../Button/index.js");
const Icon_1 = require("../../../Icon/index.js");
const cn_1 = require("../../../utils/cn.js");
const getComponentName_1 = require("../../../utils/getComponentName.js");
const withTableActions_1 = require("../withTableActions/withTableActions.js");
const withTableSelection_1 = require("../withTableSelection/withTableSelection.js");
const TableColumnSetup_1 = require("./TableColumnSetup/TableColumnSetup.js");
const i18n_1 = tslib_1.__importDefault(require("./i18n/index.js"));
require("./withTableSettings.css");
function filterColumns(columns, settings) {
    const filteredColumns = settings
        .map(({ id, isSelected }) => ({
        isSelected,
        columnSettings: columns.find((column) => id === column.id),
    }))
        .filter(({ isSelected, columnSettings }) => isSelected && columnSettings)
        .map(({ columnSettings }) => columnSettings);
    if (columns[0] && columns[0].id === withTableSelection_1.selectionColumnId) {
        filteredColumns.unshift(columns[0]);
    }
    const lastColumn = columns.at(-1);
    if (lastColumn && lastColumn.id === withTableActions_1.actionsColumnId) {
        filteredColumns.push(lastColumn);
    }
    return filteredColumns;
}
function getColumnStringTitle(column) {
    const displayName = column.meta?.displayName;
    if (typeof displayName === 'string') {
        return displayName;
    }
    if (typeof column.name === 'string') {
        return column.name;
    }
    const originalName = column.meta?._originalName;
    if (typeof originalName === 'string') {
        return originalName;
    }
    return column.id;
}
const getTableColumnSetupItem = (id, isSelected, column) => {
    const isProtected = Boolean(column?.meta?.selectedAlways);
    return {
        id,
        isSelected: isProtected ? true : isSelected,
        isRequired: isProtected,
        title: column ? getColumnStringTitle(column) : id,
        sticky: column?.sticky,
    };
};
function getActualItems(columns, settings) {
    const sortableItems = [];
    settings.forEach(({ id, isSelected }) => {
        const column = columns.find((column) => id === column.id);
        if (column) {
            sortableItems.push(getTableColumnSetupItem(id, isSelected, column));
        }
    });
    columns.forEach((column) => {
        if (column.id !== withTableActions_1.actionsColumnId &&
            column.id !== withTableSelection_1.selectionColumnId &&
            settings.every((setting) => setting.id !== column.id)) {
            const isSelected = column.meta?.selectedByDefault !== false;
            sortableItems.push(getTableColumnSetupItem(column.id, isSelected, column));
        }
    });
    return sortableItems;
}
const b = (0, cn_1.block)('table');
const POPUP_PLACEMENT = ['bottom-end', 'bottom', 'top-end', 'top'];
function withTableSettings(ComponentOrOptions) {
    function tableWithSettingsFactory(TableComponent, { width, sortable, filterable } = {}) {
        const componentName = (0, getComponentName_1.getComponentName)(TableComponent);
        function TableWithSettings({ updateSettings, settings, columns, settingsPopupWidth, renderControls, defaultSettings, showResetButton, settingsFilterPlaceholder, settingsFilterEmptyMessage, filterSettings, ...restTableProps }) {
            const defaultActualItems = React.useMemo(() => {
                if (!defaultSettings) {
                    return undefined;
                }
                return getActualItems(columns, defaultSettings);
            }, [columns, defaultSettings]);
            const { t } = i18n_1.default.useTranslation();
            const enhancedColumns = React.useMemo(() => {
                const actualItems = getActualItems(columns, settings || []);
                return (0, withTableActions_1.enhanceSystemColumn)(filterColumns(columns, actualItems), (systemColumn) => {
                    systemColumn.name = () => ((0, jsx_runtime_1.jsx)("div", { className: b('settings'), children: (0, jsx_runtime_1.jsx)(TableColumnSetup_1.TableColumnSetup, { popupWidth: settingsPopupWidth || width, popupPlacement: POPUP_PLACEMENT, sortable: sortable, filterable: filterable, filterPlaceholder: settingsFilterPlaceholder, filterEmptyMessage: settingsFilterEmptyMessage, filterSettings: filterSettings, onUpdate: updateSettings, items: actualItems, renderSwitcher: ({ onClick }) => ((0, jsx_runtime_1.jsx)(Button_1.Button, { view: "flat", className: b('settings-button'), "aria-label": t('label_settings'), onClick: onClick, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { data: icons_1.Gear }) })), renderControls: renderControls, defaultItems: defaultActualItems, showResetButton: showResetButton }) }));
                });
            }, [
                columns,
                settings,
                settingsPopupWidth,
                settingsFilterPlaceholder,
                settingsFilterEmptyMessage,
                filterSettings,
                updateSettings,
                renderControls,
                defaultActualItems,
                showResetButton,
                t,
            ]);
            return ((0, jsx_runtime_1.jsx)(React.Fragment, { children: (0, jsx_runtime_1.jsx)(TableComponent, { ...restTableProps, columns: enhancedColumns }) }));
        }
        TableWithSettings.displayName = `withTableSettings(${componentName})`;
        return TableWithSettings;
    }
    if (typeof ComponentOrOptions === 'function') {
        return tableWithSettingsFactory(ComponentOrOptions);
    }
    else {
        return (TableComponent) => tableWithSettingsFactory(TableComponent, ComponentOrOptions);
    }
}
//# sourceMappingURL=withTableSettings.js.map
