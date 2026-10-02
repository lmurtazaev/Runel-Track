'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { Gear } from '@gravity-ui/icons';
import { Button } from "../../../Button/index.js";
import { Icon } from "../../../Icon/index.js";
import { block } from "../../../utils/cn.js";
import { getComponentName } from "../../../utils/getComponentName.js";
import { actionsColumnId, enhanceSystemColumn } from "../withTableActions/withTableActions.js";
import { selectionColumnId } from "../withTableSelection/withTableSelection.js";
import { TableColumnSetup } from "./TableColumnSetup/TableColumnSetup.js";
import i18n from "./i18n/index.js";
import "./withTableSettings.css";
export function filterColumns(columns, settings) {
    const filteredColumns = settings
        .map(({ id, isSelected }) => ({
        isSelected,
        columnSettings: columns.find((column) => id === column.id),
    }))
        .filter(({ isSelected, columnSettings }) => isSelected && columnSettings)
        .map(({ columnSettings }) => columnSettings);
    if (columns[0] && columns[0].id === selectionColumnId) {
        filteredColumns.unshift(columns[0]);
    }
    const lastColumn = columns.at(-1);
    if (lastColumn && lastColumn.id === actionsColumnId) {
        filteredColumns.push(lastColumn);
    }
    return filteredColumns;
}
export function getColumnStringTitle(column) {
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
export function getActualItems(columns, settings) {
    const sortableItems = [];
    settings.forEach(({ id, isSelected }) => {
        const column = columns.find((column) => id === column.id);
        if (column) {
            sortableItems.push(getTableColumnSetupItem(id, isSelected, column));
        }
    });
    columns.forEach((column) => {
        if (column.id !== actionsColumnId &&
            column.id !== selectionColumnId &&
            settings.every((setting) => setting.id !== column.id)) {
            const isSelected = column.meta?.selectedByDefault !== false;
            sortableItems.push(getTableColumnSetupItem(column.id, isSelected, column));
        }
    });
    return sortableItems;
}
const b = block('table');
const POPUP_PLACEMENT = ['bottom-end', 'bottom', 'top-end', 'top'];
export function withTableSettings(ComponentOrOptions) {
    function tableWithSettingsFactory(TableComponent, { width, sortable, filterable } = {}) {
        const componentName = getComponentName(TableComponent);
        function TableWithSettings({ updateSettings, settings, columns, settingsPopupWidth, renderControls, defaultSettings, showResetButton, settingsFilterPlaceholder, settingsFilterEmptyMessage, filterSettings, ...restTableProps }) {
            const defaultActualItems = React.useMemo(() => {
                if (!defaultSettings) {
                    return undefined;
                }
                return getActualItems(columns, defaultSettings);
            }, [columns, defaultSettings]);
            const { t } = i18n.useTranslation();
            const enhancedColumns = React.useMemo(() => {
                const actualItems = getActualItems(columns, settings || []);
                return enhanceSystemColumn(filterColumns(columns, actualItems), (systemColumn) => {
                    systemColumn.name = () => (_jsx("div", { className: b('settings'), children: _jsx(TableColumnSetup, { popupWidth: settingsPopupWidth || width, popupPlacement: POPUP_PLACEMENT, sortable: sortable, filterable: filterable, filterPlaceholder: settingsFilterPlaceholder, filterEmptyMessage: settingsFilterEmptyMessage, filterSettings: filterSettings, onUpdate: updateSettings, items: actualItems, renderSwitcher: ({ onClick }) => (_jsx(Button, { view: "flat", className: b('settings-button'), "aria-label": t('label_settings'), onClick: onClick, children: _jsx(Icon, { data: Gear }) })), renderControls: renderControls, defaultItems: defaultActualItems, showResetButton: showResetButton }) }));
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
            return (_jsx(React.Fragment, { children: _jsx(TableComponent, { ...restTableProps, columns: enhancedColumns }) }));
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
