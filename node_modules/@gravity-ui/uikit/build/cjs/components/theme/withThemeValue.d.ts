import type * as React from 'react';
import type { ThemeContextProps } from "./types.js";
export interface WithThemeValueProps extends Pick<ThemeContextProps, 'themeValue'> {
}
export declare function withThemeValue<T extends WithThemeValueProps>(WrappedComponent: React.ComponentType<T>): React.ComponentType<Omit<T, keyof WithThemeValueProps>>;
