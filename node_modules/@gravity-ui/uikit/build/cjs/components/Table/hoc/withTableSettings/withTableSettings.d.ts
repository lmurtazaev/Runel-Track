import * as React from 'react';
import type { TreeSelectProps } from "../../../TreeSelect/index.js";
import type { TableColumnConfig, TableDataItem, TableProps } from "../../Table.js";
import type { RenderControls, TableColumnSetupItem } from "./TableColumnSetup/TableColumnSetup.js";
import "./withTableSettings.css";
export type TableSetting = {
    id: string;
    isSelected?: boolean;
};
export type TableSettingsData = TableSetting[];
export declare function filterColumns<I>(columns: TableColumnConfig<I>[], settings: TableSettingsData): TableColumnConfig<I>[];
export declare function getColumnStringTitle<Data>(column: TableColumnConfig<Data>): string;
export declare function getActualItems<I>(columns: TableColumnConfig<I>[], settings: TableSettingsData): TableColumnSetupItem[];
export interface WithTableSettingsOptions {
    width?: TreeSelectProps<any>['popupWidth'];
    sortable?: boolean;
    filterable?: boolean;
}
interface WithTableSettingsBaseProps {
    /**
     * @deprecated Use factory notation: "withTableSettings({width: <value>})(Table)"
     */
    settingsPopupWidth?: TreeSelectProps<any>['popupWidth'];
    settings: TableSettingsData;
    updateSettings: (data: TableSettingsData) => void;
    /**
     * @deprecated
     */
    renderControls?: RenderControls;
}
interface WithDefaultSettings {
    /** Settings to which you can reset the current settings. */
    defaultSettings: TableSettingsData;
    /**
     * Display a reset button that resets the current settings changes.
     *
     * If the `defaultSettings` prop is set then the settings reset to the `defaultSettings`.
     */
    showResetButton: boolean;
}
interface WithoutDefaultSettings {
    defaultSettings?: never;
    showResetButton?: boolean;
}
interface WithFilter {
    settingsFilterPlaceholder?: string;
    settingsFilterEmptyMessage?: string;
    filterSettings?: (value: string, item: TableColumnSetupItem) => boolean;
}
export type WithTableSettingsProps = WithTableSettingsBaseProps & (WithDefaultSettings | WithoutDefaultSettings) & WithFilter;
export declare function withTableSettings<I extends TableDataItem, E extends {} = {}>(Component: React.ComponentType<TableProps<I> & E>): React.ComponentType<TableProps<I> & WithTableSettingsProps & E>;
export declare function withTableSettings<I extends TableDataItem, E extends {} = {}>(options?: WithTableSettingsOptions): (Component: React.ComponentType<TableProps<I> & E>) => React.ComponentType<TableProps<I> & WithTableSettingsProps & E>;
export {};
