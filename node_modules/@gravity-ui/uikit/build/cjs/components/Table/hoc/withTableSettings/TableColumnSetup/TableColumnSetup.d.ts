import * as React from 'react';
import type { PopupPlacement } from "../../../../Popup/index.js";
import type { TreeSelectProps } from "../../../../TreeSelect/types.js";
import type { TableColumnConfig } from "../../../Table.js";
import type { TableSetting } from "../withTableSettings.js";
import "./TableColumnSetup.css";
interface SwitcherProps {
    onKeyDown: React.KeyboardEventHandler<HTMLElement>;
    onClick: React.MouseEventHandler<HTMLElement>;
}
export type TableColumnSetupItem = TableSetting & {
    title: React.ReactNode;
    isRequired?: boolean;
    sticky?: TableColumnConfig<unknown>['sticky'];
};
export type RenderControls = (params: {
    DefaultApplyButton: React.ComponentType;
    /**
     * Is used to apply new settings and close the popup
     */
    onApply: () => void;
}) => React.ReactNode;
export interface TableColumnSetupProps {
    renderSwitcher?: (props: SwitcherProps) => React.JSX.Element;
    items: TableColumnSetupItem[];
    sortable?: boolean;
    hideApplyButton?: boolean;
    onUpdate: (newSettings: TableSetting[]) => void;
    popupWidth?: TreeSelectProps<unknown>['popupWidth'];
    popupPlacement?: PopupPlacement;
    /**
     * @deprecated
     */
    renderControls?: RenderControls;
    className?: string;
    defaultItems?: TableColumnSetupItem[];
    showResetButton?: boolean | ((currentItems: TableColumnSetupItem[]) => boolean);
    filterable?: boolean;
    filterPlaceholder?: string;
    filterEmptyMessage?: string;
    filterSettings?: (value: string, item: TableColumnSetupItem) => boolean;
}
export declare const TableColumnSetup: (props: TableColumnSetupProps) => import("react/jsx-runtime").JSX.Element;
export {};
