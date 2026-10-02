import * as React from 'react';
import type { PopoverProps } from "../Popover/index.js";
import type { QAProps } from "../types.js";
import { ICON_SIZE_MAP } from "./constants.js";
import "./HelpMark.css";
type IconSize = keyof typeof ICON_SIZE_MAP;
export interface HelpMarkProps extends QAProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
    iconSize?: IconSize;
    popoverProps?: Omit<PopoverProps, 'children'>;
    children?: React.ReactNode;
}
export declare const HelpMark: React.ForwardRefExoticComponent<HelpMarkProps & React.RefAttributes<HTMLButtonElement>>;
export {};
