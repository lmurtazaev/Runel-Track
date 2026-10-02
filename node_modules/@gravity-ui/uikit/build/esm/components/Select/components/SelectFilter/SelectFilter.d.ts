import * as React from 'react';
import type { SelectProps } from "../../types.js";
import type { SelectFilterRef } from "../../types-misc.js";
import "./SelectFilter.css";
type SelectFilterProps = {
    onChange: (filter: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
    renderFilter?: SelectProps['renderFilter'];
    size: NonNullable<SelectProps['size']>;
    value: string;
    placeholder?: string;
    popupId: string;
    activeIndex?: number;
};
export declare const SelectFilter: React.ForwardRefExoticComponent<SelectFilterProps & React.RefAttributes<SelectFilterRef>>;
export {};
