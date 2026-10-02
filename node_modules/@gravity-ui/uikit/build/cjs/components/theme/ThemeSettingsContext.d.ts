import * as React from 'react';
import type { RealTheme } from "./types.js";
export type ThemeSettings = {
    systemLightTheme: RealTheme;
    systemDarkTheme: RealTheme;
};
export type ThemeSettingsContextProps = ThemeSettings | undefined;
export declare const ThemeSettingsContext: React.Context<ThemeSettingsContextProps>;
