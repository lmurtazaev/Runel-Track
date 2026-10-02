import * as React from 'react';
import type { AriaLabelingProps, DOMProps, QAProps } from "../types.js";
import type { Platform } from "./types.js";
import "./Hotkey.css";
export interface HotkeyProps extends AriaLabelingProps, DOMProps, QAProps {
    /**
     * @example
     * 'mod+a mod+c mod+v'
     */
    value: string;
    /**
     * @default light
     */
    view?: 'light' | 'dark';
    platform?: Platform;
}
export declare const Hotkey: React.ForwardRefExoticComponent<HotkeyProps & React.RefAttributes<HTMLElement>>;
export declare function parseHotkeys(value: string, opts: {
    platform?: Platform;
}): string[][];
