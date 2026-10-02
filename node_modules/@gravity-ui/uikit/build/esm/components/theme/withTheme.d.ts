import type * as React from 'react';
import type { ThemeContextProps } from "./types.js";
export interface WithThemeProps extends Pick<ThemeContextProps, 'theme'> {
}
export declare function withTheme<T extends WithThemeProps>(WrappedComponent: React.ComponentType<T>): React.ComponentType<Omit<T, keyof WithThemeProps>>;
