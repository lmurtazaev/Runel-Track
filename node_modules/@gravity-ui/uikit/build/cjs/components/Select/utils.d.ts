import * as React from 'react';
import type { List, ListItemData } from "../List/index.js";
import { FLATTEN_KEY } from "./constants.js";
import type { SelectOption, SelectOptionGroup, SelectOptions, SelectProps, SelectSize } from "./types.js";
export type GroupTitleItem<T = any> = {
    label: string;
    disabled: true;
    data?: T;
};
export type FlattenOption = SelectOption | GroupTitleItem;
export type FlattenOptions = FlattenOption[] & {
    [FLATTEN_KEY]: {
        filteredOptions: FlattenOption[];
    };
};
export declare const isSelectGroupTitle: (option?: SelectOption | SelectOptionGroup) => option is GroupTitleItem;
export declare const getFlattenOptions: (options: SelectOptions) => FlattenOptions;
export declare const getPopupItemHeight: (args: {
    getOptionHeight?: SelectProps["getOptionHeight"];
    getOptionGroupHeight?: SelectProps["getOptionGroupHeight"];
    size: SelectSize;
    option: FlattenOption;
    index: number;
    mobile: boolean;
}) => number;
export declare const getOptionsHeight: (args: {
    getOptionHeight?: SelectProps["getOptionHeight"];
    getOptionGroupHeight?: SelectProps["getOptionGroupHeight"];
    size: NonNullable<SelectProps["size"]>;
    options: FlattenOption[];
    mobile: boolean;
}) => number;
export declare const getSelectedOptionsContent: (options: SelectOptions, value: string[], renderSelectedOption?: SelectProps["renderSelectedOption"]) => React.ReactNode;
export declare const getOptionsFromChildren: (children: SelectProps["children"]) => (SelectOption | SelectOptionGroup)[];
export declare const getNextQuickSearch: (keyCode: string, quickSearch: string) => string;
export declare const findItemIndexByQuickSearch: (quickSearch: string, items?: ListItemData<FlattenOption>[]) => number;
export declare const getListItems: (listRef: React.RefObject<List<FlattenOption> | null>) => ListItemData<FlattenOption>[];
export declare const getActiveItem: (listRef: React.RefObject<List<FlattenOption> | null>) => ListItemData<FlattenOption> | undefined;
export declare const getFilteredFlattenOptions: (args: {
    options: FlattenOption[];
    filter: string;
    filterOption?: SelectProps["filterOption"];
}) => FlattenOption[];
export declare function scrollToItem(node: HTMLElement): boolean;
